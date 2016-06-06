/**
 * Created by liukun on 16/4/25.
 * 删除节点节点
 */

import React, { Component,PropTypes } from 'react';
import ReactDom from "react-dom"
import { Button, Form, Input, Modal,Icon,Switch  } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

class ClusterDelNodeModal extends Component {

    onOk() {
        const {delNodeOk,form,currentNode} = this.props;
        //noinspection JSUnresolvedFunction
        form.validateFields((errors, values) => {
            if (!!errors) {
            } else {
                delNodeOk(null,{id:currentNode.id});
                //noinspection JSUnresolvedFunction

            }
        });
    }

    onCancle() {
        const {delNodeOk} = this.props;
        delNodeOk();

    }
    componentWillReceiveProps(nextProps) {
        const {visible,form} = this.props;

        if (visible && !nextProps.visible) {//对话框由可见变为不可见
            form.resetFields();

        }
    }

    checkName(rule, value, callback) {
        //const {delDirectoryOk,form} = this.props;
        const {currentNode} = this.props;
        if (value && value !== currentNode.host) {
            callback('未输入正确的节点名称！');
        } else {
            callback();
        }
    }

    render() {
        const {visible,pending,currentNode} = this.props;
        const { getFieldProps } = this.props.form;

        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20}
        };

        const checkName = getFieldProps('host', {
            rules: [{
                required: true,
                whitespace: true,
                message: '请输入要删除的节点名称'
            }, {
                validator: this.checkName.bind(this)
            }]
        });
        const redTitle = <span className='dangerText'>危险操作：</span>;
        return (
            <Modal title="删除节点" visible={visible}
                   confirmLoading={pending}
                   onOk={this.onOk.bind(this)}
                   onCancel={this.onCancle.bind(this)}>
                <Form horizontal form={this.props.form}>
                    <FormItem
                        label="删除："
                        {...formItemLayout}>
                        <p className="ant-form-text" id="static" name="static">{currentNode.host}</p>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={redTitle}
                    >
                        <Input {...checkName}
                            autoFocus="autoFocus"
                            ref='name'
                            type="text" autoComplete="off"
                            placeholder="请输入要删除节点的名称，以免误操作"/>
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

ClusterDelNodeModal.propTypes = {
    visible: PropTypes.bool.isRequired,//是否显示对话框
    delNodeOk: PropTypes.func.isRequired,//点击关闭将调用此函数
    currentNode: PropTypes.object.isRequired//要删除的节点节点
};
ClusterDelNodeModal.defaultProps = {};

export default createForm()(ClusterDelNodeModal);
