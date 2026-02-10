// sections/StatusGeneralTerms.jsx
import {
  Form,
  Input,
  DatePicker,
  Card,
  Row,
  Col,
  Radio,
  List,
} from "antd";

export default function StatusGeneralTerms() {
  return (
    <Card title="Status Update">
      <Form layout="vertical">
        {/* Row 1 */}
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="Most Recent Contract Update - Name" name="updateName">
              <Input placeholder="Updated by" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Most Recent Contract Update - Date" name="updateDate">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Template Migration Status" name="templateMigration">
              <Radio.Group>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        {/* Row 2 */}
        <Row gutter={24}>
          <Col span={16}>
            <Form.Item label="Contracts Consolidation">
              <List
                bordered
                size="small"
                dataSource={[
                  "Amendment 1 – Jan 2022",
                  "Amendment 2 – Aug 2023",
                ]}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="QAG Approval?" name="qagApproval">
              <Radio.Group>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="QAG Linkage in MSA" name="qagLinkage">
              <Radio.Group>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}
 