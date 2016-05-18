import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import {AnimEnhance} from './../AnimEnhance'
import { Tabs ,Col, Row,Button } from 'antd';
const TabPane = Tabs.TabPane;

import ClusterDashBoard from '../../components/Cluster/ClusterDashBoard'

class ClusterDetail extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    test() {
        let re = '';
        for (let x in this.props.params) {
            console.log(x)
        }
        return re;
    }

    render() {
        return (
            <div className='cluster-detail'>
                <Row className='header'>
                    <Col span={24}>
                        <table style={{width:'100%'}}>
                            <tbody>
                            <tr>
                                <td style={{width:'25%'}}><h2>{this.props.params.name}</h2>
                                </td>
                                <td style={{float:'right'}}>
                                    <Button type="primary" icon="plus"
                                            style={{margin:'0px 6px'}}>添加</Button>
                                    <Button type="primary" icon="right" style={{margin:'0px 6px'}}>启动</Button>
                                    <Button type="primary" icon="poweroff" style={{margin:'0px 6px'}}>停止</Button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <Row className='header'>

                    <Col lg={6} sm={24} md={8}> <b>创建时间</b> : 2015-12-21 14:45:23</Col>
                    <Col lg={4} sm={24} md={16}><b>IP</b> : 192.168.1.55</Col>
                    <Col lg={4} sm={24} md={8}><b>地区</b> : 重庆新牌坊电信机房</Col>
                    <Col lg={10} sm={24} md={16}><b>描述</b> : 运行在虚拟机上用于学习的集群192.168.1.22</Col>


                </Row>

                <Row>

                    <Col lg={24} sm={24} md={24}>
                        <Tabs defaultActiveKey="1" tabPosition="top">
                            <TabPane tab="集群总览" key="1"><ClusterDashBoard /></TabPane>
                            <TabPane tab="服务状态" key="2">选项卡二内容</TabPane>
                            <TabPane tab="机器列表" key="3">选项卡三内容</TabPane>
                            <TabPane tab="集群日志" key="4">选项卡三内容</TabPane>
                        </Tabs>
                    </Col>
                </Row>


            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        cluster: state.cluster
    }
}
//function mapDispatchToProps() {
//    return dispatch => ({
//        fileExplorerActions: bindActionCreators(fileExplorerActions, dispatch),
//        appActions: bindActionCreators(appActions, dispatch)
//    });
//
//}

//export default connect(mapStateToProps, mapDispatchToProps)(AnimEnhance(HadoopFile));
export default connect(mapStateToProps)(AnimEnhance(ClusterDetail));
