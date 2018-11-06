import * as React from "react"
import {ApplicationState} from "../../store";
import * as authActions from "../../store/auth";
import {Dispatch} from "redux";
import {Auth} from "../../store/auth";
import {connect} from "react-redux";
import * as style from "./style.css";

interface FieldProps {
  account: string,
  id: string,
  password: string
}

interface PropsFromDispatch {
  singIn: typeof authActions.signIn
  accountChange: typeof authActions.accountChange
  idChange: typeof authActions.idChange
  passwordChange: typeof authActions.passwordChange
}


class SignIn extends React.Component<FieldProps&PropsFromDispatch> {

  componentDidMount() {
    this.handleSubmit.bind(this)
  }

  private handleSubmit(e : any, auth: Auth, callback: any) {
    e.preventDefault()
    callback({account:auth.account, id: auth.id, password: auth.password})
  }

  public render() {
    const { account, id, password, accountChange, idChange, passwordChange, singIn } = this.props
    return (
      <form onSubmit={(e) => this.handleSubmit(e, {account, id, password}, singIn)} className={style.form}>
        <fieldset className={style.fieldSet}>
          <div>Account:</div>
          <input onChange={(e) => accountChange(e.target.value)} className={style.inputForm} />
        </fieldset>
        <fieldset className={style.fieldSet}>
          <div>Id:</div>
          <input onChange={(e) => idChange(e.target.value)} className={style.inputForm} />
        </fieldset>
        <fieldset className={style.fieldSet}>
          <div>Password:</div>
          <input onChange={(e) => passwordChange(e.target.value)} className={style.inputForm} />
        </fieldset>
        <button formAction="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
    )
  }
}

const mapStateToProps = ({ auth }: ApplicationState) => ({
  errorMessage: auth.error,
  account: auth.account,
  id: auth.id,
  password: auth.password
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  singIn: (auth: Auth) => dispatch(authActions.signIn(auth)),
  accountChange: (account: string) => dispatch(authActions.accountChange(account)),
  idChange: (id: string) => dispatch(authActions.idChange(id)),
  passwordChange: (password: string) => dispatch(authActions.passwordChange(password))

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn)