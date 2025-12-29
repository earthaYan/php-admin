import type { IDepItem } from "@/api/departments";
import { Button, Space, type TableColumnsType } from "antd";
import dayjs from "dayjs";

interface IUseColumnsProps {
  handleSubCreate: (id?: string) => void;
  handleDelete: (id?: string) => void;
  handleEdit: (record: IDepItem) => void;
}

export const useColumns = (props: IUseColumnsProps) => {
  const { handleDelete, handleEdit, handleSubCreate } = props;

  const columns: TableColumnsType<IDepItem> = [
    {
      title: "部门名称",
      dataIndex: "deptName",
      key: "deptName",
      width: 200,
    },
    {
      title: "负责人",
      dataIndex: "userName",
      key: "userName",
      width: 150,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "操作",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleSubCreate(record._id)}>
            新增
          </Button>
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button
            type="link"
            danger
            onClick={() => {
              handleDelete(record._id);
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return { columns };
};
