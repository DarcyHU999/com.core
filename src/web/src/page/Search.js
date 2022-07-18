import React from 'react';
import { useState } from "react";
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Input } from 'antd';
import { Col, Row } from 'antd';
import axios from 'axios';
import {  Dropdown, Menu, message, Space, Tooltip } from 'antd';

import { useNavigate, Link,createSearchParams} from "react-router-dom";



const SearchPage = () => {
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
                    label: 'Security Group',
                    key: '1',
                    icon: <UserOutlined />,
                },
                {
                    label: '2nd menu item',
                    key: '2',
                    icon: <UserOutlined />,
                },
                {
                    label: '3rd menu item',
                    key: '3',
                    icon: <UserOutlined />,
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
                console.log(response);
                navigate("/summary", { state: response.data.data })

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div >
            <div style={{height:"200px",width:"100px"}}>
            </div>
            <div>
                <Row>
                    <Col span={8}>

                    </Col>
                    <Col span={2}>
                        <Dropdown overlay={menu}>
                            <Button>
                                <Space>
                                    API
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                    </Col>
                    <Col span={4}>
                        <Input onChange={handleChange}/>
                    </Col>
                    <Col span={4}>

                        {/*<Link*/}
                        {/*    to={`/summary`}*/}
                        {/*    state={{ data: "the-page-id" }}*/}
                        {/*>*/}
                            <Button type="primary" icon={<SearchOutlined />} onClick={submitInform}>
                                Search
                            </Button>

                        {/*</Link>*/}
                    </Col>

                    <Col span={6}></Col>
                </Row>
            </div>
        </div>
    );

};

export default SearchPage;