/**
 * Created by liu_k on 2016/4/8.
 * 用于测试的目的
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'
import { Button,QueueAnim,Upload,Icon } from 'antd';
import Animate from 'rc-animate';
import {AnimEnhance} from './AnimEnhance'

const Dragger = Upload.Dragger;

class Box extends Component {

    render() {
        console.log('render', this.props.visible);
        const style = {
            display: this.props.visible ? 'block' : 'none',
            marginTop: '20px',
            width: '200px',
            height: '200px',
            backgroundColor: 'red'
        };
        return (<div style={style}></div>);
    }

}
class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {visible: 1,
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'http://www.baidu.com/xxx.png'
            }]
        };
    }

    toggleAnimate() {
        this.setState({
            visible: !this.state.visible
        });
    }

    static onAppear(key) {
        console.log('appear', key);
    }

    static onEnter(key) {
        console.log('enter', key);
    }

    static onLeave(key) {
        console.log('leave', key);
    }

    click() {
        alert('test');
    }

    handleChange(info) {
        //let fileList = info.fileList;
        //
        //// 1. 上传列表数量的限制
        ////    只显示最近上传的一个，旧的会被新的顶掉
        //fileList = fileList.slice(-2);
        //
        //// 2. 读取远程路径并显示链接
        //fileList = fileList.map((file) => {
        //    if (file.response) {
        //        // 组件会将 file.url 作为链接进行展示
        //        file.url = file.response.url;
        //    }
        //    return file;
        //});
        //
        //// 3. 按照服务器返回信息筛选成功上传的文件
        //fileList = fileList.filter((file) => {
        //    if (file.response) {
        //        return file.response.status === 'success';
        //    }
        //    return true;
        //});
        let fileList = this.state.fileList;

        this.setState({ fileList });
    }

    render() {

        //const props = {
        //    name: 'file',
        //    showUploadList: false,
        //    onChange: this.handleChange,
        //    multiple: true,
        //    action: 'http://localhost:8080/api/hadoop/upload'
        //};

        const props = {
            action: '/upload.do',
            //listType: 'picture',
            defaultFileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
            }, {
                uid: -2,
                name: 'yyy.png',
                status: 'done',
                url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
            }]
        };
        return (

            <div>
                <QueueAnim>
                    <div key="b">
                        <QueueAnim component="ul">
                            <li key="0">11111111</li>
                            <li key="1">2222222222</li>
                            <li key="2">3333333333</li>
                        </QueueAnim>
                    </div>
                    <div>
                        <QueueAnim delay={200}>
                            <div key="title3"></div>
                            <QueueAnim component="ul"
                                       animConfig={{ opacity: [1, 0], translateY: [0, 30], scale: [1, 0.9] }} key="ul">
                                <li key="0">444444444444</li>
                                <li key="1">55555555555555</li>
                                <li key="2">66666666666</li>
                            </QueueAnim>
                            <div style={{background:'lightblue'}}>
                                <div style={{background:'lightgreen',width:'80%'}}>left</div>
                                <div style={{background:'lightpink', float:'right' ,position:''}}><span onClick={this.click.bind(this)}>right</span></div>
                            </div>
                        </QueueAnim>
                    </div>
                    <div>
                        <button onClick={this.toggleAnimate.bind(this)}>toggle</button>
                        <Animate
                            component=""
                            showProp="visible"
                            onAppear={this.onAppear}
                            onEnter={this.onEnter}
                            onLeave={this.onLeave}
                            transitionAppear
                            transitionName="fade">
                            <Box visible={this.state.visible}/>
                        </Animate>
                    </div>


                </QueueAnim>


                <Dragger {...props} className="upload-list-inline"><p className="ant-upload-drag-icon">
                    <Icon type="inbox"/>
                </p>
                    <p className="ant-upload-text">点击或将文件拖拽到此区域上传</p>
                    <p className="ant-upload-hint">支持单个或批量上传，请注意信息安全</p>
                </Dragger>
            </div>


        )
    }
}


export default AnimEnhance(Test)