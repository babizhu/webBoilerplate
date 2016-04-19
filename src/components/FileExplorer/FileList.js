/**
 * Created by liukun on 16/4/17.
 * hadoop文件浏览器的主体内容
 */
import React, { Component,PropTypes } from 'react';
import { Icon,Table } from 'antd';

import FileDetail from './FileDetail'

class FileList extends Component {
    constructor(props) {
        super(props);
        this.state = {openIndex: -1};//暂时不好用，表格的row好像没有MouseOver事件相应，再看看

    }

    onRowClick(record) {
        const {currentPath} = this.props.fileList;
        const {showFileList} = this.props;
        let tempPath = '';
        if (!currentPath) {
            tempPath = '/'
        } else {
            tempPath = currentPath;
        }


        //noinspection JSUnresolvedVariable
        if( record.isFile ){
            showFileList(tempPath + record.pathSuffix);
        }else {
            showFileList(tempPath + record.pathSuffix + '/');
        }
    }
    render() {
        const columns = [{
            title: '类型',
            dataIndex: 'isFile',
            key: 'isFile',
            render: (text, row, index)=> {
                const style = {paddingLeft: '6px'};
                let folderIcon = 'folder';
                if (index === this.state.openIndex) {
                    folderIcon += '-open';
                }
                if (text) {
                    return <Icon type={folderIcon} style={style}/>
                } else {
                    return <Icon type='file' style={style}/>
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
                if( !row.isFile ){
                    return '~';
                }
                const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'ZB'];
                let prev = 0, i = 0;
                while (Math.floor(text) > 0 && i < UNITS.length) {
                    prev = text;
                    text /= 1024;
                    i += 1;
                }

                if (i > 0 && i < UNITS.length) {
                    text = prev;
                    i -= 1;
                }
                return Math.round(text * 100) / 100 + ' ' + UNITS[i];
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
                return row.isFile === 'DIRECTORY' ? text :  '~';
            }
        }, {
            title: '创建时间',
            dataIndex: 'modificationTime',
            key: 'modificationTime',
            render: (text)=> {
                const t = new Date(text);

                function addPrefix(v) {
                    return v < 10 ? '0' + v : v;
                }

                return t.getFullYear()
                    + '-' + addPrefix((t.getMonth() + 1))
                    + '-' + addPrefix(t.getDate())
                    + ' ' + addPrefix(t.getHours())
                    + ':' + addPrefix(t.getMinutes())
                    + ':' + addPrefix(t.getSeconds());

                //new Date(text).toLocaleString();标准做法，存档
            }
        }];

        const {fileList} = this.props;
        const isFile = !fileList.currentPath.endsWith('/');//路径如果以/结尾说明当前路径是目录

        //noinspection JSUnresolvedVariable
        return (
            <div>
                <div  style={{display: isFile ? 'none':''}}>
                    <Table loading={fileList.pending}
                           dataSource={fileList.data && fileList.data.FileStatuses.FileStatus}
                           rowKey={record=>record.fileId}
                           columns={columns} size="middle"
                           onRowClick={this.onRowClick.bind(this)}/>
                </div>
                <div style={{display: isFile ? '':'none'}}>
                    <FileDetail />
                </div>
            </div>

        )


    }
}


FileList.propTypes = {};
FileList.defaultProps = {};

export default FileList;