// columns.js
import { Tag, Button, Space, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";


export const columns = [
   {
    title: "CMO Name",
    dataIndex: "cmoName",
    key: "cmoName",
  },
   {
    title: "CMO Parent",
    dataIndex: "cmoParent",
    key: "cmoParent",
    sorter: true,
    render: (text) => <strong>{text}</strong>,
  },
   {
    title: "2025 Spend (M$)",
    dataIndex: "spend2025",
    key: "spend2025",
    sorter: true,
    render: (text) => <strong>{text}</strong>,
  },
  {
    title: "Territory",
    dataIndex: "territory",
    key: "territory",
  },
   {
    title: "Supplier Relationship Owner",
    dataIndex: "relationshipOwner",
    key: "relationshipOwner",
  },
    {
    title: "Location (Facility)",
    dataIndex: "location",
    key: "location",
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
      return <Tag color={colorMap["Active"]}>Active</Tag>;
    },
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