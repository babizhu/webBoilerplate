import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'
import { QueueAnim,Button,Icon,Table } from 'antd';

import Navigate from '../components/FileExplorer/Navigate'
import ViewContainer from '../components/FileExplorer/ViewContainer'
import * as fileExplorerActions from '../actions/FileExplorer';
import '../css/fileExplorer.scss'

export default class FileExplorer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {currentPath} = this.props.filesData;
        if ( currentPath === '' ) {
            this.props.getFilesData('/');
        }
    }


    render() {

        const {filesData,getFilesData} = this.props;
        return (
            <div>
                <QueueAnim animConfig={{ opacity: [1, 0], translateX: [0, 200], scale: [1, 0.5] }}>
                    <div key='c' className="fileExplorer">
                        <QueueAnim component="div"
                                   animConfig={{ opacity: [1, 0], translateY: [0, 30], scale: [1, 0.9] }}>


                            <Navigate filesData={filesData} getFilesData={getFilesData}/>
                            <ViewContainer filesData={filesData} getFilesData={getFilesData}/>
                        </QueueAnim>
                    </div>

                </QueueAnim>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        filesData: state.filesData
    }
}

export default connect(mapStateToProps, fileExplorerActions)(FileExplorer);