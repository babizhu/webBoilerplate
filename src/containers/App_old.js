/**
 * 有些用于测试的功能小例子，保存使用
 * 包括组件如何获取url的相关信息，也就是history中browserHistory的用法
 * 如何使用ant design的form组件
 * 如何在connect的第二个参数放入多个actions
 */
import React, { Component, PropTypes } from 'react'
import {findDOMNode} from 'react-dom';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';

import { Button,Form, Input, Select, Checkbox, Radio ,Row,Col} from 'antd';
const FormItem = Form.Item;

import Header from './Header';
import SideBar from './SideBar';
import * as profileActions from '../actions/Profile';
import * as screenActions from '../actions/Screen';

import 'antd/lib/index.css';
/**
 * 程序的实际入口
 */

class App extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        window.addEventListener('resize', this._resize_mixin_callback.bind(this));
        this._resize_mixin_callback();

        const { url } = this.props;
        let newUrl = url;
        if (url.substr(0, 1) != "/") {
            newUrl = "/" + url;
        }

        this.props.form.setFieldsValue({'url': newUrl});
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._resize_mixin_callback.bind(this));
    }

    /**
     * 实时告知各组件，当前屏幕的宽度
     * 出于性能考虑,只有当前的状态和之前的状态不一样,才重新设置模式
     * @private
     */
    _resize_mixin_callback() {
        const {screen} = this.props;
        const screenWidth = document.documentElement.clientWidth;
        let isBigScreen = screenWidth > 768 ? true : false;


        if (isBigScreen != screen.isBigScreen) {
            const {changeScreenType} = this.props.screenActions;
            changeScreenType(isBigScreen);
            //this.setState({miniMode: this.currentModeIsMini});
            //alert('屏幕状态发生改变了');

        }
    }

    handleSubmit() {
        const {state} = this.props;
        const {editName} = this.props.profileActions;


        for (let x in this.props) {
            console.log(x);
        }
        if (state.profile.name !== "刘老爷") {
            editName('刘老爷');
        }
        else {
            editName('刘大老爷');

        }
        const data = this.props.form.getFieldsValue();

        browserHistory.push(data.url);


    }

    componentWillReceiveProps(nextProps) {
        if (this.props.url !== nextProps.url) {
            let newUrl = nextProps.url;
            if (newUrl.substr(0, 1) != "/") {
                newUrl = "/" + newUrl;
            }
            this.props.form.setFieldsValue({'url': newUrl});
        }
    }

    handleChange(event) {
        alert(event.target.value)
        this.props.url = event.target.value;
        console.log(event.target.value);
    }

    render() {


        const { children, url,name,dispatch } = this.props;
        const { getFieldProps } = this.props.form;


        return (
            <div>
                <Header />
                <SideBar />
                <Form inline>
                    <FormItem label='输入网址：'>
                        <Input placeholder='/' {...getFieldProps('url')} />
                    </FormItem>


                    <Button type='primary' htmlType='submit' onClick={this.handleSubmit.bind(this)}>手动跳转</Button>


                </Form>
                <br /><br /><br />
                <h1>导航</h1>
                当前url: {url}<br />
                当前查询:{name}
                <hr />
                <Link to={`/c`}>
                    前往c
                </Link>
                {children}
            </div>
        )
    }
}
App = Form.create()(App);

App.propTypes = {
    children: PropTypes.node
};

function mapStateToProps(state, ownProps) {
    return {
        state: state,
        url: ownProps.location.pathname.substring(1),
        name: ownProps.location.query.name,
        screen: state.screen
    }
}

function mapDispatchToProps() {
    return dispatch => ({
        profileActions: bindActionCreators(profileActions, dispatch),
        screenActions: bindActionCreators(screenActions, dispatch)
    });

}

export default connect(mapStateToProps, mapDispatchToProps)(App)
