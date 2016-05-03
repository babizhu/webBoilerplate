/**
 * Created by liukun on 16/4/25.
 * 上传组件
 */

import React, { Component,PropTypes } from 'react';
import { Button, Form, Input, Modal,Icon,Switch  } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

class DelDirectorydModal extends Component {

    onOk() {
        const {delDirectoryOk,form} = this.props;
        form.validateFields((errors, values) => {
            if (!!errors) {
                return;
            } else {
                delDirectoryOk(null, !!values.recursiveDel);
                form.resetFields();
            }
        });
    }

    onCancle() {
        const {delDirectoryOk} = this.props;
        delDirectoryOk();
    }

    checkDirectory(rule, value, callback) {
        //const {delDirectoryOk,form} = this.props;
        const {directory} = this.props;

        if (value && value !== directory) {
            callback('未输入正确的目录名！');
        } else {
            callback();
        }
    }

    render() {
        const {visible,pending,directory} = this.props;
        const { getFieldProps } = this.props.form;

        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20}
        };

        const rePassProps = getFieldProps('reDirectory', {
            rules: [{
                required: true,
                whitespace: true,
                message: '请输入要删除的目录名称',
            }, {
                validator: this.checkDirectory.bind(this),
            }],
        });
        return (
            <Modal title="删除文件夹" visible={visible}
                   confirmLoading={pending}
                   onOk={this.onOk.bind(this)}
                   onCancel={this.onCancle.bind(this)}>
                <Form horizontal form={this.props.form}>
                    <FormItem
                        label="删除目录："
                        {...formItemLayout}>
                        <p className="ant-form-text" id="static" name="static">{directory}</p>

                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="危险操作：">
                        <Input {...rePassProps}
                            type="text" autoComplete="off"

                            placeholder="请输入要删除的文件名，以避免误操作"/>
                    </FormItem>

                    <FormItem
                        label="递归删除："
                        {...formItemLayout}>
                        <Switch {...getFieldProps('recursiveDel')} />
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

DelDirectorydModal.propTypes = {
    visible: PropTypes.bool.isRequired,//是否显示对话框
    delDirectoryOk: PropTypes.func.isRequired,//点击关闭将调用此函数
    directory: PropTypes.string.isRequired,//要删除的目录
};
DelDirectorydModal.defaultProps = {};

export default createForm()(DelDirectorydModal);
