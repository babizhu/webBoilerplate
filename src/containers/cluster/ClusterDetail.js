import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import {AnimEnhance} from './../AnimEnhance'
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import ClusterDashBoard from '../../components/Cluster/ClusterDashBoard'

class ClusterDetail extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

    }

    test(){
        let re = '';
        for(let x in this.props.params ){
            console.log(x)
        }
        return re;
    }
    render() {
        return (
            <div>

                <Tabs defaultActiveKey="1" tabPosition="top">
                    <TabPane tab="集群总览" key="1"><ClusterDashBoard /></TabPane>
                    <TabPane tab="服务状态" key="2">选项卡二内容</TabPane>
                    <TabPane tab="机器列表" key="3">选项卡三内容</TabPane>
                    <TabPane tab="集群日志" key="4">选项卡三内容</TabPane>
                </Tabs>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        cluster: state.cluster
    }
}
//function mapDispatchToProps() {
//    return dispatch => ({
//        fileExplorerActions: bindActionCreators(fileExplorerActions, dispatch),
//        appActions: bindActionCreators(appActions, dispatch)
//    });
//
//}

//export default connect(mapStateToProps, mapDispatchToProps)(AnimEnhance(HadoopFile));
export default connect(mapStateToProps)(AnimEnhance(ClusterDetail));
