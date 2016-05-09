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
        //noinspection JSUnresolvedFunction
        form.validateFields((errors, values) => {
            if (!!errors) {
            } else {
                delDirectoryOk(null, !!values.recursiveDel);
                //noinspection JSUnresolvedFunction
                form.resetFields();
                values.recursiveDel = false;
            }
        });
    }

    onCancle() {
        const {delDirectoryOk} = this.props;
        delDirectoryOk();
    }

    checkDirectory(value, callback) {
        //const {delDirectoryOk,form} = this.props;
        const {directory} = this.props;

        if (value && value !== directory) {
            callback('未输入正确的文件(夹)名！');
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
                message: '请输入要删除的文件(夹)名称'
            }, {
                validator: this.checkDirectory.bind(this)
            }]
        });
        const redTitle = <span style={{color:'red'}}>危险操作：</span>;
        return (
            <Modal title="删除文件(夹)" visible={visible}
                   confirmLoading={pending}
                   onOk={this.onOk.bind(this)}
                   onCancel={this.onCancle.bind(this)}>
                <Form horizontal form={this.props.form}>
                    <FormItem
                        label="删除："
                        {...formItemLayout}>
                        <p className="ant-form-text" id="static" name="static">{directory}</p>

                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={redTitle}
                    >
                        <Input {...rePassProps}
                            type="text" autoComplete="off"
                            placeholder="请输入< 完整 >路径，以免误操作"/>
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
    directory: PropTypes.string.isRequired//要删除的文件(夹)
};
DelDirectorydModal.defaultProps = {};

export default createForm()(DelDirectorydModal);
