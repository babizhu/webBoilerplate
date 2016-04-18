import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'
import { QueueAnim,Button,Icon,Table } from 'antd';

import Navigate from '../components/FileExplorer/Navigate'
import * as fileExplorerActions from '../actions/FileExplorer';
import '../css/fileExplorer.scss'

export default class FileExplorer extends Component {
    constructor(props) {
        super(props);
        this.state = {openIndex: -1};//暂时不好用，表格的row好像没有MouseOver事件相应，再看看
        //this.state.openIndex = -1;
    }

    componentDidMount() {

        const {currentPath} = this.props.fileList;


        //showFileList('http://master:50070/webhdfs/v1/input/badage?op=LISTSTATUS');

        if(!currentPath){
            const {showFileList} = this.props;
            showFileList('/');
        }

    }


    onRowClick(record, index) {
        //console.log(record);
        const {currentPath} = this.props.fileList;
        const {showFileList} = this.props;


        let tempPath = '';
        if (!currentPath) {
            tempPath = '/'
        } else {
            tempPath = currentPath;
        }

        //console.log( tempPath );
        if (tempPath !== '/') {
            tempPath += '/';
        }
        showFileList(tempPath + record.pathSuffix);

    }

    render() {

        const {fileList,showFileList} = this.props;
        const columns = [{
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: (text, row, index)=> {
                const style = {paddingLeft: '6px'};
                let folderIcon = 'folder';
                if (index === this.state.openIndex) {
                    folderIcon += '-open';
                }
                if (text === 'DIRECTORY') {
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
            key: 'length'
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
            title: '创建时间',
            dataIndex: 'modificationTime',
            key: 'modificationTime'
        }];


        return (
            <div>


                <QueueAnim animConfig={{ opacity: [1, 0], translateX: [0, 200], scale: [1, 0.5] }}>
                    <div key='c' className="fileExplorer">
                        <QueueAnim component="div"
                                   animConfig={{ opacity: [1, 0], translateY: [0, 30], scale: [1, 0.9] }}>

                            <Navigate fileList={fileList} showFileList={showFileList}/>

                            <Table loading={fileList.pending}
                                   dataSource={fileList.data && fileList.data.FileStatuses.FileStatus}
                                   rowKey={record=>record.fileId}
                                   columns={columns} size="middle"
                                   onRowClick={this.onRowClick.bind(this)}/>

                        </QueueAnim>
                    </div>

                </QueueAnim>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        fileList: state.fileList
    }
}

export default connect(mapStateToProps, fileExplorerActions)(FileExplorer);