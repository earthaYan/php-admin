import { useEffect, useRef, useState, type RefObject } from "react";
import * as echarts from "echarts";

export const useEcharts = (): [
  RefObject<HTMLDivElement | null>,
  echarts.EChartsType | undefined
] => {
  const ref = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.EChartsType>(null);

  const [chartInstance, setChart] = useState<echarts.EChartsType>();

  useEffect(() => {
    const handleResize = () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current?.resize();
      }
    };
    if (ref.current) {
      const instance = echarts.init(ref.current);
      setChart(instance);
      chartInstanceRef.current = instance;
    }

    window.addEventListener("resize", handleResize);

    return () => {
      if (chartInstanceRef.current) {
        window.removeEventListener("resize", handleResize);

        chartInstanceRef.current.dispose();
      }
    };
  }, []);

  return [ref, chartInstance];
};
