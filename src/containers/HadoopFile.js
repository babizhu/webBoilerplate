import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd';
import { bindActionCreators } from 'redux';

import Navigate from '../components/HadoopFile/Navigate'
import ViewContainer from '../components/HadoopFile/ViewContainer'
import {AnimEnhance} from './AnimEnhance'
import * as fileExplorerActions from '../actions/HadoopFile';
import * as appActions from '../actions/App';

import '../css/fileExplorer.scss'

export default class HadoopFile extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {currentPath} = this.props.hadoopFile.fileSystemData;
        if (currentPath === '') {
            this.props.fileExplorerActions.getFilesData('/');

        }
    }


    render() {

        const {hadoopFile,fileExplorerActions,appActions} = this.props;
        return (

            <div className="fileExplorer">
                <Navigate fileSystemData={hadoopFile.fileSystemData}
                          operationData={hadoopFile.operationData}
                          showErrMsg={appActions.showErrMsg}
                          getFilesData={fileExplorerActions.getFilesData}
                          operation={fileExplorerActions.operation}
                          openModal={fileExplorerActions.openModal}
                />

                <ViewContainer fileSystemData={hadoopFile.fileSystemData}
                               getFilesData={fileExplorerActions.getFilesData}
                               operationData={hadoopFile.operationData}
                               operation={fileExplorerActions.operation}/>
                </div>

        )
    }
}
function mapStateToProps(state) {
    return {
        hadoopFile: state.hadoopFile
    }
}
function mapDispatchToProps() {
    return dispatch => ({
        fileExplorerActions: bindActionCreators(fileExplorerActions, dispatch),
        appActions: bindActionCreators(appActions, dispatch)
    });

}

export default connect(mapStateToProps, mapDispatchToProps)(AnimEnhance(HadoopFile));