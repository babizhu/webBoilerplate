import React, { Component, PropTypes } from 'react'
import { Card, Col, Row } from 'antd';
import ReactHighcharts,{Highcharts} from 'react-highcharts'
import HighchartsMore from 'highcharts-3d'
HighchartsMore(ReactHighcharts.Highcharts);

import '../../css/cluster.scss'

/**
 * 集群监控配置管理,包括监控报警等等
 */
class ClusterConfig extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        //let chart = this.refs.chart.getChart();
        //chart.series[0].addPoint({x: 10, y: 12});
    }
    shouldComponentUpdate(nextProps){
        //if( nextProps.showMoreClusterInfo )
        return this.props.showMoreClusterInfo == nextProps.showMoreClusterInfo;

    }
   render(){
       return(
           <h1>报警设置</h1>
       )
   }
}



export default ClusterConfig;