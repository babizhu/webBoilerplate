/**
 * Created by liu_k on 2016/4/20.
 * 显示具体文件内容的视图
 */

import React, { Component,PropTypes } from 'react';
import { Icon,Table,Spin,Popconfirm,Pagination } from 'antd';

import {formatFileSize} from '../../utils/index';
import {formatTime} from '../../utils/time';
import {decode64,utf8to16} from '../../utils/base64'
import {HADOOP_DOWNLOAD_URL} from '../../conf/config'

class FileView extends Component {

    constructor() {
        super();
    }

    /**
     * 切换当前的文件查看模式:二进制或者文本模式
     */
    changeFileViewMode() {
        const {getFilesData,fileSystemData} = this.props;
        getFilesData(fileSystemData.currentPath, !fileSystemData.readAsText);
    }

    displayFileContent(res) {
        const {readAsText} = this.props.fileSystemData;
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
        const {currentPath} = this.props.fileSystemData;
        const url = HADOOP_DOWNLOAD_URL.replace('%s',currentPath);
        window.open(url)
    }
    render() {
        const {fileSystemData} = this.props;
        const {fileStatus} = fileSystemData.data;
        return (
            <div className='fileView'>
                <div className='fileStatus'>
                    <div className='infoHeader'>操作</div>
                    <div className='cluster-description'>
                        <div className='value canClick' onClick={this.changeFileViewMode.bind(this)}>
                            <Icon type="edit"/>
                            {fileSystemData.readAsText ? ' 以二进制格式查看' : ' 以文本方式查看'}
                        </div>
                        <div className='value  canClick'>
                            { fileStatus.length < 1024 * 1024 * 10 * 10 ?
                                <Popconfirm title="确定要下载这个文件吗，文件太大有可能导致服务器死机？"
                                            onConfirm={this.download.bind(this)}
                                >
                                    <a href="#"><Icon type="file"/> 下载此文件（小于100M）</a>
                                </Popconfirm>
                                :
                                <Popconfirm title="文件大小超过100M，不提供下载服务" >
                                    <a href="#"><Icon type="file"/> 下载此文件（小于100M）</a>
                                </Popconfirm>}
                        </div>
                    </div>
                    <div className='infoHeader'>信息</div>
                    <div className='cluster-description'>
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

                    <Spin spining={fileSystemData.pending}>{this.displayFileContent(fileSystemData.data)}</Spin>
                </div>
            </div>
        )
    }
}
FileView.propTypes = {
    fileSystemData: PropTypes.shape({
        pending: PropTypes.bool.isRequired,
        currentPath: PropTypes.string.isRequired,//当前路径
        data: PropTypes.object//当前文件的数据
    }).isRequired,

    getFilesData: PropTypes.func.isRequired
};
FileView.defaultProps = {};

export default FileView;