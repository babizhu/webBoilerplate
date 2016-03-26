import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'

export default class C2 extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>C2</h1>
        <Link to={`/`}>
          返回主页
        </Link>
      </div>
    )
  }
}
