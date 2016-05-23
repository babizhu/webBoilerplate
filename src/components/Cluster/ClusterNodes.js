import React, { Component, PropTypes } from 'react'
import { Card, Col, Row,Table,Button,Input,Tooltip,Icon,Progress } from 'antd';
import ReactHighcharts,{Highcharts} from 'react-highcharts'
import HighchartsMore from 'highcharts-3d'
HighchartsMore(ReactHighcharts.Highcharts);

import Label from '../Utils/Label'
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
            title: 'Host',
            dataIndex: 'name',
            width: 90,
            key: 'name'
        }, {
            title: 'IP',
            dataIndex: 'ip',
            key: 'ip'
        }, {
            title: '服务',
            dataIndex: 'service',
            key: 'service'
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
                                >
                                    <Icon type="edit"/>
                                </Button>
                            </Tooltip>
                            <Tooltip title="删除集群">
                                <Button type="ghost"
                                        className='button'
                                >
                                    <Icon type="delete"/>
                                </Button>
                            </Tooltip>
                        </span>
                    </div>
                );
            }
        }];

    }

    addOrEditClusterNode() {

    }

    buildEmptyNode() {

    }

    refresh() {

    }

    getData() {
        return [
            {
                id: 1,
                name: 'master',
                service: 'Hadoop,Zookeeper',
                ip: '192.168.1.5',
                cpu: <Progress type="circle" percent={30} width={40} />,
                mem: <span>128G  <Progress type="circle" percent={79.9} width={40}  /></span>,
                disk: <span>1024G [ <span style={{color:'green'}}>56%</span> ]</span>,
            },
            {
                id: 2,
                name: 'slave1',
                service: 'Hadoop,Spark,Storm,Flume,Pig',
                ip: '192.168.1.6',
                cpu: <span>4核心 [ <span style={{color:'green'}}>56%</span> ]</span>,
                mem: <span>128G [ <span style={{color:'red'}}>16%</span> ]</span>,
                disk: <span>1024G [ <span style={{color:'red'}}>23%</span> ]</span>,
            },
            {
                id: 3,
                name: 'slave2',
                service: 'Hadoop,Zookeeper,Spark,HBase',
                ip: '192.168.1.7',
                cpu: <span>4核心 [ <span style={{color:'green'}}>56%</span> ]</span>,
                mem: <span>128G [ <span style={{color:'red'}}>16%</span> ]</span>,
                disk: <span>1024G [ <span style={{color:'green'}}>56%</span> ]</span>,
            },
            {
                id: 4,
                name: 'slave3',
                service: 'Hadoop,Zookeeper',
                ip: '192.168.1.8',
                cpu: <span>4核心 [ <span style={{color:'green'}}>56%</span> ]</span>,
                mem: <span>128G [ <span style={{color:'red'}}>16%</span> ]</span>,
                disk: <span>1024G [ <span style={{color:'green'}}>56%</span> ]</span>,
            },
            {
                id: 5,
                name: 'slave4',
                service: 'Hadoop,Flume,Storm',
                ip: '192.168.1.9',
                cpu: <span>4核心 [ <span style={{color:'green'}}>56%</span> ]</span>,
                mem: <span>128G [ <span style={{color:'red'}}>16%</span> ]</span>,
                disk: <span>1024G [ <span style={{color:'green'}}>56%</span> ]</span>,
            },
            {
                id: 6,
                name: 'slave5',
                service: 'Hadoop,Storm',
                ip: '192.168.1.10',
                cpu: <span>4核心 [ <span style={{color:'green'}}>56%</span> ]</span>,
                mem: <span>128G [ <span style={{color:'red'}}>16%</span> ]</span>,
                disk: <span>1024G [ <span style={{color:'green'}}>56%</span> ]</span>,
            },
            {
                id: 7,
                name: 'slave6',
                service: 'Hadoop,HBase',
                ip: '192.168.1.11',
                cpu: <span>4核心 [ <span style={{color:'green'}}>56%</span> ]</span>,
                mem: <span>128G [ <span style={{color:'red'}}>16%</span> ]</span>,
                disk: <span>1024G [ <span style={{color:'green'}}>56%</span> ]</span>,
            },
            {
                id: 8,
                name: 'slave7',
                service: 'Hadoop,HBase',
                ip: '192.168.1.12',
                cpu: <span>4核心 [ <span style={{color:'red'}}>26%</span> ]</span>,
                mem: <span>128G [ <span style={{color:'green'}}>66%</span> ]</span>,
                disk: <span>1024G [ <span style={{color:'green'}}>56%</span> ]</span>,
            }
        ]
    }

    render() {
        return (
            <div>
                <div style={{margin:'10px 0px',height:'auto',minWidth:'560px'}}>

                    <Input style={{ width:'25%'}} placeholder="search by name、id or description"/>
                    <div style={{float:'right'}}>

                        <Button type="ghost" icon="plus" className='button'
                                onClick={this.addOrEditClusterNode.bind(this,this.buildEmptyNode(),null)}>
                            添加</Button>

                    </div>

                </div>
                <div>
                    <Table
                        style={{minWidth:'560px'}}
                        dataSource={this.getData()}
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