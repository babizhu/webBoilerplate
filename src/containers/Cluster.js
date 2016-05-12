import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import {AnimEnhance} from './AnimEnhance'
import ClusterList from '../components/Cluster/ClusterList'
import * as clusterActions from '../actions/Cluster'
import '../css/cluster.scss'

export default class Cluster extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        if (this.props.cluster.clusterData.data.length == 0)
            this.props.getClustersData();
    }

    render() {

        //const clusterData = this.props.cluster.clusterData;
        const {clusterData,operationData} = this.props.cluster;
        const {openModal,operation} = this.props;
        return (
            <div className="cluster">
                <ClusterList
                    clusterData={clusterData}
                    operationData={operationData}
                    openModal={openModal}
                    operation={operation}
                />
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
export default connect(mapStateToProps, clusterActions)(AnimEnhance(Cluster));
