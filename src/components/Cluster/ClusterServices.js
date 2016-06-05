import React, { Component, PropTypes } from 'react'
import { Card, Col, Row } from 'antd';
import ReactHighcharts from 'react-highcharts'
import Pannel from '../Utils/Pannel'
//import HighchartsMore from 'highcharts-3d'
//HighchartsMore(ReactHighcharts.Highcharts);

import '../../css/cluster.scss'

/**
 * 集群监控配置管理,包括监控报警等等
 */
class ClusterServices extends Component {
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
        console.log("ClusterServices 开始重绘！！！！！！！！！！！！！");


        const content = <div>
            <div><span style={{}}>空闲空间</span><span> 100G </span></div>
            <div><span style={{}}>空闲空间</span><span> 100G </span></div>
            <div><span style={{}}>空闲空间</span><span> 100G </span></div>
        </div>;
        return (
            <div>
                <Row gutter={16}>
                    <Col lg={8} sm={24} md={12} style={{paddingBottom:'10px'}}>
                        <Pannel title='Hadoop' content={content}/>
                    </Col>
                    <Col lg={8} sm={24} md={12} style={{paddingBottom:'10px'}}>

                        <Pannel title='HBase' content={content}/>
                    </Col>
                    <Col lg={8} sm={24} md={12} style={{paddingBottom:'10px'}}>

                        <Pannel title='Zookeeper' content={content}/>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col lg={8} sm={24} md={12} style={{paddingBottom:'10px'}}>
                        <Pannel title='Spark' content={content}/>
                    </Col>
                    <Col lg={8} sm={24} md={12} style={{paddingBottom:'10px'}}>

                        <Pannel title='Storm' content={content}/>
                    </Col>
                    <Col lg={8} sm={24} md={12} style={{paddingBottom:'10px'}}>

                        <Pannel title='Flume' content={content}/>
                    </Col>
                </Row>
            </div>
        )
    }
}


export default ClusterServices;