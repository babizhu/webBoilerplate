/**
 * Created by liu_k on 2016/4/20.
 */
import React, { Component,PropTypes } from 'react';
import { Icon,Tooltip,Button,Upload,Modal  } from 'antd';
const Dragger = Upload.Dragger;


import {ignoreClick} from '../../utils/index'
import {BASE_URI} from '../../conf/config'


class TableToolButtons extends Component {
    constructor() {
        super();
        this.currentSelectIndex = -1;
        this.state = {
            showUpload: false,
            fileList: []
        };

    }

    onRenameClick(record, e) {
        ignoreClick(e);
        alert(record.pathSuffix);
        //if (e && e.stopPropagation) {
        //    e.stopPropagation();
        //    e.preventDefault();
        //
        //} else {
        //    // 否则，我们需要使用IE的方式来取消事件冒泡
        //    window.event.cancelBubble = true;
        //}

    }

    onDelClick(record, e) {
        ignoreClick(e);
        if (!record.isFile) {

            alert(record.pathSuffix);
        }


    }

    onUploadClick(record, e) {
        ignoreClick(e);
        if (!record.isFile) {
            this.setState({showUpload: true});
        }
    }

    uploadOk() {
        this.setState({showUpload: false});
        //alert(this.uploadPorps.fileList);
    }

    onChange(info) {
        let fileList = info.fileList;

        // 1. 上传列表数量的限制
        //    只显示最近上传的一个，旧的会被新的顶掉
        //fileList = fileList.slice(-2);

        // 2. 读取远程路径并显示链接
        fileList = fileList.map((file) => {
            if (file.response) {
                // 组件会将 file.url 作为链接进行展示
                file.url = file.response.url;
            }
            return file;
        });

        // 3. 按照服务器返回信息筛选成功上传的文件
        fileList = fileList.filter((file) => {
            if (file.response) {
                return file.response.status === 'success';
            }
            return true;
        });

        this.setState({fileList});

    }

    render() {
        //<div className="ant-upload-list ant-upload-list-text">
        //                    <span>
        //                        <div className="ant-upload-list-item ant-upload-list-item-done">
        //                            <div className="ant-upload-list-item-info">
        //                                <Icon type="paper-clip"/>
        //                                <span className="ant-upload-list-item-name">2013新教材人教版七年级英语上册单词表带音标.doc</span>
        //                            </div>
        //                        </div>
        //                    </span>
        //</div>

        //const a = {
        //    file: {uid: 'uid', name: 'xx.png', status: 'done', response: '{"status":"success"}'},
        //    fileList: [],
        //    event: {}
        //}


//<a href="#" className="ant-dropdown-link">
//    更多 <Icon type="down"/>
//</a>
        const {record} = this.props;
        const uploadPorps = {

            onChange: this.handleChange,
            data: {path: this.props.filesData.currentPath},
            name: 'file',
            //showUploadList: false,
            multiple: true,
            action: BASE_URI+'upload'
        };
        return (
            <div onClick={(e)=>ignoreClick(e)}>
                <Modal title="上传文件"
                       visible={this.state.showUpload}
                       onOk={this.uploadOk.bind(this)}
                       onCancel={this.uploadOk.bind(this)}
                       footer={[
                           <Button key="back" type="ghost" size="large" onClick={this.uploadOk.bind(this)}>关 闭</Button>
                       ]}>

                    <div style={{ marginTop: 16 }}>
                        <Dragger {...uploadPorps} fileList={this.state.fileList}>
                            <p className="ant-upload-drag-icon" style={{ marginTop: 16 }}>
                                <Icon type="inbox"/>
                            </p>
                            <p className="ant-upload-text">点击或将文件拖拽到此区域上传</p>
                            <p className="ant-upload-hint" style={{ marginBottom: 16 }}>支持单个或批量上传，请注意信息安全</p>
                        </Dragger>

                    </div>
                </Modal>

            <span className='actions'>
                <Tooltip title="重命名">
                    <Button type="ghost" className='button' onClick={this.onRenameClick.bind(this,record)}>
                        <Icon type="edit"/>
                    </Button>
                </Tooltip>

                <Tooltip title="删除">
                    <Button type="ghost" className='button' onClick={this.onDelClick.bind(this,record)}>
                        <Icon type="delete"/>
                    </Button>
                </Tooltip>

                <Tooltip title="上传新文件">
                    <Button type="ghost" className='button' onClick={this.onUploadClick.bind(this,record)}>
                        <Icon type="upload"/>
                    </Button>
                </Tooltip>


            </span>

            </div>

        );
    }
}

TableToolButtons.propTypes = {
    record: PropTypes.object,//当前记录
    filesData: PropTypes.shape({
        pending: PropTypes.bool.isRequired,
        currentPath: PropTypes.string.isRequired,//当前路径
        currentPathIsFile: PropTypes.bool.isRequired,//当前路径是否文件
        data: PropTypes.object//当前路径下的内容，有可能是文件夹的数据，也有可能是具体某个文件的数据
    }).isRequired

};
TableToolButtons.defaultProps = {};

export default TableToolButtons;
