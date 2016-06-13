import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import ReactHighcharts,{Highcharts} from 'react-highcharts'

import '../../css/cluster.scss'

/**
 * 整个集群的cpu图表
 */
class ClusterNetworkChart extends Component {
    constructor(props) {
        super(props);
        this.enableAnim = true;
    }

    componentWillUnmount() {

        //let chart = this.refs.network.getChart();
        //var node = ReactDOM.findDOMNode(this.refs.network);
        //node.destroy();
        //
        //chart=null;
    }

    componentDidMount() {
        this.enableAnim = false;
        //let chart = this.refs.chart.getChart();
        //chart.series[0].addPoint({x: 10, y: 12});
    }

    shouldComponentUpdate(nextProps) {
        //if( nextProps.showMoreClusterInfo )
        return this.props.showMoreClusterInfo == nextProps.showMoreClusterInfo;

    }

    render() {
        Highcharts.setOptions({global: {useUTC: false}});
        const {config} = this.props;
        const allCfg = {
            credits: {enabled: false},
            colors: ['lightblue', 'lightgreen'],
            chart: {
                //type: 'area'
            },
            title: {
                margin: 5,
                style: {
                    fontFamily: "Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif",
                    fontSize: '12px',
                    fontWeight: 'bold'
                },
                text: '网络监控'
            },
            xAxis: {
                type: 'datetime',
                maxZoom: config? config.list[0].data.length * config.list[0].pointInterval:100

            },
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return this.value + ' ' + (config ? config.yunit : '');

                    }
                }
            },
            tooltip: {
                xDateFormat: '%Y-%m-%d %H:%M:%S',
                shared: true,
                valueSuffix: config ? ' ' + config.yunit : ' ',
                //formatter: function () {
                //    return Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + this.series.name  + ': ' + this.y + config.yunit
                //        + '<br/><br/>Total: ' + config.total + config.totalUnit ;
                //}
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    marker: {
                        radius: 1
                    },
                    animation: this.enableAnim
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

            series: config ? config.list:null
        };


        return (

            <ReactHighcharts config={allCfg} ref='network' style={{height:'150px'}}/>

        );

    }
}


export default ClusterNetworkChart;