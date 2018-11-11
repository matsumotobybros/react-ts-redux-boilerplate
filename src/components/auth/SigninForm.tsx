import * as React from "react"
import {ApplicationState} from "../../store";
import * as authActions from "../../store/auth";
import {Dispatch} from "redux";
import {Auth} from "../../store/auth";
import {connect} from "react-redux";
import * as style from "./style.css";

interface FieldProps {
  id: string,
  password: string,
  error: string
}

interface PropsFromDispatch {
  singIn: typeof authActions.signIn
  idChange: typeof authActions.idChange
  passwordChange: typeof authActions.passwordChange
}


class SignIn extends React.Component<FieldProps&PropsFromDispatch> {

  componentDidMount() {
    this.handleSubmit.bind(this)
  }

  private handleSubmit(e : any, auth: Auth, callback: any) {
    e.preventDefault()
    console.log(e)
    callback({id: auth.id, password: auth.password})
  }

  public render() {
    const { error, id, password, idChange, passwordChange, singIn } = this.props
    return (
      <form onSubmit={(e) => this.handleSubmit(e, {id, password}, singIn)} className={style.form}>
        <fieldset className={style.fieldSet}>
          <div>Id:</div>
          <input onChange={(e) => idChange(e.target.value)} className={style.inputForm} />
        </fieldset>
        <fieldset className={style.fieldSet}>
          <div>Password:</div>
          <input onChange={(e) => passwordChange(e.target.value)} className={style.inputForm} />
        </fieldset>
        <fieldset className={style.buttonField}>
          <button formAction="submit" className="btn btn-primary">
            Sign In
          </button>
        </fieldset>
        { error ? <div className={style.errMessage}>Failed to Sgin In. Please try again</div>: ""}
      </form>
    )
  }
}

const mapStateToProps = ({ auth }: ApplicationState) => ({
  errorMessage: auth.error,
  id: auth.id,
  password: auth.password,
  error: auth.error
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  singIn: (auth: Auth) => dispatch(authActions.signIn(auth)),
  idChange: (id: string) => dispatch(authActions.idChange(id)),
  passwordChange: (password: string) => dispatch(authActions.passwordChange(password))

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn)