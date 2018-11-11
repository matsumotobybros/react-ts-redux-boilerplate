import * as React from 'react'
import {Component} from "react";
import {ApplicationState} from "../store";
import {connect} from "react-redux";

interface AuhtenticationProps {
  authenticated: boolean
}
// HOC (Require Auth)
export default (ComposedComponent: any) => {
  class Authentication extends Component<AuhtenticationProps> {

    componentWillMount() {
      if(!this.props.authenticated) {
        this.context.router.push("/")
      }
    }

    componentWillUpdate(nextProps: AuhtenticationProps) {
      if(!nextProps.authenticated) {
        this.context.router.push("/")
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps({auth}: ApplicationState) {
    return { authenticated: auth.authenticated }
  }

  return connect(mapStateToProps)(Authentication)
}