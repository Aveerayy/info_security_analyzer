import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Card, CardContent } from "@/components/ui/card";
import {
  ComponentAnalysis,
  ComponentRelationship,
} from "@/aksec/data/kubernetes-security-analysis";

interface ComponentRelationshipDiagramProps {
  components: ComponentAnalysis[];
  dataFlows: ComponentRelationship[];
  onSelectComponent?: (componentName: string) => void;
  selectedComponent?: string;
}

export default function ComponentRelationshipDiagram({
  components,
  dataFlows,
  onSelectComponent,
  selectedComponent,
}: ComponentRelationshipDiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || components.length === 0) return;

    // Clear previous diagram
    d3.select(svgRef.current).selectAll("*").remove();

    const width = 800;
    const height = 500;
    const nodeRadius = 40;

    // Create the SVG container
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Create tooltip
    const tooltip = d3
      .select(tooltipRef.current)
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("border", "1px solid #ddd")
      .style("border-radius", "4px")
      .style("padding", "8px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("z-index", "10");

    // Create nodes data
    const nodes = components.map((component) => ({
      id: component.name,
      type: component.type,
      description: component.description,
      risks: component.securityRisks.length,
      highRisks: component.securityRisks.filter(
        (risk) => risk.severity === "High" || risk.severity === "Critical"
      ).length,
    }));

    // Create a set of valid node IDs for filtering links
    const validNodeIds = new Set(nodes.map((n) => n.id));

    // Create links data - FILTER OUT invalid links where source or target doesn't exist
    const links = dataFlows
      .filter((flow) => validNodeIds.has(flow.source) && validNodeIds.has(flow.target))
      .map((flow) => ({
        source: flow.source,
        target: flow.target,
        description: flow.description,
        risks: flow.securityRisks.length,
      }));

    // Create a force simulation
    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        "link",
        d3
          .forceLink(links as any)
          .id((d: any) => d.id)
          .distance(150)
      )
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(nodeRadius + 10));

    // Create the links
    const link = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d) => Math.sqrt(d.risks) + 1);

    // Create arrow markers for links
    svg
      .append("defs")
      .selectAll("marker")
      .data(["end"])
      .join("marker")
      .attr("id", (d) => d)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", nodeRadius + 10)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", "#999")
      .attr("d", "M0,-5L10,0L0,5");

    link.attr("marker-end", "url(#end)");

    // Helper function to get color based on component type (dynamic)
    const getNodeColor = (type: string, isSelected: boolean) => {
      if (isSelected) {
        return "hsl(var(--primary))";
      }
      
      // Normalize type for comparison
      const normalizedType = type.toLowerCase();
      
      // Dynamic color mapping based on common component types
      if (normalizedType.includes("control") || normalizedType.includes("plane")) {
        return "hsl(var(--primary) / 0.8)";
      }
      if (normalizedType.includes("node") || normalizedType.includes("worker")) {
        return "hsl(var(--secondary) / 0.8)";
      }
      if (normalizedType.includes("external") || normalizedType.includes("user") || normalizedType.includes("actor")) {
        return "hsl(220, 70%, 50%)"; // Blue for external/user
      }
      if (normalizedType.includes("infrastructure") || normalizedType.includes("database") || normalizedType.includes("storage")) {
        return "hsl(280, 60%, 50%)"; // Purple for infrastructure/database
      }
      if (normalizedType.includes("gateway") || normalizedType.includes("api")) {
        return "hsl(150, 60%, 45%)"; // Green for gateway/API
      }
      if (normalizedType.includes("service") || normalizedType.includes("backend")) {
        return "hsl(30, 80%, 55%)"; // Orange for services
      }
      
      // Default color
      return "hsl(var(--muted) / 0.8)";
    };

    // Create the nodes
    const node = svg
      .append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("cursor", "pointer")
      .on("click", (event, d) => {
        if (onSelectComponent) {
          onSelectComponent(d.id);
        }
      })
      .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible").html(`
            <div class="font-semibold">${d.id}</div>
            <div class="text-xs text-muted-foreground">${d.type}</div>
            <div class="mt-1">${d.description}</div>
            <div class="mt-1 text-xs">
              <span class="font-semibold">${d.risks}</span> risks identified
              (${d.highRisks} high/critical)
            </div>
          `);

        // Position tooltip near the mouse but not directly under it
        const [x, y] = d3.pointer(event, document.body);
        tooltip.style("left", `${x + 15}px`).style("top", `${y - 10}px`);
      })
      .on("mousemove", (event) => {
        const [x, y] = d3.pointer(event, document.body);
        tooltip.style("left", `${x + 15}px`).style("top", `${y - 10}px`);
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      })
      .call(
        d3
          .drag<SVGGElement, any>()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended) as any
      );

    // Add circles to nodes
    node
      .append("circle")
      .attr("r", nodeRadius)
      .attr("fill", (d) => getNodeColor(d.type, selectedComponent === d.id))
      .attr("stroke", (d) => {
        if (d.highRisks > 0) {
          return "hsl(var(--destructive))";
        }
        return d.risks > 0 ? "hsl(var(--warning))" : "hsl(var(--border))";
      })
      .attr("stroke-width", (d) => {
        return d.highRisks > 0 ? 3 : d.risks > 0 ? 2 : 1;
      });

    // Add text labels to nodes
    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".3em")
      .attr("fill", (d) =>
        selectedComponent === d.id ? "white" : "currentColor"
      )
      .attr("font-size", "10px")
      .attr("pointer-events", "none")
      .text((d) => d.id)
      .call(wrap, nodeRadius * 1.5);

    // Add risk indicators
    node
      .filter((d) => d.risks > 0)
      .append("circle")
      .attr("r", 10)
      .attr("cx", nodeRadius - 10)
      .attr("cy", -nodeRadius + 10)
      .attr("fill", (d) =>
        d.highRisks > 0 ? "hsl(var(--destructive))" : "hsl(var(--warning))"
      )
      .attr("stroke", "white")
      .attr("stroke-width", 1);

    node
      .filter((d) => d.risks > 0)
      .append("text")
      .attr("x", nodeRadius - 10)
      .attr("y", -nodeRadius + 10)
      .attr("text-anchor", "middle")
      .attr("dy", ".3em")
      .attr("fill", "white")
      .attr("font-size", "8px")
      .attr("pointer-events", "none")
      .text((d) => d.risks);

    // Update positions on each tick of the simulation
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // Function to wrap text
    function wrap(
      text: d3.Selection<SVGTextElement, any, SVGGElement, any>,
      width: number
    ) {
      text.each(function () {
        const text = d3.select(this);
        const words = text.text().split(/\s+/).reverse();
        let word;
        let line: string[] = [];
        let lineNumber = 0;
        const lineHeight = 1.1; // ems
        const y = text.attr("y");
        const dy = parseFloat(text.attr("dy") || "0");
        let tspan = text
          .text(null)
          .append("tspan")
          .attr("x", 0)
          .attr("y", y)
          .attr("dy", dy + "em");

        while ((word = words.pop())) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node()!.getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text
              .append("tspan")
              .attr("x", 0)
              .attr("y", y)
              .attr("dy", ++lineNumber * lineHeight + dy + "em")
              .text(word);
          }
        }
      });
    }

    // Cleanup function
    return () => {
      simulation.stop();
    };
  }, [components, dataFlows, selectedComponent, onSelectComponent]);

  // Extract unique component types from the data for the legend
  const uniqueTypes = Array.from(new Set(components.map((c) => c.type)));

  return (
    <Card>
      <CardContent className="p-4 overflow-hidden">
        <div className="relative">
          <svg ref={svgRef} className="w-full"></svg>
          <div ref={tooltipRef} className="absolute hidden md:block"></div>
        </div>
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          {uniqueTypes.map((type) => (
            <div key={type} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ 
                  backgroundColor: type.toLowerCase().includes('external') || type.toLowerCase().includes('user') || type.toLowerCase().includes('actor')
                    ? 'hsl(220, 70%, 50%)'
                    : type.toLowerCase().includes('gateway') || type.toLowerCase().includes('api')
                    ? 'hsl(150, 60%, 45%)'
                    : type.toLowerCase().includes('service') || type.toLowerCase().includes('backend')
                    ? 'hsl(30, 80%, 55%)'
                    : type.toLowerCase().includes('database') || type.toLowerCase().includes('storage')
                    ? 'hsl(280, 60%, 50%)'
                    : 'hsl(var(--muted))'
                }}
              ></div>
              <span className="text-xs">{type}</span>
            </div>
          ))}
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full border-2 border-destructive mr-2"></div>
            <span className="text-xs">High Risk</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
