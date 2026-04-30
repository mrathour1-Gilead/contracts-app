import { useMemo, useState } from "react";
import { Table, Input, Button, Switch, Modal, Form, Tooltip } from "antd";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  createDropdownOption,
  updateDropdownOption,
  toggleDropdownOption,
  fetchDropdownOptions,
} from "@/app/store/dropdowns/dropdownThunks";
import { EditTwoTone } from "@ant-design/icons";

export const DropdownManagementPage = ({ type }: { type: string }) => {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((s) => s.dropdownOptions);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form] = Form.useForm();

  const filtered = useMemo(() => {
    return list
      .filter((i) => i.type === type)
      .filter((i) => i.label.toLowerCase().includes(search.toLowerCase()));
  }, [list, search, type]);

  const handleSubmit = async () => {
    if (loading.createUpdate) return;
    const values = await form.validateFields();
    values.type = type;

    if (editing) {
      await dispatch(
        updateDropdownOption({ id: editing.id, data: values }),
      ).unwrap();
    } else {
      await dispatch(createDropdownOption({ ...values, type })).unwrap();
    }

    setOpen(false);
    setEditing(null);
    form.resetFields();
  };

  const columns = [
    { title: "Label", dataIndex: "label" },
    { title: "Value", dataIndex: "value" },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (val: string) => (val ? new Date(val).toLocaleString() : "-"),
    },
    {
      title: "Active",
      render: (_: any, row: any) => (
        <Switch
          checked={row.active}
          onChange={() => dispatch(toggleDropdownOption(row.id))}
        />
      ),
    },
    {
      title: "Action",
      render: (_: any, row: any) => (
        <Tooltip title="Edit">
          <Button
            type="text"
            icon={<EditTwoTone twoToneColor="#306e9a" />}
            style={{ color: "#306e9a" }}
            onClick={() => {
              setEditing(row);
              form.setFieldsValue(row);
              setOpen(true);
            }}
          >
            Edit
          </Button>
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg border min-h-[30vh]">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Search..."
          style={{ width: 300 }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="primary" onClick={() => setOpen(true)}>
          Add New
        </Button>
      </div>

      {/* Table */}
      <Table
        rowKey="id"
        dataSource={filtered}
        columns={columns}
        loading={loading.list}
        scroll={{
          x: "max-content",
          y:"calc(100vh - 350px)",
        }}
        pagination={false}
        virtual
      />

      <Modal
        open={open}
        title={editing ? "Edit Option" : "Add Option"}
        onCancel={() => {
          setOpen(false);
          setEditing(null);
        }}
        okButtonProps={{
          loading: loading.createUpdate,
        }}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="label" label="Label" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="value" label="Value" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
