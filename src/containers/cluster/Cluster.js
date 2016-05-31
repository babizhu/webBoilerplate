import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import {AnimEnhance} from './../AnimEnhance'
import ClusterList from '../../components/Cluster/ClusterList'
import * as clusterActions from '../../actions/Cluster'
import '../../css/cluster.scss'

class Cluster extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        if (this.props.clustersInfo.clusterList.data.length == 0)
            this.props.getClustersList();
    }

    render() {

        //const clusterList = this.props.cluster.clusterList;
        const { children } = this.props;
        const {clusterList,operationData} = this.props.clustersInfo;
        const {openClusterModal,clusterListOperation,getClustersList} = this.props;

        return (
            <div className="cluster">
                {children||
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
        clustersInfo: state.clustersInfo
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
