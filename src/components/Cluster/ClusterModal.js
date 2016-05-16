/**
 * Created by liukun on 16/4/25.
 * 上传组件
 */

import React, { Component,PropTypes } from 'react';
import { Button, Form, Input, Modal,Icon,Switch  } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

class ClusterModal extends Component {

    onOk() {
        const {addOrEditClusterOk,form,currentCluster} = this.props;
        //noinspection JSUnresolvedFunction
        form.validateFields((errors, values) => {
            if (!!errors) {
            } else {
                addOrEditClusterOk(currentCluster);

            }
        });
    }

    onCancle() {
        const {addOrEditClusterOk,form} = this.props;
        //form.resetFields();
        addOrEditClusterOk();
        //form.resetFields();
        //this.resetFormError(form)
    }

    /**
     * 初始化form的内容
     */
    componentWillReceiveProps (nextProps) {
        const {visible,currentCluster,form} = this.props;
        if( visible && !nextProps.visible){//对话框由可见变为不可见
            if (this.formIsEdit(currentCluster)) {
                form.resetFields();
            } else {
                this.resetFormError(form);
            }
        }else if( !visible && nextProps.visible ){//对话框由不可见变为可见
            if (this.formIsEdit( nextProps.currentCluster)) {
                form.resetFields();
            }
        }
        //if (visible === false) {
        //    if (!this.formIsEdit()) {
        //        this.resetFormError(form)
        //    } else {
        //        form.resetFields();
        //    }
        //}else if(nextProps.visible){
        //    if (!this.formIsEdit()){
        //        form.resetFields();
        //    }
        //}
        //form.setFieldsValue({ip: currentCluster.ip, name: currentCluster.name});
        //console.log('componentDidMount!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1');

    }

    /**
     * 用户打开对话框，并尝试提交之后，如果出现某些验证错误，此时用户点击取消关闭窗口
     * 下次打开对话框时，错误提示依然存在，此函数帮助去掉这些错误提示
     * 保持界面美观
     */
    resetFormError(form) {
        const forms = ['ip', 'name'];
        for (let f of forms) {
            if (!!form.getFieldError(f)) {
                form.resetFields([f]);
            }
        }
    }

    /**
     * 当前对话框是用于新增（false）或者是修改(true)信息
     *
     */
    formIsEdit(currentCluster) {
        //const {currentCluster} = this.props;
        return currentCluster.id !== -1;
    }

    render() {
        const {visible,pending,currentCluster} = this.props;
        const { getFieldProps } = this.props.form;

        const formItemLayout = {
            labelCol: {span: 3},
            wrapperCol: {span: 20}
        };
        const ipProps = getFieldProps('ip', {
            initialValue: currentCluster && currentCluster.ip,
            rules: [{
                required: true,
                whitespace: true,
                message: '请输入IP地址'
            }, {
                //validator: this.checkDirectory.bind(this)
            }]
        });

        let title = '编辑集群';
        let nameFiled = <FormItem
            {...formItemLayout}
            label="名称：">
            <p className="ant-form-text" id="clusterName" name="clusterName">{currentCluster.name}</p>
        </FormItem>

        if (currentCluster.id == -1) {
            title = '添加集群';
            const nameProps = getFieldProps('name', {
                rules: [{
                    required: true,
                    whitespace: true,
                    message: '请输入集群名称'
                }, {
                    //validator: this.checkDirectory.bind(this)
                }]
            });
            nameFiled = <FormItem label='名称：' {...formItemLayout} >
                <Input {...nameProps}  />
            </FormItem>;
        }

        return (
            <Modal title={title} visible={visible}
                   confirmLoading={pending}
                   onOk={this.onOk.bind(this)}
                   onCancel={this.onCancle.bind(this)}>
                <Form horizontal form={this.props.form}>
                    {nameFiled}
                    <FormItem
                        label="IP："
                        {...formItemLayout}>
                        <Input {...ipProps}/>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="备注："
                    >
                        <Input
                            {...getFieldProps('description', {initialValue: currentCluster && currentCluster.description}) }
                            type="textarea"
                            placeholder="请详细注明此集群的用途"
                        />
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

ClusterModal.propTypes = {
    visible: PropTypes.bool.isRequired,//是否显示对话框
    addOrEditClusterOk: PropTypes.func.isRequired,//点击关闭将调用此函数
    currentCluster: PropTypes.object.isRequired//要删除的集群
};
ClusterModal.defaultProps = {};

export default createForm()(ClusterModal);
