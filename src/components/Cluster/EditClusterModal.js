/**
 * Created by liukun on 16/4/25.
 * 上传组件
 */

import React, { Component,PropTypes } from 'react';
import { Button, Form, Input, Modal,Icon,Switch  } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

class EditClusterModal extends Component {

    onOk() {
        const {editClusterOk} = this.props;

        editClusterOk(null,{id:currentCluster.id});
    }

    onCancle() {
        const {editClusterOk} = this.props;
        editClusterOk();
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
                            type="text" autoComplete="off"
                            placeholder="请输入要删除集群的名称，以免误操作"/>
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

EditClusterModal.propTypes = {
    visible: PropTypes.bool.isRequired,//是否显示对话框
    editClusterOk: PropTypes.func.isRequired,//点击关闭将调用此函数
    currentCluster: PropTypes.object.isRequired//要修改的集群内容
};
EditClusterModal.defaultProps = {};

export default createForm()(EditClusterModal);
