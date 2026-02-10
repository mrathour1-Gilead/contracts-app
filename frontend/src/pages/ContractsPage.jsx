import { Table, Button, Space, Input, Card } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  DownloadOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { columns } from "../components/Columns";
import { dataSource } from "../components/data";

export default function ContractsPage() {
  const navigate = useNavigate();

  return (
    <Card>
      {/* Card Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/contracts/new")}
          >
            Create New Contract
          </Button>

          <Input
            prefix={<SearchOutlined />}
            placeholder="Search contracts"
            style={{ width: 260 }}
          />
        </Space>

        <Space>
          {/* <Button icon={<FilterOutlined />}>Filters</Button> */}
          <Button icon={<DownloadOutlined />}>Export</Button>
        </Space>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 8 }}
      />
    </Card>
  );
}
 