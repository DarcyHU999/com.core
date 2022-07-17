import React from 'react';
import { useState } from "react";
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Input } from 'antd';
import { Col, Row } from 'antd';
import axios from 'axios';
import {  Dropdown, Menu, message, Space, Tooltip } from 'antd';
import styled from "styled-components";
import { BrowserRouter ,Router, Link,Route} from "react-router-dom";
import Summary from './Summary'


const SearchPage = () => {
    const [inputInform, setInput] = useState("");
    const [API, setAPI] = useState("");
    const handleMenuClick = (e) => {

        console.log('click', e.key);
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
            console.log({inputInform});
            return { ...previousState, inputInform: event.target.value }
        })
    }
    function submitInform(){
        let data={
            "apiURL":"https://imdb-api.com/en/API/Top250Movies/k_6rjwdxn6",
            "keyword":inputInform.inputInform
        }
        let key=inputInform.inputInform
        let api=API
        let url='http://localhost:8080/api/ApiInfo/'+api+'/'+key
        axios.get(url)
            .then(function (response) {
                console.log(response);

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

                        <Link to='/summary'>
                            <Button type="primary" icon={<SearchOutlined />} onClick={submitInform}>
                                Search
                            </Button>

                        </Link>






                    </Col>

                    <Col span={6}></Col>
                </Row>
            </div>
        </div>
    );

};

export default SearchPage;