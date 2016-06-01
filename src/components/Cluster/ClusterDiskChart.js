import React, { Component, PropTypes } from 'react'

import ReactHighcharts,{Highcharts} from 'react-highcharts'

import '../../css/cluster.scss'

/**
 * 整个集群的磁盘使用状况的图表
 */
class ClusterDiskChart extends Component {
    constructor(props) {
        super(props);
        this.enableAnim = true;
    }

    componentDidMount() {
        this.enableAnim = false;
        //let chart = this.refs.chart.getChart();
        //chart.series[0].addPoint({x: 10, y: 12});
    }
    componentWillUnmount() {

        //let chart = this.refs.disk.getChart();
        //var node = ReactDOM.findDOMNode(this.refs.disk);
        //node.destroy();
        //node = null;
        //
        //chart=null;
    }

    shouldComponentUpdate(nextProps) {
        //if( nextProps.showMoreClusterInfo )
        return this.props.showMoreClusterInfo == nextProps.showMoreClusterInfo;

    }

    render() {
        Highcharts.setOptions({ global: { useUTC: false } });

        const {config} = this.props;
        const allCfg = {
            //global: { useUTC: false },
            credits: {enabled: false},
            colors: ['lightblue','lightgreen'],
            chart: {
                //type: 'area'
            },
            title: {
                margin: 5,
                style: {
                    fontFamily: "Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif",
                    fontSize:'12px',
                    fontWeight: 'bold'
                },
                text: '磁盘监控'
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
                min:0,
                max:100,
                minorTickInterval: 25,
                tickInterval: 50,
                title:{
                    text:null
                },
                labels: {
                    format: '{value} %'
                }
            },
            tooltip: {
                shared: true
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series:{
                    animation:this.enableAnim
                },
                area: {

                    lineWidth: 1,
                    marker: {
                        enabled: false
                    },
                    shadow: false,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }

            },

            series: config.list
        };


        return (

            <ReactHighcharts config={allCfg} ref='disk'  style={{height:'150px'}}/>

        );

    }
}


export default ClusterDiskChart;