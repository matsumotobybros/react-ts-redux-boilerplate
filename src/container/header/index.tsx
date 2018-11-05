import * as classNames from "classnames"
import * as React from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import { Dispatch } from "redux"
import { ApplicationState } from "../../store"
import * as layoutActions from "../../store/header"
import styled from "../../utils/styled"
import * as style from "./style.css"

interface HeaderProps {
  login: boolean
}

interface PropsFromDispatch {
  loginClick: typeof layoutActions.login
  logoutClick: typeof layoutActions.logout
}

type AllProps = HeaderProps & PropsFromDispatch

class Header extends React.Component<AllProps> {
  public render() {
    const { login, loginClick, logoutClick } = this.props

    const buttonLabel = login ? "ログアウト" : "ログイン"
    const loginAction = login ? logoutClick : loginClick
    const navLink = classNames("col-lg-2", style.headerNavigationLink)

    return (
      <div className={classNames("row", style.headerNavigation)}>
        <NavLink exact to="/" className={navLink}>
          Home
        </NavLink>
        <NavLink exact to="/users" className={navLink}>
          Users
        </NavLink>
        <NavLink exact to="/communities" className={navLink}>
          communities
        </NavLink>
        <LoginButton onClick={loginAction}>{buttonLabel}</LoginButton>
      </div>
    )
  }
}

const mapStateToProps = ({ header }: ApplicationState) => ({
  login: header.login
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  loginClick: () => dispatch(layoutActions.login()),
  logoutClick: () => dispatch(layoutActions.logout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

const LoginButton = styled(`div`)`
  margin: auto 20px auto auto;
  color: white;
`
