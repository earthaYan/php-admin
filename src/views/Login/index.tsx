import { Button, Form, Input, type FormProps } from "antd";
import "./index.less";
import { UserLogin, type ILoginParams } from "@/api/users";
import storage from "@/utils/storage";

const Login = () => {
  const onFinish: FormProps<ILoginParams>["onFinish"] = async (values) => {
    const token = await UserLogin(values);
    storage.set("token", token);
  };

  const onFinishFailed: FormProps<ILoginParams>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="title">登录界面</div>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<ILoginParams>
            label="Username"
            name="userName"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<ILoginParams>
            label="Password"
            name="userPwd"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" block htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
