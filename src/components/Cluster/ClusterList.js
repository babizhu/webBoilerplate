/**
 * Created by liu_k on 2016/5/12.
 * 集群列表
 */
import React, { Component,PropTypes } from 'react';
import { Menu,Icon,Table,Dropdown ,Tooltip,Button,Input } from 'antd';
const DropdownButton = Dropdown.Button;
const InputGroup = Input.Group;


import DelClusterModal from './DelClusterModal'
import ClusterModal from './ClusterModal'

import {ignoreClick} from '../../utils/index';


class ClusterList extends Component {
    constructor() {
        super();
        this.currentCluster = {id: -1};
        this.state = {selectedRowKeys: []}
    }

    buildEmptyCluster() {
        return {id: -1};
    }

    /**
     * 响应单击表格的row的事件
     * @param record    当前记录
     */
    onRowClick(record) {

    }

    editOk(record) {
    }

    addOrEditClusterOk(record, cluster) {
        const {openModal,operation} = this.props;
        if (cluster) {//从弹出窗口回调而来的
            operation(1, cluster);
        } else {
            if (record) {
                this.currentCluster = record;
            }
            openModal(1);
        }
    }

    delClusterOk(record, cluster) {
        const {openModal,operation} = this.props;
        if (cluster) {//从弹出窗口回调而来的
            operation(2, cluster);
        } else {
            if (record) {
                this.currentCluster = record;
            }
            openModal(2);
        }
    }

    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    }

    refresh() {
        this.props.getClustersData();
    }

    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this)
        };
        const hasSelected = selectedRowKeys.length > 0;

        const menu = (
            <Menu>
                <Menu.Item key="1">重新启动</Menu.Item>
                <Menu.Item key="2">彻底删除</Menu.Item>
            </Menu>
        );

        const {clusterData,operationData} = this.props;
        const parent = this;
        const columns = [{
            title: '名称',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: 'IP地址',
            dataIndex: 'ip',
            key: 'ip'
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime'
        }, {
            title: '描述',
            dataIndex: 'description',
            key: 'description'
        }, {
            title: '操作',
            key: 'operation',
            render(text, record) {
                return (
                    <div onClick={(e)=>ignoreClick(e)}>
                        <span className='actions'>
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

        return (
            <span>
                <div style={{margin:'10px 0px'}}>
                    <Button type="primary" icon="reload" onClick={this.refresh.bind(this)}
                            loading={clusterData.pending}/>
                    <Button type="ghost" icon="plus" style={{margin:'0px 6px'}}
                            onClick={this.addOrEditClusterOk.bind(this,this.buildEmptyCluster(),null)}>
                        添加</Button>
                    <Button type="ghost" icon="right" style={{margin:'0px 6px'}} disabled={!hasSelected}>启动</Button>
                    <Button type="ghost" icon="poweroff" style={{margin:'0px 6px'}} disabled={!hasSelected}>停止</Button>
                    <DropdownButton overlay={menu} type="primary" disabled={!hasSelected}>
                        更多操作
                    </DropdownButton>
                    <div style={{float:'right', width:'30%'}}>
                        <Input placeholder="search by name、id or description"/>
                    </div>

                </div>
                <Table
                    dataSource={clusterData.data}
                    rowSelection={rowSelection}
                    columns={columns} size="middle"
                    loading={clusterData.pending}
                    size="middle"
                    rowKey={record=>record.id}/>
                <DelClusterModal
                    visible={operationData.currentOpenModal == 2 }
                    delClusterOk={this.delClusterOk.bind(this)}
                    pending={operationData.pending}
                    currentCluster={this.currentCluster}
                />
                <ClusterModal
                    visible={ operationData.currentOpenModal == 1 }
                    addOrEditClusterOk={this.addOrEditClusterOk.bind(this)}
                    pending={operationData.pending}
                    currentCluster={this.currentCluster}
                />
            </span>

        )
    }
}
ClusterList.propTypes = {
    clusterData: PropTypes.shape({
        pending: PropTypes.bool.isRequired,
        data: React.PropTypes.array.isRequired
    }).isRequired,
    operationData: PropTypes.shape({
        pending: PropTypes.bool.isRequired,//操作是否pending
        currentOpenModal: PropTypes.number//当前打开的对话框
    }).isRequired,
    /**
     * 根据当前路径从服务器端获取数据，有可能获取的是文件夹的数据，也有可能是具体某个文件的数据
     */
    //getClustersData: PropTypes.func.isRequired
    operation: PropTypes.func.isRequired
};

ClusterList.defaultProps = {};
export default ClusterList;