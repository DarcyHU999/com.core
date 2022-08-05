import React from 'react';
import { useState } from "react";
import { DownOutlined, ApiOutlined } from '@ant-design/icons';
import { SearchOutlined,SecurityScanOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Input } from 'antd';
import { Col, Row,Form } from 'antd';
import axios from 'axios';
import {  Dropdown, Menu, Modal, Space,Rate ,Checkbox} from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import { useNavigate, Link,createSearchParams} from "react-router-dom";
import {PageHeader} from 'antd';
import background from "./backgroud.jpeg";


const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};





const SearchPage = () => {
    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
    const [value, setValue] = useState(0);
    const [value2, setValue2] = useState(0);
    const [value3, setValue3] = useState(0);

    const [isModalVisible, setIsModalVisible] = useState(false);

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
    const [API, setAPI] = useState("")

    let navigate = useNavigate();

    const handleMenuClick = (e) => {
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

    return (
        <div style={{ height:"100vh",backgroundImage: `url(${background})` ,backgroundRepeat: 'no-repeat',
            backgroundSize:"100%,100%"}}>
            <div style={{height:"30vh",width:"500px"}}>
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
                    <Col span={8}>

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
                            onFinish={onFinish}
                            autoComplete="on"
                        >
                            <Form.Item
                                // label="Username"
                                name="username"
                            >
                                <Input onChange={handleChange} style={{height:"5vh",fontSize:"1.5rem"}}/>
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
            </div>
        </div>
    );

};

export default SearchPage;