import React from 'react';
import { useState } from "react";
import { DownOutlined, ApiOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Input } from 'antd';
import { Col, Row } from 'antd';
import axios from 'axios';
import {  Dropdown, Menu, Modal, Space,Rate } from 'antd';

import { useNavigate, Link,createSearchParams} from "react-router-dom";
import { func } from 'prop-types';



const SearchPage = () => {
    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
    const [value, setValue] = useState(3);
    const [value2, setValue2] = useState(3);
    const [value3, setValue3] = useState(3);
    const [value4, setValue4] = useState(3);
    const [value5, setValue5] = useState(3);
    const [value6, setValue6] = useState(3);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        const params = {
            '1': value+'',
            '2': value2+'',
            '3': value3+'',
            '4': value4+'',
            '5': value5+'',
            '6': value6+''
        }
        console.log(params);
        submit_mark(params)
    };

    const submit_mark = (params) => {
        axios.put('http://localhost:8080/api/ApiInfo/scoring', {
            ...params
     })}

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
    
    function markclick1(data){
        console.log (data)
        setValue(data)
    }
    function markclick2(data){
        
        setValue2(data)
    }

    function markclick3(data){
        setValue3(data)
    }

    function markclick4(data){
        setValue4(data)
    }

    function markclick5(data){
        setValue5(data)
    }
    function markclick6(data){
        setValue6(data)
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

                    <Col span={6}>
                        <Button type="primary" onClick={showModal}>
                            Mark APIs
                        </Button>
                        <Modal title="Mark items" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <div>
                                <b>Vpcs </b>
                                <span>
                                    <Rate tooltips={desc} onChange={markclick1} value={value} />
                                    {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
                                </span>
                            </div>
                            <div>
                                <b>SecurityGroups </b>
                                <span>
                                    <Rate tooltips={desc} onChange={markclick2} value={value2}  />
                                    {value2 ? <span className="ant-rate-text">{desc[value2 - 1]}</span> : ''}
                                </span>
                            </div>
                            <div>
                                <b>Subnets </b>
                                <span>
                                    <Rate tooltips={desc} onChange={markclick3} value={value3} />
                                    {value3 ? <span className="ant-rate-text">{desc[value3 - 1]}</span> : ''}
                                </span>
                            </div>
                            <div>
                                <b> Reservations</b>
                                <span>
                                    <Rate tooltips={desc} onChange={markclick4} value={value4} />
                                    {value4 ? <span className="ant-rate-text">{desc[value4 - 1]}</span> : ''}
                                </span>
                            </div>
                            <div>
                                <b>Buckets </b>
                                <span>
                                    <Rate tooltips={desc} onChange={markclick5} value={value5} />
                                    {value5 ? <span className="ant-rate-text">{desc[value5 - 1]}</span> : ''}
                                </span>
                            </div>
                            <div>
                                <b>Posts </b>
                                <span>
                                    <Rate tooltips={desc} onChange={markclick6} value={value6} />
                                    {value6 ? <span className="ant-rate-text">{desc[value6 - 1]}</span> : ''}
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