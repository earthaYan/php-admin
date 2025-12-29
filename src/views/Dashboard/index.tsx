import {
  Avatar,
  Button,
  Card,
  Descriptions,
  type DescriptionsProps,
} from "antd";
import styles from "./index.module.less";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  getPieAgeData,
  getPieCityData,
  getReportData,
  getLineChartData,
  getRadarData,
  type IReportData,
  type ILineChartData,
  type IPieData,
  type IRadarResponse,
} from "@/api/dashboard";
import { useUserStore } from "@/store";
import { stateMap } from "./index.data";
import { useEcharts } from "@/hooks/useEcharts";

const Dashboard = () => {
  const { userInfo } = useUserStore();
  const items: DescriptionsProps["items"] = useMemo(
    () => [
      {
        key: "id",
        label: "用户id",
        children: userInfo?.userId,
      },
      {
        key: "email",
        label: "邮箱",
        children: userInfo?.userEmail,
      },
      {
        key: "status",
        label: "状态",
        children: stateMap[userInfo?.state || 0],
      },
      {
        key: "tel",
        label: "手机号",
        children: userInfo?.mobile,
      },
      {
        key: "position",
        label: "岗位",
        children: userInfo?.job,
      },
      {
        key: "department",
        label: "部门",
        children: userInfo?.deptName,
      },
    ],
    [userInfo]
  );
  const [lineRef, lineChart] = useEcharts();
  const [frontRef, frontChart] = useEcharts();
  const [backRef, backChart] = useEcharts();
  const [radarRef, radarChart] = useEcharts();

  const [reportData, setReportData] = useState<IReportData>();

  const getReport = async () => {
    const res = await getReportData();
    setReportData(res);
  };

  const renderPieChart = async () => {
    if (frontChart) {
      const res = await getPieCityData();
      frontChart.setOption({
        title: {
          text: "前端",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          left: "default",
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            data: res,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    }
    if (backChart) {
      const res = await getPieAgeData();
      backChart.setOption({
        title: {
          text: "后端",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          left: "default",
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            data: res,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    }
  };

  const renderLineChart = async () => {
    if (lineChart) {
      const res = await getLineChartData();

      lineChart.setOption({
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["订单", "流水"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "20%",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: res?.label,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "订单",
            type: "line",
            data: res.order,
          },
          {
            name: "流水",
            type: "line",
            data: res.money,
          },
        ],
      });
    }
  };

  const renderRadarChart = async () => {
    if (radarChart) {
      const res = await getRadarData();
      radarChart.setOption({
        tooltip: {
          trigger: "item",
        },
        radar: {
          indicator: res.indicator,
        },
        series: [
          {
            type: "radar",
            data: res.data,
          },
        ],
      });
    }
  };

  useEffect(() => {
    getReport();
  }, []);

  useEffect(() => {
    renderLineChart();
    renderPieChart();
    renderRadarChart();
  }, [lineChart, frontChart, backChart, radarChart]);

  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <img src={userInfo?.userImg} className={styles.avatar} />
        <Descriptions items={items} title="用户信息" />
      </div>
      <div className={styles.report}>
        <div className={styles.card}>
          <div className={styles.title}>提交代码行数</div>
          <div className={styles.content}>{reportData?.codeLine || "--"}行</div>
        </div>
        <div className={styles.card}>
          <div className={styles.title}>个人工资</div>
          <div className={styles.content}>{reportData?.salary || "--"}元</div>
        </div>
        <div className={styles.card}>
          <div className={styles.title}>完成需求</div>
          <div className={styles.content}>
            {reportData?.icafeCount || "--"}个
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.title}>项目数量</div>
          <div className={styles.content}>
            {reportData?.projectNum || "--"}项
          </div>
        </div>
      </div>
      <div className={styles.chart}>
        <Card
          title="消费流水"
          extra={
            <Button type="primary" onClick={renderLineChart}>
              刷新
            </Button>
          }
        >
          <div ref={lineRef} className={styles.lineChart}></div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title="程序员top6"
          extra={
            <Button type="primary" onClick={renderPieChart}>
              刷新
            </Button>
          }
        >
          <div className={styles.pieChart}>
            <div ref={frontRef} className={styles.pieItem}></div>
            <div ref={backRef} className={styles.pieItem}></div>
          </div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title="技能雷达图"
          extra={
            <Button type="primary" onClick={renderRadarChart}>
              刷新
            </Button>
          }
        >
          <div ref={radarRef} className={styles.radarChart}></div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
