import React, { Component, PropTypes } from 'react'
import { Card, Col, Row,Table,Button,Input, } from 'antd';
import ReactHighcharts,{Highcharts} from 'react-highcharts'
import HighchartsMore from 'highcharts-3d'
HighchartsMore(ReactHighcharts.Highcharts);

import '../../css/cluster.scss'

/**
 * 集群节点列表
 */
class ClusterNodes extends Component {
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

    getColumns() {
        return [{
            title: '机器名',
            dataIndex: 'name',
            width: 90,
            key: 'name'
        }, {
            title: '服务',
            dataIndex: 'service',
            key: 'service'
        }, {
            title: 'IP地址',
            dataIndex: 'ip',
            key: 'ip'
        }, {
            title: 'CPU',
            dataIndex: 'cpu',
            key: 'cpu'
        }, {
            title: '内存',
            dataIndex: 'mem',
            key: 'mem'
        }, {
            title: '磁盘',
            dataIndex: 'disk',
            key: 'disk'
        }, {
            title: '状态',
            width: 70,
            key: 'status',
            render(text, record){
                const s = record.name.indexOf('d') > 0;
                return <Label text={s?'运行中':'已停止'} isSuccess={s}/>
            }
        }, {
            title: '操作',
            key: 'operation',
            render(text, record) {
                return (
                    <div onClick={(e)=>ignoreClick(e)}>
                        <span className='table-actions'>
                            <Tooltip title="编辑集群">
                                <Button type="ghost" className='button'
                                        onClick={parent.addOrEditClusterOk.bind(parent,record,null)}>
                                    <Icon type="edit"/>
                                </Button>
                            </Tooltip>
                            <Tooltip title="删除集群">
                                <Button type="ghost"
                                        className='button'
                                        onClick={parent.delClusterOk.bind(parent,record,null)}>
                                    <Icon type="delete"/>
                                </Button>
                            </Tooltip>
                        </span>
                    </div>
                );
            }
        }];

    }
    addOrEditClusterNode(){

    }
    buildEmptyNode(){

    }
    refresh(){

    }
    getData(){
        return[

        ]
    }
    render() {
        return (
            <div>
                <div style={{margin:'10px 0px',height:'auto',minWidth:'560px'}}>

                    <Input style={{ width:'25%'}} placeholder="search by name、id or description"/>
                    <div style={{float:'right'}}>
                        <Button type="primary" icon="reload" onClick={this.refresh.bind(this)}

                                className='button'/>
                        <Button type="ghost" icon="plus" className='button'
                                onClick={this.addOrEditClusterNode.bind(this,this.buildEmptyNode(),null)}>
                            添加</Button>

                    </div>

                </div>
                <div>
                    <Table
                        style={{minWidth:'560px'}}
                        //dataSource={clusterData.data}
                        //onRowClick={this.onRowClick.bind(this)}
                        pagination={false}
                        //rowSelection={rowSelection}
                        columns={this.getColumns()}
                        //loading={clusterData.pending}
                        size='middle'
                        rowKey={record=>record.id}/>

                </div>
            </div>
        )
    }
}


export default ClusterNodes;