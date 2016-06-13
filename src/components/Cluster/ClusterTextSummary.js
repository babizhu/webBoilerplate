import React, { Component, PropTypes } from 'react'

import ReactHighcharts,{Highcharts} from 'react-highcharts'
import { Card, Col, Row,Icon ,Button} from 'antd';

import '../../css/cluster.scss'

/**
 * 整个集群的文字总览组件
 */
class ClusterTextSummary extends Component {
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

    switchActiveTab( tab ){
        const {switchActiveTab} = this.props;
        switchActiveTab( tab );
    }
    render() {
        const {clusterNodeList} = this.props;
        return (

            <div>
                <Icon type="desktop"/> <span style={{paddingLeft:'6px',fontWeight:'bold'}}>节点状态</span>
                <div >
                    总共<span style={{fontSize:'21px',color:'#2db7f5'}}> {clusterNodeList.totalCount} </span>个节点 <br /> 存活
                    <span style={{fontSize:'21px',color:'#66bb6a'}}> {clusterNodeList.aliveCount} </span>个 , 宕机
                    <span style={{fontSize:'21px',color:'#f50'}}> {clusterNodeList.totalCount - clusterNodeList.aliveCount } </span>个
                                <span className='no_border_icon_button'  style={{float:'right',position: 'relative',top:'10px'}}>
                                    <Button type="ghost" icon='double-right'
                                            size="small" onClick = {this.switchActiveTab.bind(this, 'nodeList')}/>
                                </span>
                </div>

                <hr style={{border:'0px',borderBottom: '1px dashed #ccc',margin: '10px 0px'}}/>

                <Icon type="setting"/> <span style={{paddingLeft:'6px',fontWeight:'bold'}}>任务状态</span>
                <div>
                    总共运行<span style={{fontSize:'21px',color:'#2db7f5'}}> 0 </span>个任务<br /> 成功
                    <span style={{fontSize:'21px',color:'#66bb6a'}}> 0 </span>个 , 失败
                    <span style={{fontSize:'21px',color:'#f50'}}> 0 </span>个 , 正在运行
                    <span style={{fontSize:'21px',color:'#aa6708'}}> 0 </span>个
                                <span className='no_border_icon_button' style={{float:'right',position: 'relative',top:'10px'}}>
                                    <Button type="ghost" icon='double-right'
                                            onClick = {this.switchActiveTab.bind(this, 'task')}
                                            size="small"/>
                                </span>
                </div>
                <hr style={{border:'0px',borderBottom: '1px dashed #ccc',margin: '10px 0px'}}/>

                <Icon type="cloud-o"/> <span style={{paddingLeft:'6px',fontWeight:'bold'}}>服务状态</span>
                <div >
                    总共运行<span style={{fontSize:'21px',color:'#2db7f5'}}> 0 </span>个服务<br />正常运行
                    <span style={{fontSize:'21px',color:'#66bb6a'}}> 0 </span>个 , 停止
                    <span style={{fontSize:'21px',color:'#f50'}}> 0 </span>个
                                <span className='no_border_icon_button' style={{float:'right',position: 'relative',top:'10px'}}>
                                    <Button type="ghost" icon='double-right'
                                            onClick = {this.switchActiveTab.bind(this, 'service')}
                                            size="small"/>
                                </span>
                </div>
            </div>

        );

    }
}


export default ClusterTextSummary;