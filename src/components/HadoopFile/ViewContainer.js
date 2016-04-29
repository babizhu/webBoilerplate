/**
 * Created by liu_k on 2016/4/20.
 * 根据父层传过来的数据情况，自动切换显示view的模式
 * 显示模式包括：文件模式（FileShow）、文件夹模式（DictionaryShow）
 */
import React, { Component,PropTypes } from 'react';

import DirectoryView from './DirectoryView'
import FileView from './FileView'
import { Icon,Tooltip,Button,Upload,Modal  } from 'antd';

class ViewContainer extends Component {


    render() {
        const props = {
            name: 'file',
            showUploadList: false,
            action: 'http://localhost:8080/api/hadoop/upload'
        };
        const {fileSystemData} = this.props;
        if( fileSystemData.currentPathIsFile ){
            return <FileView {...this.props} />
        }else{
            return <DirectoryView {...this.props} />

        }
    }
}

ViewContainer.propTypes = {
    fileSystemData: PropTypes.shape({
        pending:PropTypes.bool.isRequired,
        currentPath:PropTypes.string.isRequired,//当前路径
        currentPathIsFile: PropTypes.bool.isRequired,//当前路径是否文件
        data: PropTypes.object//当前路径下的内容，有可能是文件夹的数据，也有可能是具体某个文件的数据
    }).isRequired,

    /**
     * 根据当前路径从服务器端获取数据，有可能获取的是文件夹的数据，也有可能是具体某个文件的数据
     */
    getFilesData: PropTypes.func.isRequired,
    operation: PropTypes.func.isRequired
};
ViewContainer.defaultProps = {};

export default ViewContainer;