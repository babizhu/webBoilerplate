import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'
import { Card, Col, Row } from 'antd';

import {AnimEnhance} from './AnimEnhance'

import '../css/dashboard.scss'
class DashBoard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        //<Card>
        //    <div className="header">
        //        <div className='title'>我的任务</div>
        //        <div className='menu'>我的任务</div>
        //        <div className='content'>内容</div>
        //
        //    </div>
        //
        //</Card>
        return (
            <div className='dashboard'>


                <div className="gutter-example">
                    <Row gutter={16}>
                        <Col span="8">
                            <Card title="我的任务" bordered={true}>

                            </Card>
                        </Col>
                        <Col span="8">
                            <Card title="卡片标题" bordered={true}>卡片的内容</Card>
                        </Col>
                        <Col span="8">
                            <Card title="卡片标题" bordered={true}>卡片的内容</Card>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span="24">
                            <div style={{height:'30px'}}></div>
                        </Col>

                    </Row>
                    <Row gutter={16}>
                        <Col span="8">

                            <Card title="我的任务" bordered={true}>卡片的内容</Card>
                        </Col>
                        <Col span="8">
                            <Card title="卡片标题" bordered={true}>卡片的内容</Card>
                        </Col>
                        <Col span="8">
                            <Card title="卡片标题" bordered={true}>卡片的内容</Card>
                        </Col>
                    </Row>
                </div>

                
            </div>
        )
    }
}



export default AnimEnhance(DashBoard);