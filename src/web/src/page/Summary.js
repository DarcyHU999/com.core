import React,{ useState }  from 'react';
import {useLocation} from 'react-router-dom'
import * as echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import { Col, Row } from 'antd';
import {Button, Card,Tag,Popover } from 'antd';
import { DownloadOutlined ,HighlightOutlined,BarChartOutlined   } from '@ant-design/icons';
import iojson from 'iojson';
import ReactJson from 'react-json-view';
const content1 = (
    <div>

        <p style={{fontSize:"1.2rem"}}><HighlightOutlined/> The frequency of searched keyword appearing in json file returned by choosed API.</p>
    </div>
);
const content2 = (
    <div>
        <p style={{fontSize:"1.2rem"}}><HighlightOutlined/> The AWS product type.</p>
    </div>
);
const content3 = (
    <div>
        <p style={{fontSize:"1.2rem"}}><HighlightOutlined/> The AWS product service.</p>
    </div>
);
const content4 = (
    <div>
        <p style={{fontSize:"1.2rem"}}><HighlightOutlined/> The number of groups in json file containing the tag.</p>
    </div>
);
const content5 = (
    <div>
        <p style={{fontSize:"1.2rem"}}><HighlightOutlined/> The number of groups in json file not containing the tag</p>
    </div>
);

const Summary = props => {
    let data=useLocation().state
    data=JSON.parse(data)
    data=data[0]
    console.log(data)
    var freq=data["keyFreq"]
    var botoType=data["botoType"]
    var service=data["service"]
    var notTag=data["numOfNotIncludeTagsGroup"]
    var tag=data["numOfIncludeTagsGroup"]
    var groupCase=data["groupCase"]
    var tagKeys=data["tagKeys"]
    var tagValue=data["tagVals"]

    var listKey=[]
    var keyFreq=[]
    var listValue=[]
    var valueFreq=[]
    for (var key in tagKeys) {
        listKey.push(key);
        keyFreq.push(tagKeys[key]);

    }
    for (var key in tagValue) {
        listValue.push(key);
        valueFreq.push(tagValue[key]);

    }

    const outJson =() => {
        iojson.exportJSON(data["rawData"],`userJson${new Date().getTime()}`)

    }
    const getOption = () => {
        let option = {
            title: {
                text: 'The number of groups (not) included tags',
                subtext: '',
                left: 'center',

            },

            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'right',
                top:'bottom'
            },
            series: [
                {
                    name: 'Groups',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: tag, name: 'Groups Included Tag' },
                        { value: notTag, name: 'Groups not Included Tag' },

                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };


        return option;
    };

    const getOption2 = () =>{
        let option2 = {
            title: {
                text: 'Top tag key frequency',
                subtext: '',
                left: 'center',

            },
            xAxis: {
                type: 'category',
                data: listKey,
                axisLabel: { interval: 0, rotate: 30 }
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: keyFreq,
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(180, 180, 180, 0.2)'
                    }
                }
            ]
        };
        return option2;
    }
    const getOption3 = () =>{
        let option3 = {
            title: {
                text: 'Top tag value frequency',
                subtext: '',
                left: 'center',

            },
            xAxis: {
                type: 'category',
                data: listValue,
                axisLabel: { interval: 0, rotate: 30 }
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: valueFreq,
                    type: 'line'
                }
            ]
        };
        return option3
    }




    return (
        <div style={{height:"100vh",width:"100%"}}>
            <div style={{textAlign:"center",fontSize:"4rem",fontWeight:"700"}}>
                API Summary
            </div>
            <Row>
                <Col span={20}>

                </Col>
                <Col span={4}>
                    <Button  type="primary" style={{marginTop:"20px"}} icon={<DownloadOutlined />} size='large' onClick = {outJson}>
                        Download Raw Data
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col span={11}>
                    <Card style={{ width: "100%"}}>
                        <Popover content={content1}>
                            <Tag color="green" style={{fontSize:"2rem",fontWeight:"700",height:"30px",textAlign:"center"}}><BarChartOutlined /> Keyword Frequency </Tag><b style={{fontSize:"2rem",fontWeight:"700",color:"gray"}}> <b style={{fontSize:"2rem",fontWeight:"900",color:"black"}}>{freq}</b></b>
                        </Popover>
                        <br/>
                        <Popover content={content2}>
                            <Tag color="green" style={{fontSize:"2rem",fontWeight:"700",height:"30px",textAlign:"center"}}><BarChartOutlined /> Type </Tag><b style={{fontSize:"2rem",fontWeight:"700",color:"gray"}}> <b style={{fontSize:"2rem",fontWeight:"900",color:"black"}}>{botoType}</b></b>
                        </Popover>

                        <br/>
                        <Popover content={content3}>
                            <Tag color="green" style={{fontSize:"2rem",fontWeight:"700",height:"30px",textAlign:"center"}}><BarChartOutlined /> Service </Tag><b style={{fontSize:"2rem",fontWeight:"700",color:"gray"}}> <b style={{fontSize:"2rem",fontWeight:"900",color:"black"}}>{service}</b></b>
                        </Popover>
                        <br/>
                        <Popover content={content4}>
                            <Tag color="green" style={{fontSize:"2rem",fontWeight:"700",height:"30px",textAlign:"center"}}><BarChartOutlined /> the Number of Groups Included tag </Tag><b style={{fontSize:"2rem",fontWeight:"700",color:"gray"}}> <b style={{fontSize:"2rem",fontWeight:"900",color:"black"}}>{tag}</b></b>
                        </Popover>
                        <br/>
                        <Popover content={content5}>
                            <Tag color="green" style={{fontSize:"2rem",fontWeight:"700",height:"30px",textAlign:"center"}}><BarChartOutlined /> the Number of Groups not Included tag </Tag><b style={{fontSize:"2rem",fontWeight:"700",color:"gray"}}> <b style={{fontSize:"2rem",fontWeight:"900",color:"black"}}>{notTag}</b></b>
                        </Popover>

                        <br/>
                    </Card>

                </Col>
                <Col span={10}>
                    <div style={{height:"50px",width:"10px"}}>

                    </div>
                    <ReactEcharts option={getOption()} />



                </Col>
                <Col span={3}>


                </Col>


            </Row>


            <Row>
                <Col span={10} >
                    <div >
                        <div style={{fontSize:"2rem",fontWeight:"900",textAlign:"center"}}>
                            Group Case
                        </div>
                        <ReactJson collapsed="1" src={groupCase} style={{fontSize:"1.5rem"}}/>

                    </div>
                </Col>

                <Col span={14}>
                    <div style={{height:"50px",width:"10px"}}>
                    </div>
                    <ReactEcharts option={getOption2()} />
                    <div style={{height:"50px",width:"10px"}}></div>


                    <ReactEcharts option={getOption3()} />
                </Col>

            </Row>




        </div>
    );
};



export default Summary;