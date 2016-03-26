import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'
/**
 * 程序的实际入口
 */

class App extends Component {
  constructor(props) {
    super(props)

  }

  handleDismissClick(e) {
    e.preventDefault()
  }
  render() {
    const { children, inputValue } = this.props
    return (
      <div>
        <h1>导航</h1>
        <Link to={`/c`}>
          前往
        </Link>
        <hr />
        {children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
};

function mapStateToProps(state, ownProps) {
  console.log('ownProps.location.pathname =' + ownProps);
  return {
    state:state,
    url: ownProps.location.pathname.substring(1)
  }
}

export default connect(mapStateToProps, {

})(App)
