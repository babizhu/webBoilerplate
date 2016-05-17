/**
 * Created by liukun on 16/4/25.
 * 上传组件
 */

import React, { Component,PropTypes } from 'react';
import ReactDom from "react-dom"
import { Button, Form, Input, Modal,Icon,Switch  } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

class DelClusterModal extends Component {

    onOk() {
        const {delClusterOk,form,currentCluster} = this.props;
        //noinspection JSUnresolvedFunction
        form.validateFields((errors, values) => {
            if (!!errors) {
            } else {
                delClusterOk(null,{id:currentCluster.id});
                //noinspection JSUnresolvedFunction

            }
        });
    }

    onCancle() {
        const {delClusterOk,form} = this.props;
        delClusterOk();

    }
    componentWillReceiveProps(nextProps) {
        const {visible,form} = this.props;

        if (visible && !nextProps.visible) {//对话框由可见变为不可见
            form.resetFields();

        }
    }
    componentDidUpdate() {

        //const el1 = ReactDom.findDOMNode(this.refs.name).focus();
        //const dom = this.refs.name.focus();
        //console.log('dom=' + dom);
        //if (dom) {
        //    //dom.focus();
        //    //inputDom.select();
        //}
    }

    checkName(rule, value, callback) {
        //const {delDirectoryOk,form} = this.props;
        const {currentCluster} = this.props;
        if (value && value !== currentCluster.name) {
            callback('未输入正确的集群名称！');
        } else {
            callback();
        }
    }

    render() {
        const {visible,pending,currentCluster} = this.props;
        const { getFieldProps } = this.props.form;

        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20}
        };

        const checkName = getFieldProps('reDirectory', {
            rules: [{
                required: true,
                whitespace: true,
                message: '请输入要删除的集群名称'
            }, {
                validator: this.checkName.bind(this)
            }]
        });
        const redTitle = <span className='dangerText'>危险操作：</span>;
        return (
            <Modal title="删除集群" visible={visible}
                   confirmLoading={pending}
                   onOk={this.onOk.bind(this)}
                   onCancel={this.onCancle.bind(this)}>
                <Form horizontal form={this.props.form}>
                    <FormItem
                        label="删除："
                        {...formItemLayout}>
                        <p className="ant-form-text" id="static" name="static">{currentCluster.name}</p>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={redTitle}
                    >
                        <Input {...checkName}
                            autoFocus="autoFocus"
                            ref='name'
                            type="text" autoComplete="off"
                            placeholder="请输入要删除集群的名称，以免误操作"/>
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

DelClusterModal.propTypes = {
    visible: PropTypes.bool.isRequired,//是否显示对话框
    delClusterOk: PropTypes.func.isRequired,//点击关闭将调用此函数
    currentCluster: PropTypes.object.isRequired//要删除的集群
};
DelClusterModal.defaultProps = {};

export default createForm()(DelClusterModal);
