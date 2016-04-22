/**
 * Created by liu_k on 2016/4/20.
 */
import React, { Component,PropTypes } from 'react';
import { Icon,Tooltip,Button,Upload,Modal  } from 'antd';
const Dragger = Upload.Dragger;


import {ignoreClick} from '../../utils/index'
class TableToolButtons extends Component {
    constructor() {
        super();
        this.currentSelectIndex = -1;
        this.state = {showUpload: false};
    }

    onRenameClick(record,e) {
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
    }

    render() {
        const props = {
            name: 'file',
            showUploadList: false,
            action: 'http://localhost:8080/hadoop/upload'
        };

        //<a href="#" className="ant-dropdown-link">
        //    更多 <Icon type="down"/>
        //</a>
        const {record} = this.props;
        return (
            <div onClick={(e)=>ignoreClick(e)}>
                <Modal title="上传新文件"
                       visible={this.state.showUpload}
                       onOk={this.uploadOk.bind(this)}
                       onCancel={this.uploadOk.bind(this)}
                >
                    <div style={{ width: 246, height: 140 }}>
                        <Dragger {...props}>
                            <Icon type="plus"/>
                        </Dragger>
                    </div>
                    <div style={{ marginTop: 16, height: 180 }}>
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox"/>
                            </p>
                            <p className="ant-upload-text">点击或将文件拖拽到此区域上传</p>
                            <p className="ant-upload-hint">支持单个或批量上传，请注意信息安全</p>
                        </Dragger>
                    </div>

                </Modal>
            <span className='actions'>
                <Tooltip title="重命名">
                    <Button className='button' onClick={this.onRenameClick.bind(this,record)}>
                        <Icon type="edit" />
                    </Button>
                </Tooltip>

                <Tooltip title="删除">
                    <Button className='button' onClick={this.onDelClick.bind(this,record)}>
                        <Icon type="delete" />
                    </Button>
                </Tooltip>

                <Tooltip title="上传新文件">
                    <Button className='button' onClick={this.onUploadClick.bind(this,record)}>
                        <Icon type="upload" />
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
    }).isRequired,

    /**
     * 根据当前路径从服务器端获取数据，有可能获取的是文件夹的数据，也有可能是具体某个文件的数据
     */
    //getFilesData: PropTypes.func.isRequired
};
TableToolButtons.defaultProps = {};

export default TableToolButtons;
