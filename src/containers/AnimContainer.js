/**
 * Created by liu_k on 2016/4/18.
 */
import React, { Component, PropTypes } from 'react'
import {QueueAnim} from 'antd'

export default class AnimContainer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { children } = this.props;
        return (
            <QueueAnim animConfig={{ opacity: [1, 0], translateX: [0, 200], scale: [1, 0.5] }}>
                <div key='c'>
                    <QueueAnim component="div"
                               animConfig={{ opacity: [1, 0], translateY: [0, 30], scale: [1, 0.9] }}>
                        {children}
                    </QueueAnim>
                </div>
            </QueueAnim>
        )
    }
}
