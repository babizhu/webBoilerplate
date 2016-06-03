import React, { Component, PropTypes } from 'react'
import { Card, Col, Row,Icon ,Button} from 'antd';
import ReactHighcharts,{Highcharts} from 'react-highcharts'
//import HighchartsMore from 'highcharts-3d'
//HighchartsMore(ReactHighcharts.Highcharts);

import ClusterCpuChart from './ClusterCpuChart'
import ClusterMemChart from './ClusterMemChart'
import ClusterDiskChart from './ClusterDiskChart'
import ClusterNetworkChart from './ClusterNetworkChart'
import ClusterTextSummary from './ClusterTextSummary'
import Pannel from '../Utils/Pannel'
import '../../css/cluster.scss'

class ClusterDashBoard extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {ownCluster,getClusterAll} = this.props;
        this.timer = setInterval(function () {
            getClusterAll(ownCluster.id);
        }.bind(this), 100000);
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }

    shouldComponentUpdate(nextProps) {
        if( nextProps.clusterNodesInfo.pending ){
            return false;
        }
        return this.props.showMoreClusterInfo == nextProps.showMoreClusterInfo;
    }

    render() {
        const {oneClusterInfo} = this.props;
            console.log("ClusterDashBoard 开始重绘！！！！！！！！！！！！！");
        return (
            <div className='cluster-dash-board'>
                <Row>
                    <Col lg={12} sm={12} md={12} style={{paddingBottom:'10px'}}>
                        <Card title="" bordered={true} style={{height:'346px'}}>
                            <ClusterTextSummary/>
                        </Card>

                    </Col>
                    <Col lg={12} sm={12} md={12} style={{paddingBottom:'10px'}}>
                        <Card title="" bordered={true}>
                            <Row>
                                <Col lg={12} sm={12} md={12} style={{paddingBottom:'10px'}}>
                                    <ClusterCpuChart config={oneClusterInfo.clusterCharts.cpu}/>
                                </Col>
                                <Col lg={12} sm={12} md={12} style={{paddingBottom:'10px'}}>
                                    <ClusterMemChart config={oneClusterInfo.clusterCharts.mem}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={12} sm={12} md={12} style={{paddingBottom:'10px'}}>
                                    <ClusterNetworkChart config={oneClusterInfo.clusterCharts.network}/>
                                </Col>
                                <Col lg={12} sm={12} md={12} style={{paddingBottom:'10px'}}>
                                    <ClusterDiskChart config={oneClusterInfo.clusterCharts.disk}/>
                                </Col>
                            </Row>

                        </Card>
                    </Col>
                </Row>
            </div>
        );

    }
}


export default ClusterDashBoard;