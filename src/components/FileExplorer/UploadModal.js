/**
 * Created by liukun on 16/4/25.
 * 上传组件
 */



import React, { Component,PropTypes } from 'react';
import { Icon,Tooltip,Button,Upload,Modal  } from 'antd';
const Dragger = Upload.Dragger;



class UploadModal extends Component {

    onOk(){
        const {uploadOk,fileList} = this.props;
        //alert( fileList );
        const needRereshUI = !!fileList && fileList.length > 0;//如果上传的文件出了问题，还是会引起刷新action，先不管以后再优化
        uploadOk(needRereshUI );
    }
    render(){
        const {visible,uploadPorps,fileList} = this.props;
        //alert(uploadPorps.action);
        return(

            <Modal title="上传文件"
                   visible={visible}
                   onOk={this.onOk.bind(this)}
                   onCancel={this.onOk.bind(this)}
                   footer={[
                           <Button key="back" type="ghost" size="large" onClick={this.onOk.bind(this)}>关 闭</Button>
                       ]}>

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
    uploadOk:PropTypes.func.isRequired,//点击关闭将调用此函数
    uploadPorps: PropTypes.object.isRequired//上传组件的相关属性

};
UploadModal.defaultProps = {};

export default UploadModal;
