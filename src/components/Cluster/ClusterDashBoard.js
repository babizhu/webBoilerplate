import React, { Component, PropTypes } from 'react'
import { Card, Col, Row,Icon ,Button} from 'antd';
import ReactHighcharts,{Highcharts} from 'react-highcharts'
//import HighchartsMore from 'highcharts-3d'
//HighchartsMore(ReactHighcharts.Highcharts);

import ClusterCpuChart from './ClusterCpuChart'
import ClusterMemChart from './ClusterMemChart'
import ClusterDiskChart from './ClusterDiskChart'
import ClusterNetworkChart from './ClusterNetworkChart'
import Pannel from '../Utils/Pannel'
import '../../css/cluster.scss'

class ClusterDashBoard extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        //let chart = this.refs.chart.getChart();
        //chart.series[0].addPoint({x: 10, y: 12});
    }

    shouldComponentUpdate(nextProps) {
        //if( nextProps.showMoreClusterInfo )
        return this.props.showMoreClusterInfo == nextProps.showMoreClusterInfo;

    }

    render() {

        const {nodeInfo} = this.props;
        return (
            <div className='cluster-dash-board'>


                <Row gutter={16}>
                    <Col lg={8} sm={24} md={12} style={{paddingBottom:'10px'}}>
                        <Card title="" bordered={true} style={{height:'450px'}}>
                            <Icon type="desktop"/> <span style={{paddingLeft:'6px',fontWeight:'bold'}}>节点状态</span>
                            <div >
                                总共<span style={{fontSize:'21px',color:'#2db7f5'}}> 1806 </span>个节点 <br /> 存活
                                <span style={{fontSize:'21px',color:'#66bb6a'}}> 806 </span>个 , 宕机
                                <span style={{fontSize:'21px',color:'#f50'}}> 1000 </span>个
                                <span
                                    className='no_border_icon_button'
                                    style={{float:'right',position: 'relative',top:'10px'}}>
                                    <Button className='no_border_icon_button' type="ghost" icon='double-right'
                                            size="small"/>
                                </span>
                            </div>

                            <hr style={{border:'0px',borderBottom: '1px dashed #ccc',margin: '10px 0px'}}/>

                            <Icon type="setting"/> <span style={{paddingLeft:'6px',fontWeight:'bold'}}>任务状态</span>
                            <div>
                                总共运行<span style={{fontSize:'21px',color:'#2db7f5'}}> 10 </span>个任务<br /> 成功
                                <span style={{fontSize:'21px',color:'#66bb6a'}}> 4970 </span>个 , 失败
                                <span style={{fontSize:'21px',color:'#f50'}}> 129 </span>个 , 正在运行
                                <span style={{fontSize:'21px',color:'#aa6708'}}> 54 </span>个
                                <span
                                    className='no_border_icon_button'
                                    style={{float:'right',position: 'relative',top:'10px'}}>
                                    <Button className='no_border_icon_button' type="ghost" icon='double-right'
                                            size="small"/>
                                </span>
                            </div>
                            <hr style={{border:'0px',borderBottom: '1px dashed #ccc',margin: '10px 0px'}}/>

                            <Icon type="cloud-o"/> <span style={{paddingLeft:'6px',fontWeight:'bold'}}>服务状态</span>
                            <div >
                                总共运行<span style={{fontSize:'21px',color:'#2db7f5'}}> 8 </span>个服务<br />正常运行
                                <span style={{fontSize:'21px',color:'#66bb6a'}}> 5 </span>个 , 停止
                                <span style={{fontSize:'21px',color:'#f50'}}> 3 </span>个
                                <span
                                    className='no_border_icon_button'
                                    style={{float:'right',position: 'relative',top:'10px'}}>
                                    <Button className='no_border_icon_button' type="ghost" icon='double-right'
                                            size="small"/>
                                </span>
                            </div>
                            <hr style={{border:'0px',borderBottom: '1px dashed #ccc',margin: '10px 0px'}}/>

                            <Icon type="notification"/> <span style={{paddingLeft:'6px',fontWeight:'bold'}}>报警状态</span>
                            <div >
                                总共<span style={{fontSize:'21px',color:'#2db7f5'}}> 6 </span>个节点<br />存活
                                <span style={{fontSize:'21px',color:'#66bb6a'}}> 4 </span>个,死亡
                                <span style={{fontSize:'21px',color:'#f50'}}> 2 </span>个
                                <span
                                    className='no_border_icon_button'
                                    style={{float:'right',position: 'relative',top:'10px'}}>
                                    <Button className='no_border_icon_button' type="ghost" icon='double-right'
                                            size="small"/>
                                </span>
                            </div>

                        </Card>
                    </Col>
                    <Col lg={8} sm={24} md={12} style={{paddingBottom:'10px'}}>
                        <Card title="" bordered={true}>
                            {
                                nodeInfo && nodeInfo.clusterCharts &&
                                <ClusterCpuChart config={nodeInfo.clusterCharts.cpu}/>
                            }
                        </Card>
                    </Col>
                    <Col lg={8} sm={24} md={12}>
                        <Card title="" bordered={true}>
                            {
                                nodeInfo && nodeInfo.clusterCharts &&
                                <ClusterMemChart config={nodeInfo.clusterCharts.mem}/>
                            }

                        </Card>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span="24">
                        <div style={{height:'30px'}}></div>
                    </Col>

                </Row>
                <Row gutter={16}>

                    <Col span="12">

                        <Card title="" bordered={true}>
                            {
                                nodeInfo && nodeInfo.clusterCharts &&
                                <ClusterDiskChart config={nodeInfo.clusterCharts.disk}/>
                            }

                        </Card>
                    </Col>


                    <Col span="12">

                        <Card title="" bordered={true}>
                            {
                                nodeInfo && nodeInfo.clusterCharts &&
                                <ClusterNetworkChart config={nodeInfo.clusterCharts.network}/>
                            }

                        </Card>
                    </Col>

                </Row>
            </div>

        );

    }
}


export default ClusterDashBoard;