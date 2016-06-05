import React, { Component, PropTypes } from 'react'
import { Card, Col, Row } from 'antd';
import ReactHighcharts from 'react-highcharts'
//import HighchartsMore from 'highcharts-3d'
//HighchartsMore(ReactHighcharts.Highcharts);

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
       const cfg={
           chart: {
               type: 'pie',
               options3d: {
                   enabled: true,
                   alpha: 45
               }
           },
           title: {
               text: '3D 饼图测试'
           },
           subtitle: {
               text: '3D donut in Highcharts'
           },
           plotOptions: {
               pie: {
                   innerSize: 100,
                   depth: 35
               }
           },
           series: [{
               name: 'Delivered amount',
               data: [
                   ['Bananas', 8],
                   ['Kiwi', 3],
                   ['Mixed nuts', 1],
                   ['Oranges', 6],
                   ['Apples', 8],
                   ['Pears', 4],
                   ['Clementines', 4],
                   ['Reddish (bag)', 1],
                   ['Grapes (bunch)', 1]
               ]
           }]

       };
       return(
           <span>
           <h3>报警设置</h3>
           <ReactHighcharts config={cfg} ref="chart5"/>
               </span>

   )
   }
}



export default ClusterConfig;