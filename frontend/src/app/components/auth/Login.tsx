 
/**
 * Login Component
 */
import { Form, Input, Button, Card, Divider } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { loginAsync } from '@/app/store/auth/authThunks';
import { Link } from 'react-router';
interface LoginFormValues {
  email: string;
  password: string;
}
export function Login() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const handleSubmit = async (values: LoginFormValues) => {
    if(isLoading) return;
    await dispatch(
      loginAsync({
        email: values.email.trim().toLowerCase(),
        password: values.password,
      })
    );
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ backgroundColor: '#306e9a' }}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Global Supply Chain Contracts Summary Database</p>
        </div>
        <Card className="shadow-xl border border-gray-200" style={{ borderRadius: '12px' }}>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Sign in to your account
          </h2>
          <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark={false}>
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
                {
                  validator: (_, value) => {
                    if (!value || value.toLowerCase().endsWith('@gilead.com')) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Email must be @gilead.com domain')
                    );
                  },
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="you@gilead.com"
                size="large"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please enter your password' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter your password"
                size="large"
              />
            </Form.Item>
            <div className="flex items-center justify-between mb-6">
              <a href="#" className="text-sm hover:underline" style={{ color: '#306e9a' }}>
                Forgot password?
              </a>
            </div>
            <Form.Item className="mb-4">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={isLoading}
                block
                style={{
                  backgroundColor: '#306e9a',
                  borderColor: '#306e9a',
                  height: '48px',
                  fontSize: '16px',
                  fontWeight: 500,
                }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
          <Divider plain style={{ margin: '24px 0' }}>
            <span className="text-gray-500 text-sm">or</span>
          </Divider>
          <div className="text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/signup" className="font-medium hover:underline" style={{ color: '#306e9a' }}>
              Sign up
            </Link>
          </div>
        </Card>
        {/*
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2026 Global Supply Chain Contracts. All rights reserved.</p>
        </div> */}
      </div>
    </div>
  );
}