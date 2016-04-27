/**
 * Created by liukun on 16/4/25.
 * 上传组件
 */



import React, { Component,PropTypes } from 'react';
import { Icon,Tooltip,Button,Upload,Modal  } from 'antd';
const Dragger = Upload.Dragger;



class AddDirectorydModal extends Component {

    render(){
        const {visible,addDirectoryOk} = this.props;
        //alert(uploadPorps.action);
        return(

            <Modal title="新建文件夹"
                   visible={visible}
                   onOk={addDirectoryOk.bind(this)}
                   onCancel={addDirectoryOk.bind(this)}
                   >

                <div style={{ marginTop: 16 }}>
                    <Dragger {...uploadPorps} fileList = {fileList}>
                        <p className="ant-upload-drag-icon" style={{ marginTop: 16 }}>
                            <Icon type="inbox"/>
                        </p>
                        <p className="ant-upload-text">点击或将文件拖拽到此区域上传</p>
                        <p className="ant-upload-hint" style={{ marginBottom: 16 }}>支持单个或批量上传，请注意信息安全</p>
                    </Dragger>

                </div>
            </Modal>
        )
    }
}

UploadModal.propTypes = {
    visible: PropTypes.bool.isRequired,//是否显示对话框
    addDirectoryOk:PropTypes.func.isRequired,//点击关闭将调用此函数
};
UploadModal.defaultProps = {};

export default UploadModal;
