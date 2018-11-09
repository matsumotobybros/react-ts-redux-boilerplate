import * as React from "react"
import * as classNames from "classnames"
import {Dispatch} from "redux"
import {ApplicationState} from "../../store"
import {connect} from "react-redux"
import {Banner, fetchRequest} from "../../store/banners"
import ReactTable from "react-table"
import * as style from "./style.css"
import { history } from "../../index";

interface PropsFromState {
  loading: boolean
  banners: Banner[]
  errors: string
}

interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest
}

type BannersProps = PropsFromState & PropsFromDispatch

class BannerPage extends React.Component<BannersProps> {

  constructor(props: BannersProps) {
    super(props)
    this.edit = this.edit.bind(this)
    this.delete = this.delete.bind(this)
  }

  public componentDidMount() {
    this.props.fetchRequest()
  }

  private edit(id: number) {
    return (
      <button onClick={(id) => console.log(id)} className="btn btn-primary">Edit</button>
    )
  }

  private delete(id: number) {
    return (
      <button onClick={(id) => console.log(id)} className="btn btn-danger">Delete</button>
    )
  }

  public render() {
    const {loading, banners} = this.props
    if (banners.length == 0) {
      return ""
    }
    return (
      <div className={style.bannerPage}>
        {loading && <div>Loading...</div>}
        <div className={classNames(style.bannerCardContainer)}>
          <div className={classNames(style.bannerCard)}>
            <table className={style.table}>
              <thead>
              <tr>
                <th className={style.th}>Id</th>
                <th className={style.th}>style</th>
                <th className={style.th}>description</th>
                <th className={style.th}>theme</th>
                <th className={style.th}>minVersion</th>
                <th className={style.th}>maxVersion</th>
                <th className={style.th}>height</th>
                <th className={style.th}>backgroundColor</th>
                <th className={style.th}>Edit</th>
                <th className={style.th}>Delete</th>
              </tr>
              </thead>
              {banners.map((banner, i) => (
                <tbody key={i}>
                <tr>
                  <td className={style.td}>{banner.id}</td>
                  <td className={style.td}>{banner.style}</td>
                  <td className={style.td}>{banner.description}</td>
                  <td className={style.td}>{banner.theme}</td>
                  <td className={style.td}>{banner.minVersion}</td>
                  <td className={style.td}>{banner.maxVersion}</td>
                  <td className={style.td}>{banner.height}</td>
                  <td className={style.td}>{banner.backgroundColor}</td>
                  <td className={classNames(style.td, style.buttonHolder)}><button onClick={() => console.log(banner.id)} className="btn btn-primary">Edit</button></td>
                  <td className={classNames(style.td, style.buttonHolder)}>{this.delete(banner.id)}</td>
                </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>)
  }
}

const mapStateToProps = ({banners}: ApplicationState) => ({
  banners: banners.banners
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRequest: () => dispatch(fetchRequest())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BannerPage)
