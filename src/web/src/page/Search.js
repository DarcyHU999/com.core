import React, {useEffect} from 'react';
import { useState } from "react";
import { DownOutlined, ApiOutlined, } from '@ant-design/icons';
import { SearchOutlined,SecurityScanOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Input } from 'antd';
import { Col, Row,Form,Switch } from 'antd';
import axios from 'axios';
import { Spin } from 'antd';
import {  Dropdown, Menu, Modal, Space,Rate ,Steps,notification} from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import { useNavigate, Link,createSearchParams} from "react-router-dom";

import background from "./backgroud.jpeg";







const SearchPage = () => {
    const [loading, setLoading] = useState(false);

    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
    const [value, setValue] = useState(0);

    const [value2, setValue2] = useState(0);
    const [value3, setValue3] = useState(0);
    // const [visible, setVisible] = useState(false);

    // const handleClose = () => {
    //     setVisible(false);
    // };
    const [isModalVisible, setIsModalVisible] = useState(false);
    const openNotificationWithIcon = (type) => {
        notification[type]({
            message: 'Error',
            description:
                'Please select API.',
        });
    };
    const openNotificationWithIcon2 = (type) => {
        notification[type]({
            message: 'Error',
            description:
                'Please input keyword.',
        });
    };
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const [inputInform, setInput] = useState("")
    const [API, setAPI] = useState("-1")

    let navigate = useNavigate();
    const toggle = (checked) => {
        setLoading(checked);
    };
    const handleMenuClick = (e) => {
        console.log("++++",{API})
        setAPI(e.key)


    };
    const menu = (
        <Menu
            onClick={handleMenuClick}
            items={[
                {
                    label: 'Vpcs',
                    key: '1',
                    icon: <ApiOutlined />,
                },
                {
                    label: 'SecurityGroups',
                    key: '2',
                    icon: <ApiOutlined />,
                },
                {
                    label: 'Subnets',
                    key: '3',
                    icon: <ApiOutlined />,
                },
                {
                    label: 'Reservations',
                    key: '4',
                    icon: <ApiOutlined />,
                },
                {
                    label: 'Table',
                    key: '5',
                    icon: <ApiOutlined />,
                },
            ]}
        />
    );

    function handleChange(event) {
        setInput(previousState => {
            return { ...previousState, inputInform: event.target.value }
        })
    }
    function submitInform(){




        if({inputInform}.inputInform=='' && {API}.API=='-1'){
            openNotificationWithIcon2('error');
            openNotificationWithIcon('error');
        }else if({API}.API=='-1'){
            openNotificationWithIcon('error');
        }else if({inputInform}.inputInform==''){
            openNotificationWithIcon2('error');

        }
        else{
            toggle();




            let key=inputInform.inputInform
            let api=API
            let url='http://localhost:8080/api/ApiInfo/'+api+'/'+key
            axios.get(url)
                .then(function (response) {


                    // setData(response.data.data)

                    navigate("/summary", { state: response.data.data })

                })
                .catch(function (error) {
                    console.log(error);
                });

        }




    }

    return (
        <div style={{ height:"100vh",backgroundImage: `url(${background})` ,backgroundRepeat: 'no-repeat',
            backgroundSize:"100%,100%"}}>

            <div style={{height:"30vh",width:"500px"}}>
                {/*{visible ? (*/}
                {/*    <Alert message="Alert Message Text" type="success" closable afterClose={handleClose} />*/}
                {/*) : null}*/}
                {/*<Switch checked={loading} onChange={toggle} />*/}
            </div>
            <div>
                <Row>
                    <Col span={11}>

                    </Col>
                    <Col span={3}>
                        <SecurityScanOutlined spin style={{fontSize:"60px",color:"white"}}/>

                            <b style={{fontSize:"60px",color:"white",fontStyle:"oblique"}}>CORE</b>

                    </Col>
                    <Col span={10}>

                    </Col>
                </Row>
                <Row>
                    <div style={{width:"100px",height:"30px"}}></div>
                </Row>
                <Row>
                    <Col span={7}></Col>
                    <Col span={1}>
                        <Spin spinning={loading} size="large"></Spin>
                    </Col>
                    <Col span={2}>
                        <Dropdown overlay={menu} >
                            <Button style={{height:"5vh",fontSize:"1.5rem"}}>
                                <Space>
                                    API
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                    </Col>
                    <Col span={4}>
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}

                            autoComplete="on"
                        >
                            <Form.Item
                                // label="Username"
                                name="username"
                            >

                                <Input onChange={handleChange} placeholder="Please input keyword" style={{height:"5vh",fontSize:"1.5rem"}}/>
                            </Form.Item>
                        </Form>







                    </Col>
                    <Col span={4}>

                        {/*<Link*/}
                        {/*    to={`/summary`}*/}
                        {/*    state={{ data: "the-page-id" }}*/}
                        {/*>*/}
                        <Button type="primary" icon={<SearchOutlined />} onClick={submitInform} style={{height:"5vh",fontSize:"1.5rem"}}>
                            Search
                        </Button>
                        <div>


                        </div>



                        {/*</Link>*/}
                    </Col>

                    <Col span={6}>
                        <Button type="primary" onClick={showModal} style={{height:"5vh",fontSize:"1.5rem"}}>
                            Mark APIs
                        </Button>
                        <Modal title="Mark items" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <div>
                                <b>Security Group </b>
                                <span>
                                    <Rate tooltips={desc} onChange={setValue} value={value} />
                                    {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
                                </span>
                            </div>
                            <div>
                                <b>item22222222 </b>
                                <span>
                                    <Rate tooltips={desc} onChange={setValue2} value={value2} />
                                    {value2 ? <span className="ant-rate-text">{desc[value2 - 1]}</span> : ''}
                                </span>
                            </div>
                            <div>
                                <b>item22222222 </b>
                                <span>
                                    <Rate tooltips={desc} onChange={setValue3} value={value3} />
                                    {value3 ? <span className="ant-rate-text">{desc[value3 - 1]}</span> : ''}
                                </span>
                            </div>
                        </Modal>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>

                    </Col>
                    <Col span={8} >




                    </Col>
                    <Col span={8}>

                    </Col>
                </Row>
            </div>

        </div>
    );

};

export default SearchPage;