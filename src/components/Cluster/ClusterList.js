/**
 * Created by liu_k on 2016/5/12.
 * 集群列表
 */
import React, { Component,PropTypes } from 'react';
import { Icon,Table,Tooltip,Button } from 'antd';

import DelClusterModal from './DelClusterModal'
import {ignoreClick} from '../../utils/index';


class ClusterList extends Component {
    constructor() {
        super();
        this.currentCluster={};
    }

    /**
     * 响应单击表格的row的事件
     * @param record    当前记录
     */
    onRowClick(record) {

    }

    editOk(record) {
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

    render() {
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
            title: '描述',
            dataIndex: 'description',
            key: 'address'
        }, {
            title: '操作',
            key: 'operation',
            render(text, record) {
                return (
                    <div onClick={(e)=>ignoreClick(e)}>
                        <span className='actions'>
                            <Tooltip title="编辑集群">
                                <Button type="ghost" className='button'>
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
                <Table dataSource={clusterData.data} columns={columns} size="middle"
                       loading={clusterData.pending}
                       size="middle"
                       rowKey={record=>record.id}/>
                <DelClusterModal
                    visible={operationData.currentOpenModal == 2 }
                    delClusterOk={this.delClusterOk.bind(this)}
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