/**
 * Created by liu_k on 2016/4/20.
 * 显示目录的视图
 */

import React, { Component,PropTypes } from 'react';
import { Icon,Table,Tooltip,Button } from 'antd';

import DelDirectorydModal from './DelDirectorydModal';
import RenameDirectorydModal from './RenameDirectorydModal';
import TableToolButtons from './TableToolButtons';
import {formatTime} from '../../utils/time';
import {formatFileSize} from '../../utils/index';
import {ignoreClick} from '../../utils/index';


class DirectoryView extends Component {

    constructor() {
        super();
        this.operationDirectory = '';
    }

    /**
     * 响应单击表格的row的事件
     * @param record    当前记录
     */
    onRowClick(record) {
        const {currentPath} = this.props.fileSystemData;
        const {getFilesData} = this.props;
        let tempPath = '';
        if (!currentPath) {
            tempPath = '/'
        } else {
            tempPath = currentPath;
        }
        getFilesData(tempPath + record.pathSuffix);
    }

    renameDirectoryOk(record, newDirectoryName) {
        const {operation,fileSystemData,openModal} = this.props;
        if (newDirectoryName) {
            operation(1, this.operationDirectory, newDirectoryName);
            console.log('要修改的文件是:' + this.operationDirectory + ' newDirectoryName=' + newDirectoryName);
            //operation(2,this.operationDirectory ,recursiveDelete);
        } else {
            if (record) {
                this.operationDirectory = fileSystemData.currentPath + record.pathSuffix;
            }
            openModal(1);
        }
    }

    delDirectoryOk(record, recursiveDelete) {
        const {operation,fileSystemData,openModal} = this.props;
        if (recursiveDelete != undefined) {

            console.log('要删除的文件是:' + this.operationDirectory + ' recursiveDel=' + recursiveDelete);
            operation(2, this.operationDirectory, recursiveDelete);
        } else {
            if (record) {
                this.operationDirectory = fileSystemData.currentPath + record.pathSuffix;
            }
            openModal(2);
        }
        ////for( let x in record )
        //
        ////alert( record);
        ////for( let x in recursiveDel )
        ////alert(x)
        //console.log('aaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaa')
        //alert('bbbbbbbbbbbbbb')
    }

    render() {
        const parent = this;
        const {fileSystemData,operationData} = this.props;
        //const props = this.props;
        //var delDirectoryOk = this.delDirectoryOk;
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
            },
            sorter: (a, b) => a.isFile - b.isFile
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
            },
            sorter: (a, b) => a.length - b.length
        }, {
            title: '用户',
            dataIndex: 'owner',
            key: 'owner'
        }, {
            title: '用户组',
            dataIndex: 'group',
            key: 'group'
        }, {
            title: '权限',
            dataIndex: 'permission',
            key: 'permission'
        }, {
            title: '备份',
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
                function abc(record) {
                    console.log(record.group);
                    //delDirectoryOk(record,null);
                    //this.delDirectoryOk(record,null);
                    console.log(parent.delDirectoryOk);
                    parent.delDirectoryOk(record);
                    //s.delDirectoryOk(record,null);
                };
                return (

                    <div onClick={(e)=>ignoreClick(e)}>
                        <span className='actions'>
                            <Tooltip title="重命名">
                                <Button type="ghost" className='button'
                                        onClick={parent.renameDirectoryOk.bind(parent,record,null)}>
                                    <Icon type="edit"/>
                                </Button>
                            </Tooltip>

                            <Tooltip title="删除">
                                <Button type="ghost" className='button'
                                        onClick={parent.delDirectoryOk.bind(parent,record,null)}>
                                    <Icon type="delete"/>
                                </Button>
                            </Tooltip>
                        </span>
                    </div>
                );
            }
        }];


        //noinspection JSUnresolvedVariable
        return (
            <span>
                <Table loading={fileSystemData.pending}
                       pagination={false}
                       dataSource={fileSystemData.data && fileSystemData.data.FileStatus}
                       rowKey={record=>record.fileId}
                       columns={columns} size="middle"
                       onRowClick={this.onRowClick.bind(this)}/>

                <DelDirectorydModal
                    visible={operationData.currentOpenModal == 2 }
                    delDirectoryOk={this.delDirectoryOk.bind(this)}
                    pending={operationData.pending}
                    directory={this.operationDirectory}
                />
                <RenameDirectorydModal
                    visible={operationData.currentOpenModal == 1 }
                    renameDirectoryOk={this.renameDirectoryOk.bind(this)}
                    pending={operationData.pending}
                    directory={this.operationDirectory}

                />
            </span>
        )
    }
}


DirectoryView.propTypes = {
    fileSystemData: PropTypes.shape({
        pending: PropTypes.bool.isRequired,
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