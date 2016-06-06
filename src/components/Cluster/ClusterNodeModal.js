/**
 * Created by liukun on 16/4/25.
 * 添加、修改节点数据
 */

import React, { Component,PropTypes } from 'react';
import { Button, Form, Input, Modal,Icon,Checkbox   } from 'antd';
const CheckboxGroup = Checkbox.Group;
const createForm = Form.create;
const FormItem = Form.Item;

class ClusterNodeModal extends Component {

    constructor() {
        super();
        this.newItem = {};
    }

    onOk() {
        const {addOrEditNodeOk,form,currentNode} = this.props;
        //noinspection JSUnresolvedFunction
        form.validateFields((errors, values) => {
            if (!!errors) {
            } else {
                let node =  {...currentNode,...form.getFieldsValue()};
                if( node.service ){
                    node.service = node.service.join();//把数组转换为逗号分隔的字符串
                }
                //console.log(node);
                addOrEditNodeOk(null, node);
            }
        });
    }

    onCancle() {
        const {addOrEditNodeOk} = this.props;
        addOrEditNodeOk();
    }

    componentWillReceiveProps(nextProps) {
        const {visible,form} = this.props;

        if (visible && !nextProps.visible) {//对话框由可见变为不可见
            form.resetFields();
        }
    }
    /**
     * 当前对话框是用于新增（false）或者是修改(true)信息
     *
     */
    formIsEdit(currentNode) {
        return currentNode.id !== -1;
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
        const {visible,pending,currentNode} = this.props;
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 3},
            wrapperCol: {span: 20}
        };
        const ipProps = getFieldProps('ip', {
            initialValue: currentNode && currentNode.ip,
            rules: [{
                required: true,
                whitespace: true,
                message: '请输入IP地址'
            }, {
                //validator: this.checkDirectory.bind(this)
            }]
        });

        const hostProps = getFieldProps('host', {
            initialValue: currentNode && currentNode.host,
            rules: [{
                required: true,
                whitespace: true,
                message: '请输入节点名称'
            }, {
                //validator: this.checkDirectory.bind(this)
            }]
        });
        const serviceProps = getFieldProps('service', {
            initialValue: currentNode && currentNode.service &&currentNode.service.split(',')
        });

        let title = this.formIsEdit(currentNode)?'编辑节点' : '添加节点';


        return (
            <Modal title={title} visible={visible}
                   confirmLoading={pending}
                   onOk={this.onOk.bind(this)}
                   onCancel={this.onCancle.bind(this)}>
                <Form horizontal form={this.props.form}>
                    <FormItem label='Host：' {...formItemLayout} >
                        <Input {...hostProps} disabled={this.formIsEdit(currentNode)} />
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
                            {...getFieldProps('description', {initialValue: currentNode && currentNode.description}) }
                            type="textarea"
                            placeholder="请详细注明此节点的用途"
                        />
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

ClusterNodeModal.propTypes = {
    visible: PropTypes.bool.isRequired,//是否显示对话框
    addOrEditNodeOk: PropTypes.func.isRequired,//点击关闭将调用此函数
    currentNode: PropTypes.object.isRequired//要删除的节点
};
ClusterNodeModal.defaultProps = {};

export default createForm()(ClusterNodeModal);
