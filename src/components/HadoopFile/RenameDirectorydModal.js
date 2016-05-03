/**
 * Created by liukun on 16/4/25.
 * 上传组件
 */

import React, { Component,PropTypes } from 'react';
import { Button, Form, Input, Modal,Icon } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

class RenameDirectorydModal extends Component {

    onOk(){
        const {renameDirectoryOk,form} = this.props;
        const newDirectoryName = form.getFieldValue('newDirectoryName');
        form.resetFields();
        renameDirectoryOk( null,newDirectoryName );
    }
    onCancle(){
        const {renameDirectoryOk} = this.props;
        renameDirectoryOk();
    }
    render() {
        const {visible,pending,directory} = this.props;
        const { getFieldProps } = this.props.form;

        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20},
        };
        return (
            <Modal title="重命名文件(夹)" visible={visible}
                   confirmLoading={pending}
                   onOk={this.onOk.bind(this)}
                   onCancel={this.onCancle.bind(this)}>
                <Form horizontal form={this.props.form}>
                    <FormItem
                        label="原始文件(夹)："
                        {...formItemLayout}>
                        <p className="ant-form-text" id="static" name="static">{directory}</p>

                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="新文件(夹)名："
                        help="请输入完整的目标文件(夹)路径,可做移动文件(夹)使用">
                        <Input type="text" autoComplete="off" {...getFieldProps('newDirectoryName', {initialValue:directory})} />
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

RenameDirectorydModal.propTypes = {
    visible: PropTypes.bool.isRequired,//是否显示对话框
    renameDirectoryOk: PropTypes.func.isRequired,//点击确定或者关闭将调用此函数
    directory: PropTypes.string.isRequired,//要删除的目录

};
RenameDirectorydModal.defaultProps = {};

export default createForm()(RenameDirectorydModal);
