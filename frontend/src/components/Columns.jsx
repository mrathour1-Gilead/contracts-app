// columns.js
import { Tag, Button, Space, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

export const columns = [
  {
    title: "Contract Name",
    dataIndex: "contractName",
    key: "contractName",
    sorter: true,
    render: (text) => <strong>{text}</strong>,
  },
  {
    title: "CMO",
    dataIndex: "cmo",
    key: "cmo",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      const colorMap = {
        Active: "green",
        "Expiring Soon": "orange",
        Draft: "default",
        Archived: "gray",
      };
      return <Tag color={colorMap[status]}>{status}</Tag>;
    },
  },
  {
    title: "Effective Date",
    dataIndex: "effectiveDate",
    key: "effectiveDate",
    sorter: true,
  },
  {
    title: "Owner",
    dataIndex: "owner",
    key: "owner",
    render: (owner) => (
      <Space>
        <img
          src={owner?.avatar}
          alt={owner?.name}
          style={{ width: 24, height: 24, borderRadius: "50%" }}
        />
        {owner?.name}
      </Space>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    align: "right",
    render: (_, record) => (
      <Space>
        <Button size="small">View</Button>

        <Dropdown
          menu={{
            items: [
              { key: "edit", label: "Edit" },
              { key: "archive", label: "Archive" },
            ],
          }}
        >
          <Button size="small">
            More <DownOutlined />
          </Button>
        </Dropdown>
      </Space>
    ),
  },
];
 