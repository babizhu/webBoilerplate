import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'

export default class C1 extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>C1</h1>
        <Link to={`/`}>
          返回主页
        </Link>
          <span>|</span>
          <Link to={`/c`}>
              返回c
          </Link>
      </div>
    )
  }
}
