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

                    addOrEditClusterOk( currentCluster );


            }
        });
    }

    onCancle() {
        const {addOrEditClusterOk} = this.props;
        addOrEditClusterOk();
    }



    render() {
        const {visible,pending,currentCluster} = this.props;
        const { getFieldProps } = this.props.form;

        const formItemLayout = {
            labelCol: {span: 3},
            wrapperCol: {span: 20}
        };

        let title = '添加集群';
        let nameFiled = <FormItem
            label="名称："
            {...formItemLayout}>
            <Input {...getFieldProps('name')}/>
        </FormItem>;
        if( currentCluster.id != -1 ){
            title = '编辑集群';
            nameFiled = <FormItem
                {...formItemLayout}
                label="名称：">
                <p className="ant-form-text" id="userName" name="userName">{currentCluster.name}</p>
            </FormItem>
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
                        <Input
                            {...getFieldProps('ip',{initialValue:currentCluster&&currentCluster.ip}) }
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="备注："
                        >
                        <Input
                            {...getFieldProps('description',{initialValue:currentCluster&&currentCluster.description}) }
                                type="textarea"
                                placeholder="随便写"
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
