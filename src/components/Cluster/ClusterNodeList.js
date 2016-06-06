import React, { Component, PropTypes } from 'react'
import { Card, Col, Row,Table,Button,Input,Tooltip,Icon,Progress } from 'antd';

import ClusterNodeModal from './ClusterNodeModal'
import ClusterDelNodeModal from './ClusterDelNodeModal'


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

    getColumns() {
        const parent = this;
        return [{
            title: 'Host',
            dataIndex: 'host',
            width: 90,
            key: 'host'
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
            render(text){
                return <ResourceUsePercent percent={parseInt(text)}/>
            }
        }, {
            title: '内存 %',
            dataIndex: 'memUsedPercent',
            key: 'memUsedPercent',
            render(text){
                return <ResourceUsePercent percent={parseInt(text)}/>
            }
        }, {
            title: '磁盘 %',
            dataIndex: 'diskUsedPercent',
            key: 'diskUsedPercent',
            render(text){
                return <ResourceUsePercent percent={parseInt(text)}/>;
            }
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
                || node.description.indexOf(this.state.keyword) != -1
                || node.ip.indexOf(this.state.keyword) != -1
            );
        } else {
            return nodeList;
        }
    }

    addOrEditNodeOk(record, node) {
        const {openModal,operation} = this.props;
        if (node) {//从弹出窗口回调而来的
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

    //展示节点的详细信息
    showNodeDetail(record) {
        return (
            <div style={{lineHeight:'25px'}}>
                <div>
                    <div><b>内存总量</b> : {record.memTotal} {record.memUnit}</div>
                    <div><b>磁盘总量</b> : {record.diskTotal} {record.diskUnit}</div>
                    <div><b>节点服务</b> : {record.service}</div>
                    <div><b>节点描述</b> : {record.description}</div>
                </div>
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