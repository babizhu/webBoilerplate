/**
 * Created by liu_k on 2016/4/20.
 * 显示目录的视图
 */

import React, { Component,PropTypes } from 'react';
import { Icon,Table } from 'antd';

import TableToolButtons from './TableToolButtons';
import {formatTime} from '../../utils/time';
import {formatFileSize} from '../../utils/index';


class DirectoryView extends Component {

    /**
     * 响应单击表格的row的事件
     * @param record
     */
    onRowClick(record) {
        const {currentPath} = this.props.filesData;
        const {getFilesData} = this.props;
        let tempPath = '';
        if (!currentPath) {
            tempPath = '/'
        } else {
            tempPath = currentPath;
        }
        getFilesData(tempPath + record.pathSuffix);
    }


    render() {
        const {filesData} = this.props;
        const columns = [{
            title: '类型',
            dataIndex: 'isFile',
            key: 'isFile',
            render: (text)=> {
                const style = {paddingLeft: '6px'};
                let folderIcon = 'folder';
                //if (index === this.state.openIndex) {
                //    folderIcon += '-open';
                //}
                if (text) {
                    return <Icon type='file' style={style}/>

                } else {
                    return <Icon type={folderIcon} style={style}/>

                }
            }
        }, {
            title: '名称',
            dataIndex: 'pathSuffix',
            key: 'pathSuffix'
        }, {
            title: '大小',
            dataIndex: 'length',
            key: 'length',
            render: (text, row)=> {
                //noinspection JSUnresolvedVariable
                if (!row.isFile) {
                    return '~';
                }
                return formatFileSize(text);
            }
        }, {
            title: '用户',
            dataIndex: 'owner',
            key: 'owner'
        }, {
            title: '组',
            dataIndex: 'group',
            key: 'group'
        }, {
            title: '权限',
            dataIndex: 'permission',
            key: 'permission'
        }, {
            title: '备份数',
            dataIndex: 'replication',
            key: 'replication',
            render: (text, row)=> {
                //noinspection JSUnresolvedVariable
                return row.isFile ? text : '~';
            }
        }, {
            title: '创建时间',
            dataIndex: 'modificationTime',
            key: 'modificationTime',
            render: (text)=> {
                return formatTime(text);
            }
        }, {
            title: '操作',
            key: 'operation',
            render(text, record) {
                return (
                    <TableToolButtons record={record} filesData={filesData}/>
                );
            }
        }];


        //noinspection JSUnresolvedVariable
        return (
            <Table loading={filesData.pending}
                   dataSource={filesData.data && filesData.data.FileStatus}
                   rowKey={record=>record.fileId}
                   columns={columns} size="middle"
                   onRowClick={this.onRowClick.bind(this)}/>
        )
    }
}


DirectoryView.propTypes = {
    filesData: PropTypes.shape({
        pending:PropTypes.bool.isRequired,
        currentPath: PropTypes.string.isRequired,//当前路径
        data: PropTypes.object//当前文件夹的数据
    }).isRequired,

    /**
     * 根据当前路径从服务器端获取数据，有可能获取的是文件夹的数据，也有可能是具体某个文件的数据
     */
    getFilesData: PropTypes.func.isRequired
};

DirectoryView.defaultProps = {};

export default DirectoryView;