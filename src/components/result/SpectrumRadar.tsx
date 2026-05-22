"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { RadarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { DIMENSIONS, type DimensionScore } from "@/lib/mbti/types";

echarts.use([
  RadarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
]);

interface SpectrumRadarProps {
  scores: Record<string, DimensionScore>;
  type: string;
}

/**
 * Radar visualization with two overlaid polygons:
 *   - the "left letters" polygon (E, S, T, J side)
 *   - the "right letters" polygon (I, N, F, P side)
 * Each axis is a single dimension; the axis ranges 0-100.
 * The polygon for the dominant side is filled stronger.
 */
export function SpectrumRadar({ scores, type }: SpectrumRadarProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current, undefined, { renderer: "canvas" });

    const indicators = DIMENSIONS.map((d) => ({
      name: `${d.left} ↔ ${d.right}`,
      max: 100,
    }));

    const leftData = DIMENSIONS.map((d) => scores[d.code].percentageLeft);
    const rightData = DIMENSIONS.map((d) => scores[d.code].percentageRight);

    chart.setOption({
      tooltip: {
        trigger: "item",
        formatter: (params: { name: string; value: number[] }) => {
          const lines = DIMENSIONS.map((d, i) => {
            const v = params.value[i];
            const side = params.name.includes("left") ? d.left : d.right;
            return `${d.left}↔${d.right}: ${side} ${v}%`;
          });
          return [params.name, ...lines].join("<br/>");
        },
      },
      radar: {
        shape: "polygon",
        indicator: indicators,
        radius: "65%",
        splitNumber: 4,
        axisName: {
          color: "#71717a",
          fontSize: 12,
          fontFamily: "ui-monospace, SFMono-Regular, monospace",
        },
        splitLine: { lineStyle: { color: "rgba(113, 113, 122, 0.2)" } },
        splitArea: {
          areaStyle: {
            color: ["rgba(244,244,245,0.4)", "rgba(244,244,245,0)"],
          },
        },
        axisLine: { lineStyle: { color: "rgba(113, 113, 122, 0.3)" } },
      },
      series: [
        {
          type: "radar",
          symbol: "circle",
          symbolSize: 5,
          data: [
            {
              name: "left letters (E·S·T·J)",
              value: leftData,
              lineStyle: { color: "#f43f5e", width: 2 },
              itemStyle: { color: "#f43f5e" },
              areaStyle: { color: "rgba(244, 63, 94, 0.15)" },
            },
            {
              name: "right letters (I·N·F·P)",
              value: rightData,
              lineStyle: { color: "#10b981", width: 2 },
              itemStyle: { color: "#10b981" },
              areaStyle: { color: "rgba(16, 185, 129, 0.15)" },
            },
          ],
        },
      ],
    });

    const onResize = () => chart.resize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      chart.dispose();
    };
  }, [scores, type]);

  return <div ref={ref} className="h-[360px] w-full" />;
}
