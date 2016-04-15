import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'
import { QueueAnim,Button,Icon,Table } from 'antd';

import * as fileExplorerActions from '../actions/FileExplorer';
import '../css/fileExplorer.scss'

export default class FileExplorer extends Component {
    constructor(props) {
        super(props);
        this.state = {openIndex: -1};//暂时不好用，表格的row好像没有MouseOver事件相应，再看看
        //this.state.openIndex = -1;
    }
    componentDidMount() {
        const{showFileList} = this.props;
        //showFileList('http://master:50070/webhdfs/v1/input/badage?op=LISTSTATUS');
        showFileList('/');
    }
    onRowClick(record, index){
        console.log( record );
    }
    render() {
        const{fileList} = this.props;

        //const dataSource = [{
        //    key: '1',
        //    name: '北京机房',
        //    ip: '192.168.1.81',
        //    address: '西湖区湖底公园1号'
        //}, {
        //    key: '2',
        //    name: '两路机房',
        //    ip: '192.168.1.31',
        //    address: '西湖区湖底公园1号'
        //},{
        //    key: '3',
        //    name: '龙湖机房',
        //    ip: '192.168.1.31',
        //    address: '西湖区湖底公园1号'
        //}, {
        //    key: '4',
        //    name: '两路机房',
        //    ip: '192.168.1.31',
        //    address: '西湖区湖底公园1号'
        //},{
        //    key: '5',
        //    name: '龙湖机房',
        //    ip: '192.168.1.31',
        //    address: '西湖区湖底公园1号'
        //}, {
        //    key: '6',
        //    name: '两路机房',
        //    ip: '192.168.1.31',
        //    address: '西湖区湖底公园1号'
        //},{
        //    key: '7',
        //    name: '龙湖机房',
        //    ip: '192.168.1.31',
        //    address: '西湖区湖底公园1号'
        //}, {
        //    key: '8',
        //    name: '两路机房',
        //    ip: '192.168.1.31',
        //    address: '西湖区湖底公园1号'
        //}];
//名称	大小	用户	组	权限	创建时间
        const columns = [{
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render:(text, row, index)=>{
                const style = {paddingLeft:'6px'};
                let folderIcon = 'folder';
                if( index === this.state.openIndex ){
                    folderIcon += '-open';
                }
                if( text === 'DIRECTORY' ){
                    return <Icon type={folderIcon} style={style}/>
                }else {
                    return <Icon type='file'  style={style}/>
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

        let key = 0;
        return (
            <QueueAnim animConfig={{ opacity: [1, 0], translateX: [0, 200], scale: [1, 0.5] }}>



                <div style={{background:'yellow', padding:'10px'}}><Icon type='home'/> / </div><br />
                <div key='c' className="fileExplorer">

                    <QueueAnim component="div" animConfig={{ opacity: [1, 0], translateY: [0, 30], scale: [1, 0.9] }}>
                        <Table loading={fileList.pending}
                               dataSource={fileList.data && fileList.data.FileStatuses.FileStatus}
                               rowKey={record=>record.fileId}
                               columns={columns} size="middle"

                               onRowClick={this.onRowClick.bind(this)}/>
                    </QueueAnim>
                </div>
            </QueueAnim>
        )
    }
}
function mapStateToProps(state) {
    return {
        fileList: state.fileList
    }
}

export default connect(mapStateToProps, fileExplorerActions)(FileExplorer);