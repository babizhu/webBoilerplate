/**
 * Created by liukun on 16/4/17.
 * hadoop文件浏览器的导航条
 */


import React, { Component,PropTypes } from 'react';
import { Icon } from 'antd';

class Navigate extends Component {

    changePathClick(path) {
        const {showFileList} = this.props;
        //console.log( path );
        showFileList(path);
    }

    buildPath(currentPath) {
        //   /input/badage/log
        //console.log('currentPath=' + currentPath);
        let result;
        let tempPath = '/';
        const pathArr = currentPath.substring(1).split('/');
        result = pathArr.map((item, index)=> {
                const pathName = item.length === 0 ? '/' : item;
                tempPath += item + '/';
                //console.log('tempPath=' + tempPath.substring(0, tempPath.length - 1));
                return <span onClick={this.changePathClick.bind(this,tempPath.substring(0,tempPath.length-1))}
                             className='navigate' key={index}>{pathName} / </span>
            }
        );
        //console.log(result);
        return <span><span onClick={this.changePathClick.bind(this,'/')} className='navigate' key='/'> / </span>{result}</span>;
    }

    constructor() {
        super();
        this.state = {}
    }

    render() {

        const {currentPath} = this.props.fileList;


        return (
            <div style={{background:'#f6a69a', padding:'10px', color:'white', fontSize:'12px'}}>
                hadoop: {this.buildPath(currentPath)} </div>
        );
    }
}


Navigate
    .propTypes = {
    fileList: PropTypes.object.isRequired

};
Navigate
    .defaultProps = {};

export
default
Navigate;