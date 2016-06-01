import React, { Component, PropTypes } from 'react'

import ReactHighcharts,{Highcharts} from 'react-highcharts'

import '../../css/cluster.scss'

/**
 * 整个集群的内存图表
 */
class ClusterMemChart extends Component {
    constructor(props) {
        super(props);
        this.enableAnim = true;
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
        Highcharts.setOptions({ global: { useUTC: false } });
        const {config} = this.props;
        const allCfg = {
            credits: {enabled: false},
            colors: ['lightblue','lightgreen'],
            chart: {
                //type: 'area'
            },

            title: {
                margin: 5,
                style: {
                    fontFamily: "Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif",
                    fontSize:'10px',
                    fontWeight: 'bold'
                },
                text: '内存监控'
            },
            //subtitle: {
            //    text: document.ontouchstart === undefined ?
            //        'Click and drag in the plot area to zoom in' :
            //        'Pinch the chart to zoom in'
            //},
            xAxis: {
                type: 'datetime',
                maxZoom: config.list[0].data.length * config.list[0].pointInterval // fourteen days
                //title: {
                //    text: 'cpu title',
                //}
            },
            yAxis: {
                min:0,
                max:100,
                title:{
                    text:null
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
                    fillColor: {
                        linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
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

            <ReactHighcharts config={allCfg} ref='mem'  style={{height:'150px'}}/>

        );

    }
}


export default ClusterMemChart;