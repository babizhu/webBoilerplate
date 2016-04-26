/**
 * Created by liu_k on 2016/4/20.
 * 显示具体文件内容的视图
 */

import React, { Component,PropTypes } from 'react';
import { Icon,Table,Spin,Popconfirm,Pagination } from 'antd';

import {formatFileSize} from '../../utils/index';
import {formatTime} from '../../utils/time';

import {decode64,utf8to16} from '../../utils/base64'

class FileView extends Component {

    constructor() {
        super();
        //this.state={readAsText:true};
        //this.readAsText = true;
    }

    changeFileViewMode() {
        const {getFilesData} = this.props;
        const {filesData} = this.props;
        //this.setState({readAsText:!this.state.readAsText});
        //this.readAsText = !this.readAsText;
        getFilesData(filesData.currentPath, !filesData.readAsText);
    }


    displayFileContent(res) {
        const {readAsText} = this.props.filesData;
        if (res && res.fileContent.content) {
            if (readAsText) {
                return <pre>{utf8to16(decode64(res.fileContent.content))}</pre>
            } else {
                let str = res.fileContent.content;
                let index = 1;
                let result = '';
                for (let c of [...str]) {
                    result += c;
                    if (index != 0 && index % 2 == 0) {
                        result += ' ';
                    }

                    index++;
                }
                return <div style={{fontFamily:'courier new, monospace'}}>{result}</div>;
            }
        }
    }

    /**
     * 下载文件
     */
    download() {
        const {currentPath} = this.props.filesData;
        const url = 'http://master:50070/webhdfs/v1' + currentPath + '?op=OPEN';
        //alert(url);
        window.open(url)
    }

    render() {
        const {filesData} = this.props;
        const {fileStatus} = this.props.filesData.data;
        return (
            <div className='fileView'>
                <div className='fileStatus'>
                    <div className='infoHeader'>操作</div>
                    <div className='content'>
                        <div className='value canClick' onClick={this.changeFileViewMode.bind(this)}>
                            <Icon type="edit"/>
                            {filesData.readAsText ? ' 以二进制格式查看' : ' 以文本方式查看'}
                        </div>
                        <div className='value  canClick'>
                            { fileStatus.length < 1024 * 1024 * 10 ?
                                <Popconfirm title="确定要下载这个文件吗，文件太大有可能导致服务器死机？"
                                            onConfirm={this.download.bind(this)}
                                >
                                    <a href="#"><Icon type="file"/> 下载此文件（小于10M）</a>
                                </Popconfirm>
                                :
                                <Popconfirm title="文件大小超过10M，不提供下载服务" >
                                    <a href="#"><Icon type="file"/> 下载此文件（小于10M）</a>
                                </Popconfirm>}
                        </div>
                    </div>
                    <div className='infoHeader'>信息</div>
                    <div className='content'>
                        <div className='name'>文件名</div>
                        <div className='value'>{fileStatus && fileStatus.pathSuffix}</div>
                        <div className='name'>大小</div>
                        <div className='value'>{fileStatus && formatFileSize( fileStatus.length)}</div>
                        <div className='name'>创建时间</div>
                        <div className='value'>{ fileStatus && formatTime(fileStatus.modificationTime)}</div>
                        <div className='name'>用户</div>
                        <div className='value'>{fileStatus && fileStatus.owner}</div>
                        <div className='name'>用户组</div>
                        <div className='value'>{fileStatus && fileStatus.group}</div>
                        <div className='name'>权限</div>
                        <div className='value'>{fileStatus && fileStatus.permission}</div>
                        <div className='name'>备份块</div>
                        <div className='value'>{fileStatus && fileStatus.replication}</div>
                        <div className='name'>块数量</div>
                        <div
                            className='value'>{fileStatus && Math.floor(fileStatus.length / fileStatus.blockSize) + 1}</div>
                        <div className='name'>块大小</div>
                        <div className='value'>{fileStatus  && formatFileSize(fileStatus.blockSize)}</div>
                    </div>
                </div>
                <div className='fileContent'>

                    <Spin spining={filesData.pending}>{this.displayFileContent(filesData.data)}</Spin>
                </div>
            </div>
        )
    }
}
FileView.propTypes = {
    filesData: PropTypes.shape({
        pending: PropTypes.bool.isRequired,
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