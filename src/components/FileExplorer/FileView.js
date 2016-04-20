/**
 * Created by liu_k on 2016/4/20.
 * 显示具体文件内容的视图
 */

import React, { Component,PropTypes } from 'react';
import { Icon,Table } from 'antd';
class FileView extends Component {


    render() {
        const {filesData} = this.props;
        return (
            <div>
                <div>status</div>
                <div style={{width:'80%',float:'right'}}>{filesData.data && filesData.data.FileContent.content}</div>
            </div>
        )
    }
}
FileView.propTypes = {
    filesData: PropTypes.shape({
        pending:PropTypes.bool.isRequired,
        currentPath: PropTypes.string.isRequired,//当前路径
        data: PropTypes.object//当前文件的数据
    }).isRequired,

    /**
     * 根据当前路径从服务器端获取数据，有可能获取的是文件夹的数据，也有可能是具体某个文件的数据
     */
    getFilesData: PropTypes.func.isRequired
};
FileView.defaultProps = {};

export default FileView;