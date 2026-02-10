// pages/CreateContractPage.jsx
import { Layout, Menu, Button, Space, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import CMODetails from "../sections/CMODetails";
import GeneralTerms from "../sections/GeneralTerms";
import StatusUpdate from "../sections/StatusUpdate";
import Delivery from "../sections/Delivery";

const { Title } = Typography;
const { Sider, Content } = Layout;

const sections = [
  { key: "cmo", label: "CMO Details" },
  { key: "statusUpdate", label: "Status Update" },
  { key: "generalItems", label: "Status & General Terms" },
  { key: "delivery", label: "Delivery" },
];

export default function CreateContractPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState("cmo");
  const [created, setCreated] = useState(false);

  return (
    <>
      {/* Page Header */}
      <Space align="center" style={{ marginBottom: 16 }}>
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/")}
        >
          Back
        </Button>

        <Title level={4} style={{ margin: 0 }}>
          Create Contract
        </Title>
      </Space>

      {/* Main Layout */}
      <Layout style={{ background: "#fff", minHeight: "70vh" }}>
        <Sider width={240} theme="light">
          <Menu
            mode="inline"
            selectedKeys={[active]}
            onClick={(e) => setActive(e.key)}
            // style={{backgroundColor: }}
            items={sections.map((s) => ({
              ...s,
              disabled: !created && s.key !== "cmo",
            }))}
          />
        </Sider>

        <Content style={{ padding: 24 }}>
          {active === "cmo" && (
            <CMODetails
              onCreated={() => {
                setCreated(true);
                setActive("statusUpdate");
              }}
            />
          )}
          {active === "statusUpdate" && <StatusUpdate />}
          {active === "generalItems" && <GeneralTerms />}
          {active === "delivery" && <Delivery />}
        </Content>
      </Layout>
    </>
  );
}