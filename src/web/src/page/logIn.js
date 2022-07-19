import React from 'react';
import { useState } from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { BrowserRouter, Router, Link, Route } from "react-router-dom";
import { Button, Checkbox, Form, Input, notification } from 'antd';
import axios from 'axios';
import './style.css';

const LogIn = props => {

    const onFinish = (values) => {
        console.log('Success:', values);
        submit_user(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [Inputs, setInput] = useState("");

    function getinput(event) {
        setInput(previousState => {
            console.log({ Inputs });
            return { Inputs: event.target.value }
        })
    }
    function submit_user(data) {
        // debugger;
        fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'

            },
            body: JSON.stringify({
                username: data.username,
                password: data.password
            })
        }).then((response) => {
            if (response.code == 932361) {
                props.history.push('/Search');
            }
            if (response.code == 932360) {
                notification.error({
                    message: response.msg,
                })
            }
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            })
    }
    // axios.post('http://localhost:8080/api/login', {
    //     username: data.username,
    //     password: data.password
    // })
    //     .then(function (response) {
    //         if (response.code == 932361) {
    //             props.history.push('/Search');
    //         }
    //         if (response.code == 932360) {
    //             notification.error({
    //                 message: 'Wrong password',
    //             })
    //         }
    //         console.log(response);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });


    return (
        <div className = 'box'>   
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item

                name="username"
                className = 'cssusername'
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    onChange={getinput}
                    placeholder="Username"
                />
            </Form.Item>
            <Form.Item
                name="password"
                className = 'csspass'
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    onChange={getinput}
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item className = 'remember'>
            
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
            </Form.Item>
        </Form>
        </div>
    )
}   // end of LogIn
export default LogIn;
