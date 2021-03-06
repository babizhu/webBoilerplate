/**
 * Created by liukun on 16/4/25.
 * 添加、修改集群数据
 */

import React, { Component,PropTypes } from 'react';
import { Button, Form, Input, Modal,Icon,Checkbox   } from 'antd';
const CheckboxGroup = Checkbox.Group;
const createForm = Form.create;
const FormItem = Form.Item;

class ClusterModal extends Component {

    constructor() {
        super();
        this.newItem = {};
    }

    onOk() {
        const {addOrEditClusterOk,form,currentCluster} = this.props;
        //noinspection JSUnresolvedFunction
        form.validateFields((errors, values) => {
            if (!!errors) {
            } else {
                let cluster =  {...currentCluster,...form.getFieldsValue()};
                if( cluster.service ){
                    cluster.service = cluster.service.join();//把数组转换为逗号分隔的字符串
                }
                //console.log(cluster);
                addOrEditClusterOk(null, cluster);
            }
        });
    }

    onCancle() {
        const {addOrEditClusterOk} = this.props;
        addOrEditClusterOk();
    }

    /**
     * 初始化form的内容，目前看当操作成功后，保留上次的操作内容很没有必要，干脆屏蔽，但不删除，存档
     */
    componentWillReceiveProps(nextProps) {
        const {visible,currentCluster,form} = this.props;
        //if (visible && !nextProps.visible) {//对话框由可见变为不可见
        //    if (this.formIsEdit(currentCluster)) {
        //        form.resetFields();
        //    } else {
        //        this.resetFormError(form);
        //    }
        //} else if (!visible && nextProps.visible) {//对话框由不可见变为可见
        //    if (this.formIsEdit(nextProps.currentCluster)) {
        //        form.resetFields();
        //    }
        //}
        if (visible && !nextProps.visible) {//对话框由可见变为不可见
            form.resetFields();
        }
    }

    /**
     * 用户打开对话框，并尝试提交之后，如果出现某些验证错误，此时用户点击取消关闭窗口
     * 下次打开对话框时，错误提示依然存在，此函数帮助去掉这些错误提示
     * 保持界面美观------暂时不需要了

    resetFormError(form) {
        const forms = ['ip', 'name'];
        for (let f of forms) {
            if (!!form.getFieldError(f)) {
                form.resetFields([f]);
            }
        }
    }*/

    /**
     * 当前对话框是用于新增（false）或者是修改(true)信息
     *
     */
    formIsEdit(currentCluster) {
        //const {currentCluster} = this.props;
        return currentCluster.id !== -1;
    }

    getServiceOptions(){
        return [
            {label: 'Hadoop', value: 'Hadoop'},
            {label: 'HBase', value: 'HBase'},
            {label: 'Storm', value: 'Storm'},
            {label: 'Spark', value: 'Spark'},
            {label: 'Hive', value: 'Hive'},
            {label: 'Flume', value: 'Flume'},
            {label: 'Kafka', value: 'Kafka'},
            {label: 'MapReduce2', value: 'MapReduce2'},
            {label: 'Zookeeper', value: 'Zookeeper'}
        ];
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

        const nameProps = getFieldProps('name', {
            initialValue: currentCluster && currentCluster.name,
            rules: [{
                required: true,
                whitespace: true,
                message: '请输入集群名称'
            }, {
                //validator: this.checkDirectory.bind(this)
            }]
        });
        const serviceProps = getFieldProps('service', {
            initialValue: currentCluster && currentCluster.service &&currentCluster.service.split(',')
        });
        let title = this.formIsEdit(currentCluster)?'编辑集群' : '添加集群';
        return (
            <Modal title={title} visible={visible}
                   confirmLoading={pending}
                   onOk={this.onOk.bind(this)}
                   onCancel={this.onCancle.bind(this)}>
                <Form horizontal form={this.props.form}>
                    <FormItem label='名称：' {...formItemLayout} >
                        <Input {...nameProps} disabled={this.formIsEdit(currentCluster)} />
                    </FormItem>
                    <FormItem
                        label="IP："
                        {...formItemLayout}>
                        <Input {...ipProps}/>
                    </FormItem>
                    <FormItem
                        label="服务："
                        {...formItemLayout} >
                        <CheckboxGroup {...serviceProps } options={this.getServiceOptions()} defaultValue={['Hadoop']}  />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="描述："
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
