import * as classNames from "classnames"
import * as React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { ApplicationState } from "../../store"
import { fetchRequest, User } from "../../store/users"
import * as style from "./style.css"

const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT || "https://api.opendota.com"

interface PropsFromState {
  loading: boolean
  data: User[]
  errors: string
}

interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest
}

type UsersProps = PropsFromState & PropsFromDispatch

class UsersPage extends React.Component<UsersProps> {
  public componentDidMount() {
    this.props.fetchRequest()
  }

  public render() {
    const { loading, data } = this.props
    return (
      <div className={style.userPage}>
        {loading && <div>Loading...</div>}
        <div className={classNames("row", style.userCardContainer)}>
          {data.map((user, i) => (
            <div className={classNames(style.userCard)} key={i}>
              <div className="row">
                <img src={API_ENDPOINT + user.icon} />
                <div>{user.localized_name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ users }: ApplicationState) => ({
  loading: users.loading,
  errors: users.errors,
  data: users.data
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRequest: () => dispatch(fetchRequest())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersPage)
