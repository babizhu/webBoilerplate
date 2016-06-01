import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Tabs ,Col, Row,Button,Icon,Tooltip,Spin } from 'antd';
const TabPane = Tabs.TabPane;

import {AnimEnhance} from './../AnimEnhance'
import Label from '../../components/Utils/Label'

import ClusterDashBoard from '../../components/Cluster/ClusterDashBoard'
import ClusterConfig from '../../components/Cluster/ClusterConfig'
import ClusterNodes from '../../components/Cluster/ClusterNodes'
import ClusterServices from '../../components/Cluster/ClusterServices'

import * as clusterActions from '../../actions/Cluster'

class ClusterDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMoreClusterInfo: false
        }
    }



    showMoreClusterInfo() {
        this.setState({showMoreClusterInfo: !this.state.showMoreClusterInfo});
    }

    componentDidMount() {

        const {ownCluster,getClusterNodes} = this.props;
        getClusterNodes(ownCluster.id);

    }
    render() {
        const {ownCluster} = this.props;
       const nodeInfo = this.props.clusterNodes[ownCluster.id];
        return (
            <div className='cluster-detail'>
                <div className='header'>
                    <div>
                        <table style={{width:'100%'}}>
                            <tbody>
                            <tr>
                                <td><span className='cluster-title'>{this.props.params.name}</span>
                                    <span className='span-label'><Label text={'运行中'} isSuccess={true}/></span></td>
                                <td style={{float:'right'}}>
                                    <Button type="ghost" icon="reload" className='button'>重启</Button>
                                    <Button type="ghost" icon="right" className='button'>启动</Button>
                                    <Button type="ghost" icon="poweroff" className='button'>停止</Button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div style={{lineHeight:'25px'}}>
                        {this.state.showMoreClusterInfo ? <div>
                            <div><b>I P 地 址</b> : {ownCluster.ip}</div>
                            <div><b>集群服务</b> : {ownCluster.service}</div>
                            <div><b>所在地区</b> : 重庆新牌坊电信机房</div>
                            <div><b>创建时间</b> : {ownCluster.createTime}</div>
                        </div>
                            : null}
                        <div className='cluster-desc'>
                            <div className='cluster-description'><b>集群描述</b>
                                : {ownCluster.description}
                            </div>
                            <div className='no_border_icon_button show-more-button'>
                                <Button type="ghost"
                                        icon={this.state.showMoreClusterInfo?'up':'down' }
                                        size="small"
                                        onClick={this.showMoreClusterInfo.bind(this)}
                                />
                            </div>
                        </div>
                    </div>

                </div>

                { nodeInfo &&
                    <Row>

                        <Col lg={24} sm={24} md={24}>
                            <Tabs defaultActiveKey="1" tabPosition="top">
                                <TabPane tab="集群总览" key="1">
                                    <ClusterDashBoard
                                        showMoreClusterInfo={this.state.showMoreClusterInfo}
                                        nodeInfo={nodeInfo}
                                        {...this.props}
                                    />
                                </TabPane>
                                <TabPane tab="服务状态" key="2">
                                    <ClusterServices showMoreClusterInfo={this.state.showMoreClusterInfo}/>


                                </TabPane>
                                <TabPane tab="节点列表" key="3">
                                    <ClusterNodes showMoreClusterInfo={this.state.showMoreClusterInfo}/>

                                </TabPane>
                                <TabPane tab="集群日志" key="4">选项卡4内容</TabPane>
                                <TabPane tab="配置管理" key="5">
                                    <ClusterConfig showMoreClusterInfo={this.state.showMoreClusterInfo}/>

                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                }
            </div>



        )
    }
}
function getClusterByName(clusters, name) {
    return clusters.find((c)=>c.name === name);
}
function mapStateToProps(state, ownProps) {

    const name = ownProps.params.name;
    //alert(name)
    return {
        clusterNodes: state.clustersInfo.clusterNodes,
        ownCluster: getClusterByName(state.clustersInfo.clusterList.data, name)
    }
}
export default connect(mapStateToProps, clusterActions)(AnimEnhance(ClusterDetail));
