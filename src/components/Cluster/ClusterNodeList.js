import React, { Component, PropTypes } from 'react'
import { Card, Col, Row,Table,Button,Input,Tooltip,Icon,Progress } from 'antd';
//import ReactHighcharts,{Highcharts} from 'react-highcharts'
//import HighchartsMore from 'highcharts-3d'
//HighchartsMore(ReactHighcharts.Highcharts);

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
        }
    }

    componentDidMount() {
        const {getClusterNodeList,clusterDetail,ownCluster} = this.props;
        if (!clusterDetail.nodeList) {
            getClusterNodeList(ownCluster.id);
        }
    }

    shouldComponentUpdate(nextProps) {
        if( nextProps.clusterDetailList.pending ){
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
        }
            //    , {
            //    title: '服务',
            //    dataIndex: 'service',
            //    key: 'service'
            //}
            , {
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
                    return <ResourceUsePercent percent={parseInt(text)}/>
                }
            },
            {
                title: '网络 ',
                key: 'network',
                render(text, record){
                    return record.netIn + ' | ' + record.netOut + ' ' + record.netUnit
                }
            }, {
                title: '状态',
                width: 70,
                key: 'status',
                render(text, record){
                    const s = 0 < record.host.indexOf('m');
                    return <Label text={s?'运行中':'已停止'} isSuccess={s}/>
                }
            }, {
                title: '描述',
                dataIndex: 'description'
            },
            {
                title: ' 操作 ',
                key: 'operation',
                render(text, record) {
                    return (
                        <div
                            onClick={parent.addOrEditClusterNode.bind(parent,record,null)}>

                        <span className='table-actions'>
                            <Tooltip title="编辑节点">
                                <Button type="ghost" className='button'
                                >
                                    <Icon type="edit"/>
                                </Button>
                            </Tooltip>
                            <Tooltip title="删除节点">
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

    filterNodeList() {

        const {nodeList} = this.props.clusterDetail;

        if (0 < this.state.keyword.length && nodeList) {
            return nodeList.filter((node)=>
                    node.host.indexOf(this.state.keyword) != -1
                ||  node.description.indexOf(this.state.keyword) != -1
                ||  node.ip.indexOf(this.state.keyword) != -1
                //|| node.id === parseInt(this.state.keyword)
            );
            //return nodeList.filter((node)=>node.host===this.state.keyword);
        } else {
            return nodeList;
        }

        //console.log('this.state.keyword = ' + this.state.keyword.length);
        //return nodeList;

    }

    addOrEditClusterNode() {

    }

    buildEmptyNode() {

    }

    refresh() {
        const {getClusterNodeList,ownCluster} = this.props;
        getClusterNodeList(ownCluster.id);

    }

    search(keyword) {
        this.setState({keyword: keyword});
    }

    render() {
        console.log("ClusterNodeList 开始重绘！！！！！！！！！！！！！");
        const {clusterDetail} = this.props;
        //<Input style={{ width:'25%'}} placeholder="search by name、id or description"/>
        return (
            <div className='cluster-node-list'>

                <div style={{margin:'10px 0px',height:'auto',minWidth:'560px'}}>

                    <SearchInput placeholder="search by name、ip or description"
                                 onSearch={keyword => this.search(keyword)} style={{ width: '30%' }}/>

                    <div style={{float:'right'}}>
                        <Button type="primary" icon="reload" onClick={this.refresh.bind(this)}
                                loading={clusterDetail.pending}
                                className='button'/>
                        <Button type="ghost" icon="plus" className='button'
                                onClick={this.addOrEditClusterNode.bind(this,this.buildEmptyNode(),null)}>
                            添加</Button>

                    </div>

                </div>
                <div>
                    <Table
                        expandedRowRender={record => <span><p>内存 100G</p><p>{record.description}</p></span>}
                        style={{minWidth:'560px'}}
                        dataSource={this.filterNodeList()}
                        //onRowClick={this.onRowClick.bind(this)}
                        pagination={false}
                        //rowSelection={rowSelection}
                        columns={this.getColumns()}
                        loading={clusterDetail.pending}
                        size='middle'
                        rowKey={record=>record.id}/>

                </div>
            </div>
        )
    }
}


export default ClusterNodeList;