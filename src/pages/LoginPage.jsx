/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const LoginPage = () => {
    return (
        <div className='flex w-full h-screen items-center justify-center'>
            <div className='w-1/3 bg-white px-12 py-8 rounded-lg shadow-md'>
                <h3>Furniturer Dashboard</h3>
                <Form
                    style={{ margin: "auto" }}
                    initialValues={{
                        email: "admin@gmail.com",
                        password: "123456789"
                    }}
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
                        <div className='flex flex-row justify-between'>
                            <Form.Item name="remember" valuePropName='checked' noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a
                                className=''
                                href='#'>
                                Forgot password
                            </a>
                        </div>

                    </Form.Item>

                    <Form.Item className='!mb-0'>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='mr-2'
                        >
                            Login
                        </Button>
                        Or
                        <a className='ml-2' href='#'>Register now</a>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage