import { Button, Form, Input, Space, Table } from "antd";
// import styles from "./index.module.less";
import { useEffect, useState } from "react";
import { getDepartList } from "@/api/departments";
import type { IDepItem, IGetDepartListParams } from "@/api/departments";
import { useColumns } from "./hooks/useColumns";
import CreateDept from "./CreateDept";

const DepartmentList = () => {
  const [form] = Form.useForm<IGetDepartListParams>();

  const handleSubCreate = (id?: string) => {
    console.log(id);
  };
  const handleDelete = (id?: string) => {
    console.log(id);
  };
  const handleEdit = (record: IDepItem) => {
    console.log(record);
  };

  const { columns } = useColumns({ handleDelete, handleEdit, handleSubCreate });

  const [dataSource, setDataSource] = useState<IDepItem[]>([]);

  const fetchData = async () => {
    const res = await getDepartList(form.getFieldsValue());
    setDataSource(res);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchData();
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReset = () => {
    form.resetFields();
    fetchData();
  };

  return (
    <>
      <Form
        form={form}
        layout="inline"
        className="search-form"
        onFinish={fetchData}
        onReset={handleReset}
      >
        <Form.Item name="deptName" label="部门名称">
          <Input placeholder="请输入部门名称" />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button htmlType="reset">重置</Button>
          </Space>
        </Form.Item>
      </Form>
      <div className="wrap-table">
        <div className="header">
          <div className="title">部门管理</div>
          <div className="action">
            <Button>新增</Button>
          </div>
        </div>
        <Table rowKey="_id" dataSource={dataSource} columns={columns} />
        <CreateDept />
      </div>
    </>
  );
};

export default DepartmentList;
