import React, { Component, PropTypes } from 'react'

import ReactHighcharts,{Highcharts} from 'react-highcharts'

import '../../css/cluster.scss'

/**
 * 整个集群的cpu图表
 */
class ClusterCpuChart extends Component {
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
        const {config} = this.props;
        const allCfg = {
            credits: {enabled: false},
            colors: ['#eeeeee', '#0d233a', '#8bbc21', '#910000', '#1aadce',
                '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],

            chart: {
                type: 'area'
            },
            title: {
                text: 'CPU 监控'
            },
            //subtitle: {
            //    text: document.ontouchstart === undefined ?
            //        'Click and drag in the plot area to zoom in' :
            //        'Pinch the chart to zoom in'
            //},
            xAxis: {
                type: 'datetime',
                maxZoom: config.list[0].data.length * config.list[0].pointInterval, // fourteen days
                //title: {
                //    text: 'cpu title',
                //}
            },
            yAxis: {
                //title: {
                //    text: '百分比'
                //}
            },
            tooltip: {
                shared: true
            },
            //legend: {
            //    enabled: false
            //},
            plotOptions: {
                area: {
                    stacking: 'percent',
                    lineWidth: 1,
                    marker: {
                        enabled: false
                    }
                }
            },

            series: config.list
        };


        return (

            <ReactHighcharts config={allCfg} ref='cpu'/>

        );

    }
}


export default ClusterCpuChart;