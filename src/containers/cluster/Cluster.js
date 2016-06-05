import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {Spin } from 'antd';

import {AnimEnhance} from './../AnimEnhance'
import ClusterList from '../../components/Cluster/ClusterList'
import * as clusterActions from '../../actions/Cluster'
import '../../css/cluster.scss'

class Cluster extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        //const clusterList = this.props.cluster.clusterList;
        const { children,openClusterModal,clusterListOperation,getClustersList } = this.props;
        const {clusterList,operationData } = this.props.clusters;

        return (
            <div className="cluster">
                {children ||
                <ClusterList
                    clusterList={clusterList}
                    operationData={operationData}
                    openModal={openClusterModal}
                    operation={clusterListOperation}
                    getClustersList={getClustersList}
                />}
            </div>

        )
    }
}
function mapStateToProps(state) {
    return {
        clusters: state.clusters,

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
export default connect(mapStateToProps, clusterActions)(AnimEnhance(Cluster));
