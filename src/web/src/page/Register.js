import React from 'react';
import { useState } from "react";
import {LockOutlined, SecurityScanOutlined, UserOutlined} from '@ant-design/icons';
import PropTypes from 'prop-types';
import { BrowserRouter, Router, Link, Route,withRouter,useHistory } from "react-router-dom";
import { Button, Checkbox, Form, Input, notification,Col,Row } from 'antd';
import axios from 'axios';
//import './style.css';
import SkeletonInput from 'antd/lib/skeleton/Input';

const Register = props => {

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
    //     fetch('http://localhost:8080/api/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'

    //         },
    //         body: JSON.stringify({
    //             username: data.username,
    //             password: data.password
    //         })
    //     }).then((response) => {
    //         if (response.code == 932361) {
    //             props.history.push('/Search');
    //         }
    //         if (response.code == 932360) {
    //             notification.error({
    //                 message: response.msg,
    //             })
    //         }
    //         console.log(response);
    //     })
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    // }
    axios.post('http://127.0.0.1:8080/api/user', {
        username: data.username,
        password: data.password
    })
        .then(function (response) {
            if (response.data.code == 932311) {
                //props.history.push('/Search');
                //跳转回login页面
                window.location.href="/Search";
                
                // notification.success({
                //     message: response.data.msg
                // })
        
            }
            if (response.data.code == 932310) {
                notification.error({
                    message : response.data.msg
                    
                })
                //alert( response.data.msg);
            }
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className = 'box1'>
            <Row>
                <div style={{height:"40vh",width:"40vh"}}></div>
            </Row>
            <Row>
                <Col span={10}>

                </Col>
                <Col span={4}>
                    <SecurityScanOutlined spin style={{fontSize:"60px",color:"white"}}/>

                    <b style={{fontSize:"60px",color:"white",fontStyle:"oblique"}}>CORE</b>
                </Col>
                <Col span={10}>

                </Col>


            </Row>
            <Row>

            </Row>
            <Row>
                <Col span={10}></Col>

                <Col span={4}>
                    <Form
                        name="normal_register"    //change
                        className="register-form"     //change
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item

                            name="username"
                            className = 'cssusername1'
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
                                allowClear={true}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            className = 'csspass1'
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
                                allowClear={true}

                            />
                        </Form.Item>
                        {/* <Form.Item className = 'remember'>

                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

            </Form.Item> */}
                        <Row>
                            <Col span={8}>

                            </Col>
                            <Col span={8}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="register-form-button">
                                        Register
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col span={8}>

                            </Col>
                        </Row>


                    </Form>
                </Col>
                <Col span={10}></Col>
            </Row>

        </div>
    )
}   // end of Regist
export default Register;
