import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import {AnimEnhance} from './../AnimEnhance'
import { Tabs ,Col, Row,Button,Icon,Tooltip } from 'antd';
const TabPane = Tabs.TabPane;

import ClusterDashBoard from '../../components/Cluster/ClusterDashBoard'

class ClusterDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMoreClusterInfo: false
        }
    }

    showMoreClusterInfo() {
        this.setState({showMoreClusterInfo: !this.state.showMoreClusterInfo})
    }

    componentDidMount() {

    }

    render() {
        const {ownCluster} = this.props;
        return (
            <div className='cluster-detail'>
                <div className='header'>
                    <div>
                        <table style={{width:'100%'}}>
                            <tbody>
                            <tr>
                                <td style={{width:'25%'}}><h2>{this.props.params.name}</h2>
                                </td>
                                <td style={{float:'right'}}>
                                    <Button type="ghost" icon="reload" style={{margin:'0px 6px'}}>重启</Button>
                                    <Button type="ghost" icon="right" style={{margin:'0px 6px'}}>启动</Button>
                                    <Button type="ghost" icon="poweroff" style={{margin:'0px 6px'}}>停止</Button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div style={{lineHeight:'25px'}}>
                        {this.state.showMoreClusterInfo ? <div>
                            <div><b>所在地区</b> : 重庆新牌坊电信机房</div>
                            <div><b>IP 地址</b> : {ownCluster.ip}</div>
                            <div><b>创建时间</b> : {ownCluster.createTime}</div>
                            </div>
                         : null}
                        <div className='cluster-desc'>
                            <div className='content'><b>集群描述</b> : {ownCluster.description}</div>
                            <div className='show-more-button'>
                                <Tooltip title={this.state.showMoreClusterInfo?'收起':'展开'}>
                                    <Button type="ghost"
                                            icon={this.state.showMoreClusterInfo?'up':'down' }
                                            size="small"
                                            onClick={this.showMoreClusterInfo.bind(this)}
                                    />
                                </Tooltip>
                            </div>
                        </div>
                    </div>

                </div>

                <Row>

                    <Col lg={24} sm={24} md={24}>
                        <Tabs defaultActiveKey="1" tabPosition="top">
                            <TabPane tab="集群总览" key="1">
                                <ClusterDashBoard showMoreClusterInfo={this.state.showMoreClusterInfo}/>
                            </TabPane>
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
function getClusterByName(clusters, name) {
    return clusters.find((c)=>c.name === name );
}
function mapStateToProps(state,ownProps) {

    const name = ownProps.params.name;
    //alert(name)
    return {
        ownCluster: getClusterByName(state.cluster.clusterData.data, name)
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
