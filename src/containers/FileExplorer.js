import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'
import { QueueAnim,Button,Icon,Table } from 'antd';
import { bindActionCreators } from 'redux';

import Navigate from '../components/FileExplorer/Navigate'
import ViewContainer from '../components/FileExplorer/ViewContainer'
import {AnimEnhance} from './AnimEnhance'
import * as fileExplorerActions from '../actions/FileExplorer';
import * as appActions from '../actions/App';

import '../css/fileExplorer.scss'

export default class FileExplorer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {currentPath} = this.props.filesData;
        if (currentPath === '') {
            this.props.fileExplorerActions.getFilesData('/');

        }
    }


    render() {

        const {filesData,fileExplorerActions,appActions} = this.props;
        return (

            <div className="fileExplorer">

                        <Navigate filesData={filesData}
                                  showErrMsg={appActions.showErrMsg}
                                  getFilesData={fileExplorerActions.getFilesData}
                                  operation={fileExplorerActions.operation}/>

                />
                        <ViewContainer filesData={filesData}
                                       getFilesData={fileExplorerActions.getFilesData}
                                       operation={fileExplorerActions.operation}/>
                </div>

        )
    }
}
function mapStateToProps(state) {
    return {

        filesData: state.filesData
    }
}
function mapDispatchToProps() {
    return dispatch => ({
        fileExplorerActions: bindActionCreators(fileExplorerActions, dispatch),
        appActions: bindActionCreators(appActions, dispatch)
    });

}

export default connect(mapStateToProps, mapDispatchToProps)(AnimEnhance(FileExplorer));