import React,{ useState }  from 'react';
import {useLocation} from 'react-router-dom'
import * as echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import { Col, Row } from 'antd';
import {Button, Card,Tag} from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import iojson from 'iojson';
import ReactJson from 'react-json-view';
const Summary = props => {
    let data=useLocation().state
    data=JSON.parse(data)
    data=data[0]
    console.log(data)
    var freq=data["keyFreq"]

    var notTag=data["numOfNotIncludeTagsGroup"]
    var tag=data["numOfIncludeTagsGroup"]
    var groupCase=data["groupCase"]
    // var ipRange=""
    // var fromPort = null
    // var ipProtocol = null
    // if(groupCase['IpPermissions'] && groupCase['IpPermissions'][0] && groupCase['IpPermissions'][0]['IpRanges']) {
    //     for (let i = 0; i < groupCase['IpPermissions'][0]['IpRanges'].length; i++) {
    //         if (i != 0) {
    //             ipRange = ipRange + ", "
    //         }
    //         ipRange = ipRange + groupCase['IpPermissions'][0]['IpRanges'][i]['CidrIp']
    //
    //
    //     }
    //     fromPort = groupCase['IpPermissions'][0]['FromPort']
    //     ipProtocol = groupCase['IpPermissions'][0]['IpProtocol']
    // }


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




    return (
        <div style={{height:"100vh",width:"100%"}}>
            <div style={{textAlign:"center",fontSize:"4rem",fontWeight:"700"}}>
                API Summary
            </div>

            <Card style={{ width: "100%"}}>
                <Tag color="green" style={{fontSize:"2rem",fontWeight:"700",height:"30px",textAlign:"center"}}>Keyword Frequency </Tag><b style={{fontSize:"2rem",fontWeight:"700",color:"gray"}}> <b style={{fontSize:"2rem",fontWeight:"900",color:"black"}}>{freq}</b></b>
                <br/>
                <Tag color="green" style={{fontSize:"2rem",fontWeight:"700",height:"30px",textAlign:"center"}}>the Number of Groups Included tag </Tag><b style={{fontSize:"2rem",fontWeight:"700",color:"gray"}}> <b style={{fontSize:"2rem",fontWeight:"900",color:"black"}}>{tag}</b></b>
                <br/>
                <Tag color="green" style={{fontSize:"2rem",fontWeight:"700",height:"30px",textAlign:"center"}}>the Number of Groups not Included tag </Tag><b style={{fontSize:"2rem",fontWeight:"700",color:"gray"}}> <b style={{fontSize:"2rem",fontWeight:"900",color:"black"}}>{notTag}</b></b>
                <br/>
            </Card>
            <Row>
                <Col span={12} >
                    <div >
                        <div style={{fontSize:"2rem",fontWeight:"900",textAlign:"center"}}>
                            Group Case
                        </div>
                        {/*<Tag color="gold" style={{fontSize:"1.5rem",fontWeight:"900",height:"28px"}}>Description </Tag><b style={{fontSize:"1.5rem",fontWeight:"900"}}> <b style={{fontSize:"1.2rem",fontWeight:"500",color:"black"}}>{groupCase['Description']}</b></b>*/}
                        {/*<br/>*/}
                        {/*<Tag color="gold" style={{fontSize:"1.5rem",fontWeight:"900",height:"28px"}}>Group ID </Tag><b style={{fontSize:"1.5rem",fontWeight:"900"}}> <b style={{fontSize:"1.2rem",fontWeight:"500",color:"black"}}>{groupCase['GroupId']}</b></b>*/}
                        {/*<br/>*/}
                        {/*<Tag color="gold" style={{fontSize:"1.5rem",fontWeight:"900",height:"28px"}}>Group Name </Tag><b style={{fontSize:"1.5rem",fontWeight:"900"}}> <b style={{fontSize:"1.2rem",fontWeight:"500",color:"black"}}>{groupCase['GroupName']}</b></b>*/}
                        {/*<br/>*/}
                        {/*<Tag color="gold" style={{fontSize:"1.5rem",fontWeight:"900",height:"28px"}}>From Port </Tag><b style={{fontSize:"1.5rem",fontWeight:"900"}}> <b style={{fontSize:"1.2rem",fontWeight:"500",color:"black"}}>{fromPort}</b></b>*/}
                        {/*<br/>*/}
                        {/*<Tag color="gold" style={{fontSize:"1.5rem",fontWeight:"900",height:"28px"}}>Ip Protocol  </Tag><b style={{fontSize:"1.5rem",fontWeight:"900"}}> <b style={{fontSize:"1.2rem",fontWeight:"500",color:"black"}}>{ipProtocol}</b></b>*/}
                        {/*<br/>*/}
                        {/*<Tag color="gold" style={{fontSize:"1.5rem",fontWeight:"900",height:"28px"}}>Ip Ranges </Tag><b style={{fontSize:"1.5rem",fontWeight:"900"}}> <b style={{fontSize:"1.2rem",fontWeight:"500",color:"black"}}>{ipRange}</b></b>*/}
                        {/*<br/>*/}
                        <ReactJson src={groupCase} style={{fontSize:"1.5rem"}}/>

                    </div>
                </Col>

                <Col span={12}>
                    <div style={{height:"50px"}}></div>
                    <ReactEcharts option={getOption()} />

                </Col>

            </Row>
            <Row>
                <Col span={21}></Col>
                <Col span={3}>

                    <Button type="primary" style={{marginTop:"20px"}} icon={<DownloadOutlined />} size='large' onClick = {outJson}>
                        Download
                    </Button>
                </Col>

            </Row>



        </div>
    );
};



export default Summary;