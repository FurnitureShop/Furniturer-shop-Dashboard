/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const LoginPage = () => {
    return (
        <div className='flex w-full h-screen items-center justify-center'>
            <div className='w-96'>
                <h3>Furniturer Dashboard</h3>
                <Form
                    style={{ margin: "auto"}}
                >
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Email"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            type={"password"}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName='checked' noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a href='#'>
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='mr-2'
                        >
                            Login
                        </Button>
                        Or
                        <a className='ml-2' href='#'>Register noew</a>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage