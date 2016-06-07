import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { message } from 'antd';
import { bindActionCreators } from 'redux';

import Navigate from '../components/HadoopFile/Navigate'
import ViewContainer from '../components/HadoopFile/ViewContainer'
import {AnimEnhance} from './AnimEnhance'
import * as fileExplorerActions from '../actions/HadoopFile';
import * as appActions from '../actions/App';

import '../css/hadoopFile.scss'

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

    componentWillReceiveProps(nextProps) {
        if (this.props.hadoopFile.operationData.pending === true && nextProps.hadoopFile.operationData.pending === false) {
            if (nextProps.hadoopFile.operationData.error === null) {
                message.success('操作成功。',6);

                if( !this.props.hadoopFile.fileSystemData.currentPathIsFile ) {
                    //console.log('应该刷新整个界面?,当前目录 ' + this.props.hadoopFile.fileSystemData.currentPath);
                    this.props.fileExplorerActions.getFilesData(this.props.hadoopFile.fileSystemData.currentPath)
                }
            }
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
                          operation={fileExplorerActions.hadoopOperation}
                          openModal={fileExplorerActions.openHadoopModal}
                />

                <ViewContainer fileSystemData={hadoopFile.fileSystemData}
                               getFilesData={fileExplorerActions.getFilesData}
                               operationData={hadoopFile.operationData}
                               operation={fileExplorerActions.hadoopOperation}
                               openModal={fileExplorerActions.openHadoopModal}
                />
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