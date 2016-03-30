import React, { Component, PropTypes } from 'react'
import {findDOMNode} from 'react-dom';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'

import { Button,Form, Input, Select, Checkbox, Radio ,Row,Col} from 'antd';
const FormItem = Form.Item;

import Header from './Header';
import * as profileActions from '../actions/Profile'

import 'antd/lib/index.css';
/**
 * 程序的实际入口
 */


class App extends Component {
    constructor(props) {
        super(props)

    }

    handleSubmit() {
        const {editName,state} = this.props;
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

    componentDidMount() {
        const { url } = this.props;
        let newUrl = url;
        if (url.substr(0, 1) != "/") {
            newUrl = "/" + url;
        }

        this.props.form.setFieldsValue({'url': newUrl});
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
            <div style={{margin:'15px'}}>
                <Header />
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
        name: ownProps.location.query.name
    }
}

export default connect(mapStateToProps, profileActions)(App)
