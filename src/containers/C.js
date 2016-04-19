import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'
import { QueueAnim,Button,DatePicker,Table } from 'antd';


export default class C extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        let header = {
            background: "greenyellow"
            //height: "100px"
        };

        let content = {
            background: "gray"
            //height: "100px"
        };

        const { children } = this.props;
        const dataSource = [{
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
        }, {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
        },{
            key: '3',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
        }, {
            key: '4',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
        },{
            key: '5',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
        }, {
            key: '6',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
        },{
            key: '7',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
        }, {
            key: '8',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
        }];

        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age'
        }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address'
        }];
        return (
            <QueueAnim animConfig={{ opacity: [1, 0], translateX: [0, 200], scale: [1, 0.5] }}>

                <div key="b">
                    <QueueAnim component="div">
                        <Button>次按钮</Button>
                        <Button type="ghost">幽灵按钮</Button>
                        <DatePicker />

                        <h1>c组件</h1>
                        <hr />
                        <div style={header}>
                            <Link to={`/c/c1`}>
                                前往c1
                            </Link>
                            <hr />
                            <Link to={`/c/c2`}>
                                前往c2
                            </Link>
                        </div>

                        <ul>
                            <li key="0">11111111</li>
                            <li key="1">2222222222</li>
                            <li key="2">3333333333</li>
                        </ul>
                        <div style={content}> {children}</div>
                    </QueueAnim>
                </div>
                <div key='c'>

                    <QueueAnim component="div" animConfig={{ opacity: [1, 0], translateY: [0, 30], scale: [1, 0.9] }}>
                        <Table dataSource={dataSource} columns={columns} size="middle"/>
                    </QueueAnim>
                </div>
            </QueueAnim>
        )
    }
}


