import * as React from 'react'
import Header from '../container/header'
import requireAuth from './requre_authentication'

export default class App extends React.Component {
  render() {
    return (
      <div>
        {requireAuth(Header)}
        { this.props.children }
      </div>
    )
  }
}