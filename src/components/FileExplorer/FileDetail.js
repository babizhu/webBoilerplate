/**
 * Created by liukun on 16/4/19.
 * 显示文件详情
 */
import React, { Component,PropTypes } from 'react';
import { Icon,Table } from 'antd';
class FileDetail extends Component {


    render() {
        return (
            <div>
                <div>status</div>
                <div style={{width:'80%'}}>content</div>
            </div>
        )
    }
}


FileDetail.propTypes = {};
FileDetail.defaultProps = {};

export default FileDetail;