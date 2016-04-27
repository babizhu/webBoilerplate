import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'
import { QueueAnim,Button,DatePicker,Table } from 'antd';
import {AnimContainer} from './AnimContainer'


export default class Cluster extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const dataSource = [{
            key: '1',
            name: '北京机房',
            ip: '192.168.1.81',
            address: '西湖区湖底公园1号'
        }, {
            key: '2',
            name: '两路机房',
            ip: '192.168.1.31',
            address: '西湖区湖底公园1号'
        }, {
            key: '3',
            name: '龙湖机房',
            ip: '192.168.1.31',
            address: '西湖区湖底公园1号'
        }, {
            key: '4',
            name: '两路机房',
            ip: '192.168.1.31',
            address: '西湖区湖底公园1号'
        }, {
            key: '5',
            name: '龙湖机房',
            ip: '192.168.1.31',
            address: '西湖区湖底公园1号'
        }, {
            key: '6',
            name: '两路机房',
            ip: '192.168.1.31',
            address: '西湖区湖底公园1号'
        }, {
            key: '7',
            name: '龙湖机房',
            ip: '192.168.1.31',
            address: '西湖区湖底公园1号'
        }, {
            key: '8',
            name: '两路机房',
            ip: '192.168.1.31',
            address: '西湖区湖底公园1号'
        }];

        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: 'IP地址',
            dataIndex: 'ip',
            key: 'ip'
        }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address'
        }];
        return (


            <Table dataSource={dataSource} columns={columns} size="middle"/>

        )
    }
}
export default AnimContainer(Cluster);