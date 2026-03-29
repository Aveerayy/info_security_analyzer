import unittest
from pathlib import Path
from unittest.mock import patch

from fastapi import HTTPException
from fastapi.testclient import TestClient

from backend import main


class ProviderConfigTests(unittest.TestCase):
    def test_normalize_provider_trims_and_lowercases(self):
        self.assertEqual(main.normalize_provider("  OpenAI  "), "openai")
        self.assertIsNone(main.normalize_provider("   "))
        self.assertIsNone(main.normalize_provider(None))

    def test_normalize_provider_rejects_unknown_provider(self):
        with self.assertRaises(HTTPException) as ctx:
            main.normalize_provider("not-a-provider")

        self.assertEqual(ctx.exception.status_code, 400)
        self.assertIn("Unsupported provider", ctx.exception.detail)

    def test_build_provider_config_requires_provider_when_azure_env_is_incomplete(self):
        with patch.multiple(
            main,
            AZURE_API_KEY=None,
            AZURE_ENDPOINT=None,
            AZURE_DEPLOYMENT=None,
        ):
            with self.assertRaises(HTTPException) as ctx:
                main.build_provider_config(
                    provider=None,
                    api_key=None,
                    endpoint=None,
                    deployment=None,
                    model=None,
                    api_version=None,
                )

        self.assertEqual(ctx.exception.status_code, 400)
        self.assertIn("No provider configured", ctx.exception.detail)

    def test_build_provider_config_openai_uses_default_model(self):
        provider, config = main.build_provider_config(
            provider="openai",
            api_key="test-key",
            endpoint=None,
            deployment=None,
            model=None,
            api_version=None,
        )

        self.assertEqual(provider, "openai")
        self.assertEqual(config["api_key"], "test-key")
        self.assertEqual(config["model"], "gpt-4o")

    def test_build_provider_config_uses_complete_azure_environment(self):
        with patch.multiple(
            main,
            AZURE_API_KEY="env-key",
            AZURE_ENDPOINT="https://example.openai.azure.com",
            AZURE_DEPLOYMENT="gpt-4o",
            AZURE_API_VERSION=main.DEFAULT_AZURE_API_VERSION,
        ):
            provider, config = main.build_provider_config(
                provider=None,
                api_key=None,
                endpoint=None,
                deployment=None,
                model=None,
                api_version=None,
            )

        self.assertEqual(provider, "azure_openai")
        self.assertEqual(config["api_key"], "env-key")
        self.assertEqual(config["endpoint"], "https://example.openai.azure.com")
        self.assertEqual(config["deployment"], "gpt-4o")
        self.assertEqual(config["api_version"], main.DEFAULT_AZURE_API_VERSION)


class ApiSmokeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(main.app)
        cls.demo_file = Path(__file__).resolve().parents[1] / "docs" / "assets" / "demo-report-placeholder.svg"

    def test_health_endpoint_returns_expected_payload(self):
        response = self.client.get("/health")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            {"status": "healthy", "message": "Service is operational"},
        )

    def test_providers_endpoint_lists_supported_provider_keys(self):
        response = self.client.get("/api/providers")

        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertTrue(body["success"])
        self.assertTrue(main.SUPPORTED_PROVIDERS.issubset(set(body["providers"].keys())))

    def test_analyze_endpoint_without_provider_returns_expected_400(self):
        with self.demo_file.open("rb") as fh, patch.multiple(
            main,
            AZURE_API_KEY=None,
            AZURE_ENDPOINT=None,
            AZURE_DEPLOYMENT=None,
        ):
            response = self.client.post(
                "/api/analyze",
                files={"file": (self.demo_file.name, fh, "image/svg+xml")},
            )

        self.assertEqual(response.status_code, 400)
        self.assertIn("No provider configured", response.json()["detail"])


if __name__ == "__main__":
    unittest.main()
