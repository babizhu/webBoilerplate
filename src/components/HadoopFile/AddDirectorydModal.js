/**
 * Created by liukun on 16/4/25.
 * 上传组件
 */

import React, { Component,PropTypes } from 'react';
import { Button, Form, Input, Modal,Icon } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

class AddDirectorydModal extends Component {

    onOk(){
        const {addDirectoryOk,form} = this.props;
        const directorName = form.getFieldValue('directorName');
        form.resetFields();
        addDirectoryOk( directorName );
    }
    onCancle(){
        const {addDirectoryOk} = this.props;
        addDirectoryOk();
    }
    render() {
        const {visible,pending} = this.props;
        const { getFieldProps } = this.props.form;

        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20},
        };
        //const title = <span><Icon type="plus-circle-o"/> 新建文件夹</span>

        return (
            <Modal title="新建文件夹" visible={visible}
                   confirmLoading={pending}
                   onOk={this.onOk.bind(this)}
                   onCancel={this.onCancle.bind(this)}>
                <Form horizontal form={this.props.form}>
                    <FormItem
                        {...formItemLayout}
                        label="新文件夹名：">
                        <Input {...getFieldProps('directorName', {})} type="text" autoComplete="off"/>
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

AddDirectorydModal.propTypes = {
    visible: PropTypes.bool.isRequired,//是否显示对话框
    addDirectoryOk: PropTypes.func.isRequired//点击关闭将调用此函数
};
AddDirectorydModal.defaultProps = {};

export default createForm()(AddDirectorydModal);
