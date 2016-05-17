import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import {AnimEnhance} from './AnimEnhance'


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
                test
                {this.props.params.name}
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
