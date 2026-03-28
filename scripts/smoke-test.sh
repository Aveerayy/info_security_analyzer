#!/bin/bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

PYTHON_BIN="${PYTHON:-python3}"
VENV_DIR="${VENV_DIR:-.venv-smoke}"
BACKEND_PORT="${BACKEND_PORT:-8000}"

cleanup() {
  if [[ -n "${SERVER_PID:-}" ]] && kill -0 "$SERVER_PID" >/dev/null 2>&1; then
    kill "$SERVER_PID" >/dev/null 2>&1 || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT

echo "==> Frontend build"
npm run build

echo "==> Frontend lint"
npm run lint

echo "==> Backend bytecode compile"
"$PYTHON_BIN" -m compileall backend

echo "==> Backend import smoke"
"$PYTHON_BIN" - <<'PY'
import sys
sys.path.insert(0, 'backend')
import main
print(main.app.title)
PY

if [[ ! -d "$VENV_DIR" ]]; then
  echo "==> Creating backend virtualenv in $VENV_DIR"
  "$PYTHON_BIN" -m venv "$VENV_DIR"
fi

# shellcheck disable=SC1091
source "$VENV_DIR/bin/activate"

echo "==> Installing backend requirements"
pip install -r backend/requirements.txt >/dev/null

echo "==> Starting backend server"
uvicorn backend.main:app --host 127.0.0.1 --port "$BACKEND_PORT" >/tmp/info-security-analyzer-smoke.log 2>&1 &
SERVER_PID=$!

for _ in {1..30}; do
  if curl -fsS "http://127.0.0.1:${BACKEND_PORT}/health" >/dev/null; then
    break
  fi
  sleep 1
done

if ! curl -fsS "http://127.0.0.1:${BACKEND_PORT}/health"; then
  echo "Backend failed to become healthy. Log follows:" >&2
  cat /tmp/info-security-analyzer-smoke.log >&2
  exit 1
fi

echo

echo "==> Providers endpoint"
curl -fsS "http://127.0.0.1:${BACKEND_PORT}/api/providers" >/dev/null

echo "==> Missing-provider error path"
HTTP_CODE=$(curl -sS -o /tmp/info-security-analyzer-analyze.json -w "%{http_code}" \
  -F "file=@docs/assets/demo-report-placeholder.svg" \
  "http://127.0.0.1:${BACKEND_PORT}/api/analyze")

if [[ "$HTTP_CODE" != "400" ]]; then
  echo "Expected /api/analyze without provider config to fail with 400, got $HTTP_CODE" >&2
  cat /tmp/info-security-analyzer-analyze.json >&2
  exit 1
fi

echo "Smoke test passed."
