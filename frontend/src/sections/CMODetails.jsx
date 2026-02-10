// sections/CMODetails.jsx
import { Form, Input, Button, Card, Row, Col, InputNumber, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createContract } from "../store/contracts/contractsThunks";

export default function CMODetails({ onCreated }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const loading = useSelector(
    (state) => state.contracts.loading.create
  );

  const onFinish = async (values) => {
    const result = await dispatch(createContract(values));

    if (createContract.fulfilled.match(result)) {
      onCreated();
    }
  };

  return (
    <Card title="CMO Details">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              label="CMO Parent"
              name="cmoParent"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="2025 Spend (M$)" name="spend2025">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="CMO Name"
              name="cmoName"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="Signing Entity 1" name="signingEntity1">
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Supplier Entity 2" name="supplierEntity2">
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Supplier Entity 3" name="supplierEntity3">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="Location (Facility)" name="location">
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Supplier Relationship Owner"
              name="relationshipOwner"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Territory" name="territory">
              <Select
                options={[
                  { label: "North America", value: "NA" },
                  { label: "Europe", value: "EU" },
                  { label: "APAC", value: "APAC" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Save & Continue
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
 