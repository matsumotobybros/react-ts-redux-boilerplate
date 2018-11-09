import * as classNames from "classnames"
import * as React from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import { Dispatch } from "redux"
import { ApplicationState } from "../../store"
import * as authActions from "../../store/auth"
import styled from "../../utils/styled"
import * as style from "./style.css"

interface HeaderProps {
  login: boolean
}

interface PropsFromDispatch {
  signOut: typeof authActions.signOut
}

type AllProps = HeaderProps & PropsFromDispatch

class Header extends React.Component<AllProps> {
  public render() {
    const { login, signOut } = this.props
    if(!login) {
      return ''
    }
    const buttonLabel = login ? "ログアウト" : ""
    const navLink = classNames("col-lg-2", style.headerNavigationLink)

    return (
      <div className={classNames("row", style.headerNavigation)}>
        <NavLink exact to="/users" className={navLink}>
          Users
        </NavLink>
        <NavLink exact to="/banners" className={navLink}>
          Banners
        </NavLink>
        <NavLink exact to="/communities" className={navLink}>
          Communities
        </NavLink>
        <LoginButton onClick={signOut}>{buttonLabel}</LoginButton>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }: ApplicationState) => ({
  login: auth.authenticated
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  signOut: () => dispatch(authActions.signOut())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

const LoginButton = styled(`div`)`
  margin: auto 20px auto auto;
  color: white;
`
