import React, { Component, PropTypes } from 'react'
import { Card, Col, Row,Table,Button,Input,Tooltip,Icon,message } from 'antd';

import ClusterNodeModal from './ClusterNodeModal'
import ClusterDelNodeModal from './ClusterDelNodeModal'

import ClusterCpuChart from './ClusterCpuChart'
import ClusterMemChart from './ClusterMemChart'
import ClusterDiskChart from './ClusterDiskChart'
import ClusterNetworkChart from './ClusterNetworkChart'


import Label from '../Utils/Label'
import ResourceUsePercent from '../Utils/ResourceUsePercent'
import SearchInput from '../Utils/SearchInput'
import '../../css/cluster.scss'

/**
 * 集群节点列表
 */
class ClusterNodeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        };
        this.currentNode = {id: -1};
    }

    componentDidMount() {
        const {getClusterNodeList,clusterDetail,ownCluster} = this.props;
        if (!clusterDetail.clusterNodeList.nodeList) {
            getClusterNodeList(ownCluster.id);
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.clusterDetailList.pending) {
            return false;
        }
        return this.props.showMoreClusterInfo == nextProps.showMoreClusterInfo;
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.operationData.pending && !nextProps.operationData.pending) {
            if (nextProps.operationData.error === null) {
                message.success('操作成功。', 6);
            }
        }
    }
    getColumns() {
        const parent = this;
        return [{
            title: 'Host',
            dataIndex: 'host',
            width: 90,
            key: 'host',
            sorter: (a, b) => a.host - b.host

        }, {
            title: 'IP',
            dataIndex: 'ip',
            key: 'ip'
        }, {
            title: '服务',
            dataIndex: 'service',
            key: 'service'
        }, {
            title: 'CPU %',
            dataIndex: 'cpuUsedPercent',
            key: 'cpuUsedPercent',
            render(text,record){
                return record.status === 1 ?<ResourceUsePercent percent={parseInt(text)}/> : '-';
            },
            sorter: (a, b) => a.cpuUsedPercent - b.cpuUsedPercent
        }, {
            title: '内存 %',
            dataIndex: 'memUsedPercent',
            key: 'memUsedPercent',
            render(text,record){
                return record.status === 1 ?<ResourceUsePercent percent={parseInt(text)}/> : '-';
            },
            sorter: (a, b) => a.memUsedPercent - b.memUsedPercent
        }, {
            title: '磁盘 %',
            dataIndex: 'diskUsedPercent',
            key: 'diskUsedPercent',
            render(text,record){
                return record.status === 1 ?<ResourceUsePercent percent={parseInt(text)}/> : '-';
            },
            sorter: (a, b) => a.diskUsedPercent - b.diskUsedPercent

        },
            {
                title: '网络 ',
                key: 'network',
                render(text, record){
                    return record.status === 1 ?
                    record.netIn + ' | ' + record.netOut + ' ' + record.netUnit
                        :
                        '-'
                }
            }, {
                title: '状态',
                width: 70,
                dataIndex: 'status',
                key: 'status',
                render(text, record){
                    //const s = 0 < record.status.indexOf('m');
                    const isSuccess = text === 1;
                    return <Label text={isSuccess ?'运行中':'已停止'} isSuccess={isSuccess}/>
                }
            }, {
                title: '描述',
                dataIndex: 'description'
            }, {
                title: ' 操作 ',
                key: 'operation',
                render(text, record) {
                    return (
                        <div>

                    <span className='table-actions'>
                        <Tooltip title="编辑节点">
                            <Button type="ghost" className='button'
                                    onClick={parent.addOrEditNodeOk.bind(parent,record,null)}
                            >
                                <Icon type="edit"/>
                            </Button>
                        </Tooltip>
                        <Tooltip title="删除节点">
                            <Button type="ghost"
                                    className='button'
                                    onClick={parent.delNodeOk.bind(parent,record,null)}
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

    filterNodeList() {
        const {nodeList} = this.props.clusterDetail.clusterNodeList;
        if (0 < this.state.keyword.length && nodeList) {
            return nodeList.filter((node)=>
                node.host.indexOf(this.state.keyword) != -1
                || (node.description && node.description.indexOf(this.state.keyword) != -1)
                || node.ip.indexOf(this.state.keyword) != -1
            );
        } else {
            return nodeList;
        }
    }

    addOrEditNodeOk(record, node) {
        const {openModal,operation,ownCluster} = this.props;

        if (node) {//从弹出窗口回调而来的
            node.clusterId = ownCluster.id;
            operation(1, node);
        } else {
            if (record) {
                this.currentNode = record;
            }
            openModal(4);
        }
    }

    delNodeOk(record, node) {
        const {openModal,operation} = this.props;
        if (node) {//从弹出窗口回调而来的
            operation(2, node);
        } else {
            if (record) {
                this.currentNode = record;
            }
            openModal(5);
        }
    }

    buildEmptyNode() {
        return {id: -1};
    }

    refresh() {
        const {getClusterNodeList,ownCluster} = this.props;
        getClusterNodeList(ownCluster.id);
    }

    search(keyword) {
        this.setState({keyword: keyword});
    }

//2016-05-31 13:46:29.517 [nioEventLoopGroup-1-0] DEBUG net.WawajiDispatcher - /192.168.0.41:50461:LoginHandler{handlerId=1, clientId='000000000000000000000000'} | ResponseDataContainer{handlerId=1, buf=}
//2016-05-31 13:46:30.330 [nioEventLoopGroup-1-0] DEBUG net.WawajiDispatcher - /192.168.0.41:50461:ReeceiveCoinHandler{handlerId=2, clientId='000000000000000000000000', coinNumber=3, consumeId=12345678} | null


    //展示节点的详细信息
//<Row>
//<Col span="12"><b>节点服务</b> : {record.service}</Col>
//<Col span="12"><b>节点描述</b> : {record.description}</Col>
//</Row>
    showNodeDetail(record) {
        return (
            <div style={{lineHeight:'25px'}}>
                <Row>
                    <Col span="8"><b>Cpu频率</b> : {record.cpuTotal} {record.cpuUnit}</Col>
                    <Col span="8"><b>磁盘总量</b> : {record.diskTotal} {record.diskUnit}</Col>
                    <Col span="8"><b>内存总量</b> : {record.memTotal} {record.memUnit}</Col>
                </Row>
                <Row>
                    <Col lg={12} sm={12} md={12} style={{paddingBottom:'10px'}}>
                        {record.charts.cpu && <ClusterCpuChart config={record.charts.cpu}/>}
                    </Col>
                    <Col lg={12} sm={12} md={12} style={{paddingBottom:'10px'}}>
                        {record.charts.mem && <ClusterMemChart config={record.charts.mem}/>}
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} sm={12} md={12} style={{paddingBottom:'10px'}}>
                        {record.charts.network && <ClusterNetworkChart config={record.charts.network}/>}
                    </Col>
                    <Col lg={12} sm={12} md={12} style={{paddingBottom:'10px'}}>
                        {record.charts.disk && <ClusterDiskChart config={record.charts.disk}/>}
                    </Col>
                </Row>
            </div>)

    }

    render() {
        console.log("ClusterNodeList 开始重绘！！！！！！！！！！！！！");
        const {clusterDetail,operationData} = this.props;
        return (
            <div className='cluster-node-list'>

                <div style={{margin:'10px 0px',height:'auto',minWidth:'560px'}}>

                    <SearchInput placeholder="search by host, ip or description"
                                 onSearch={keyword => this.search(keyword)} style={{ width: '30%' }}/>

                    <div style={{float:'right'}}>
                        <Button type="primary" icon="reload" onClick={this.refresh.bind(this)}
                                loading={clusterDetail.pending}
                                className='button'/>
                        <Button type="ghost" icon="plus" className='button'
                                onClick={this.addOrEditNodeOk.bind(this,this.buildEmptyNode(),null)}>
                            添加</Button>
                    </div>
                </div>
                <div>
                    <Table
                        expandedRowRender={record => this.showNodeDetail(record)}
                        style={{minWidth:'560px'}}
                        dataSource={this.filterNodeList()}
                        pagination={false}
                        columns={this.getColumns()}
                        loading={clusterDetail.pending}
                        size='middle'
                        rowKey={record=>record.id}/>

                    <ClusterNodeModal
                        ref='ClusterNodeModal'
                        visible={ operationData.currentOpenModal == 4 }
                        addOrEditNodeOk={this.addOrEditNodeOk.bind(this)}
                        pending={operationData.pending}
                        currentNode={this.currentNode}
                    />
                    <ClusterDelNodeModal
                        ref='ClusterDelNodeModal'
                        visible={ operationData.currentOpenModal == 5 }
                        delNodeOk={this.delNodeOk.bind(this)}
                        pending={operationData.pending}
                        currentNode={this.currentNode}
                    />
                </div>
            </div>
        )
    }
}
export default ClusterNodeList;