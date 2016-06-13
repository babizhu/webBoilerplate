import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Tabs ,Col, Row,Button,Icon,Tooltip,Spin } from 'antd';
const TabPane = Tabs.TabPane;

import {AnimEnhance} from './../AnimEnhance'
import Label from '../../components/Utils/Label'
import LoadingView from '../LoadingView';

import ClusterDashBoard from '../../components/Cluster/ClusterDashBoard'
import ClusterConfig from '../../components/Cluster/ClusterConfig'
import ClusterNodeList from '../../components/Cluster/ClusterNodeList'
import ClusterServices from '../../components/Cluster/ClusterServices'

import * as clusterActions from '../../actions/Cluster'

class ClusterDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMoreClusterInfo: false
        };

    }

    showMoreClusterInfo() {
        this.setState({showMoreClusterInfo: !this.state.showMoreClusterInfo});
    }

    componentDidMount() {
        const {ownCluster,getClusterDetail} = this.props;
        getClusterDetail(ownCluster.id);
    }
    switchActiveTab(tab ){
        const {switchActiveTab} = this.props;
        switchActiveTab(tab);
    }
    render() {
        const {ownCluster,clusterDetailList,openClusterModal,clusterNodeOperation,ui} = this.props;

        const clusterDetail = clusterDetailList[ownCluster.id];
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

                { !clusterDetail ? <LoadingView /> :
                    <Row>
                        <Col lg={24} sm={24} md={24}>
                            <Tabs
                                  tabPosition="top"
                                  activeKey={ui.clusterDetailTabs.activeTab}
                                  onChange={this.switchActiveTab.bind(this)}>
                                <TabPane tab="集群总览" key='dashboard'  >
                                    <ClusterDashBoard
                                        showMoreClusterInfo={this.state.showMoreClusterInfo}
                                        clusterDetail={clusterDetail}

                                        {...this.props}
                                    />
                                </TabPane>
                                <TabPane tab="服务状态" key="service">
                                    <ClusterServices showMoreClusterInfo={this.state.showMoreClusterInfo}/>

                                </TabPane>
                                <TabPane tab="节点列表" key="nodeList">
                                    <ClusterNodeList
                                        showMoreClusterInfo={this.state.showMoreClusterInfo}
                                        clusterDetail={clusterDetail}
                                        operation={clusterNodeOperation}
                                        openModal={openClusterModal}
                                        {...this.props}
                                    />

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
    return {
        ui: state.clusters.ui,
        operationData : state.clusters.operationData,
        clusterDetailList: state.clusters.clusterDetailList,
        ownCluster: getClusterByName(state.clusters.clusterList.data, name)
    }
}
export default connect(mapStateToProps, clusterActions)(AnimEnhance(ClusterDetail));
