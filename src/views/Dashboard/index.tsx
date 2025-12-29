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
  const lineRef = useRef(null);
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const radarRef = useRef(null);

  const [reportData, setReportData] = useState<IReportData>();
  const [lineChartData, setLineChartData] = useState<ILineChartData>();
  const [pieCity, setPieCity] = useState<IPieData[]>([]);
  const [pieAge, setPieAge] = useState<IPieData[]>([]);
  const [radarData, setRadarData] = useState<IRadarResponse>();

  const getReport = async () => {
    const res = await getReportData();
    setReportData(res);
  };

  const getLineChart = async () => {
    const res = await getLineChartData();
    setLineChartData(res);
  };
  const getRadarChart = async () => {
    const res = await getRadarData();
    setRadarData(res);
  };

  const getPieCity = async () => {
    const res = await getPieCityData();
    setPieCity(res);
  };
  const getPieAge = async () => {
    const res = await getPieAgeData();
    setPieAge(res);
  };

  const renderPieChart = () => {
    getPieCity();
    getPieAge();
  };
  const renderRadarChart = () => {
    getRadarChart();
  };
  const renderLineChart = () => {
    getLineChart();
  };

  useEffect(() => {
    getReport();
    getLineChart();
    getPieCity();
    getPieAge();
    getRadarChart();
  }, []);
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
          extra={<Button onClick={renderLineChart}>刷新</Button>}
        >
          <div ref={lineRef} className={styles.lineChart}></div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title="程序员top6"
          extra={<Button onClick={renderPieChart}>刷新</Button>}
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
          extra={<Button onClick={renderRadarChart}>刷新</Button>}
        >
          <div ref={radarRef} className={styles.radarChart}></div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
