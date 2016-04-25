/**
 * Created by liukun on 16/4/25.
 * 上传组件
 */



import React, { Component,PropTypes } from 'react';
import { Icon,Tooltip,Button,Upload,Modal  } from 'antd';
const Dragger = Upload.Dragger;


class UploadModal extends Component {

    render(){
        const {visible,uploadOk,uploadProps} = this.props;

        return(

            <Modal title="上传文件"
                   visible={visible}
                   onOk={uploadOk.bind(this)}
                   onCancel={uploadOk.bind(this)}
                   footer={[
                           <Button key="back" type="ghost" size="large" onClick={uploadOk.bind(this)}>关 闭</Button>
                       ]}>

                <div style={{ marginTop: 16 }}>
                    <Dragger {...uploadProps} >
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
    uploadOk:PropTypes.func.isRequired,//点击关闭将调用此函数
    uploadProps: PropTypes.object.isRequired//上传组件的相关属性

};
UploadModal.defaultProps = {};

export default UploadModal;
