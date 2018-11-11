import * as React from "react"
import * as classNames from "classnames"
import {Dispatch} from "redux"
import {ApplicationState} from "../../store"
import {connect} from "react-redux"
import {
  Banner, deleteRequest, edit, cancel, fetchRequest, targetBannerChange, updateRequest,
  newEdit
} from "../../store/banners"
import ReactTable from "react-table"
import * as style from "./style.css"

interface PropsFromState {
  loading: boolean
  banners: Banner[]
  errors: string
  editing: boolean
  targetBanner: Banner
}

interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest
  updateRequest: typeof updateRequest
  deleteRequest: typeof deleteRequest
  edit: typeof edit
  newEdit: typeof newEdit
  cancel: typeof cancel
  targetBannerChange: typeof targetBannerChange
}

type BannersProps = PropsFromState & PropsFromDispatch

class BannerPage extends React.Component<BannersProps> {

  constructor(props: BannersProps) {
    super(props)
    this.headers = this.headers.bind(this)
    this.storeValue = this.storeValue.bind(this)
    this.update = this.update.bind(this)
  }

  public componentDidMount() {
    this.props.fetchRequest()
  }

  private headers(props: PropsFromDispatch) {


    return (
      [
        {Header: "Id", accessor: "id"},
        {Header: "targetSystem", accessor: "targetSystem"},
        {Header: "style", accessor: "style"},
        {Header: "description", accessor: "description"},
        {Header: "link", accessor: "link"},
        {Header: "theme", accessor: "theme"},
        {Header: "minVersion", accessor: "minVersion"},
        {Header: "maxVersion", accessor: "maxVersion"},
        {Header: "height", accessor: "height"},
        {Header: "backgroundColor", accessor: "backgroundColor"},
        {Header: "marginSide", accessor: "marginSide"},
        {Header: "sortOrder", accessor: "sortOrder"},
        {Header: "version", accessor: "version"},
        {
          Header: "Edit",
          accessor: "edit",
          Cell: (row: any) => (
            <button onClick={() => props.edit(row.original)} className="btn btn-primary">Edit</button>)
        },
        {
          Header: "Delete",
          accessor: "delete",
          Cell: (row: any) => (
            <button onClick={() => props.deleteRequest(row.original.id)} className="btn btn-danger">Delete</button>)
        },
      ]
    )
  }

  private storeValue(targetBanner: any, field: string, value: any) {
    targetBanner[field] = value
    return targetBanner
  }

  private update(props: BannersProps) {
    const { banners, targetBanner, updateRequest } = this.props
    const banner: Banner =banners.filter((banner) => banner.id == targetBanner.id)[0]
    const updatedBanner: Banner = { ...banner, ...targetBanner }
    updateRequest(updatedBanner)
  }

  public render() {
    const { newEdit, banners, deleteRequest, cancel, editing, targetBanner, targetBannerChange } = this.props
    const headers = this.headers(this.props)
    // var banner: Banner =banners.filter((banner) => banner.id == targetId)[0]
    if (banners.length == 0) {
      return ""
    }
    return (
      <div>
        { editing && targetBanner ?
          <div className={style.topSection}>
            <div className={style.editingSection}>
              <div className={style.editingInputForm}>
                <div>Id:</div><input defaultValue={String(targetBanner.id)} type="number" readOnly/>
                <div>Style:</div><input  onChange={(e) => targetBannerChange(this.storeValue(targetBanner, "style", e.target.value))} defaultValue={targetBanner.style} type="text"/>
                <div>Description:</div><input onChange={(e) => targetBannerChange(this.storeValue(targetBanner, "description", e.target.value))} defaultValue={targetBanner.description} type="text"/>
                <div>Theme:</div><input onChange={(e) => targetBannerChange(this.storeValue(targetBanner, "theme", e.target.value))}  defaultValue={targetBanner.theme} type="text"/>
              </div>
              <div className={style.editButtons}>
                <button onClick={() => this.update(this.props)} className={classNames(style.editButton,"btn", "btn-primary")}>Update</button>
                <button onClick={() => cancel()} className={classNames(style.editButton,"btn", "btn-primary")}>Cancel</button>
              </div>
            </div>
          </div> : ""}
        <ReactTable
          data={banners}
          columns={headers}
          defaultPageSize={10}
          SubComponent={row => {
            var data = {...row.original, ...this.state}
            return (
            <div className={style.editingForm}>
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
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td className={style.td}><input defaultValue={row.original.id} readOnly type="text"/></td>
                  <td className={style.td}><input defaultValue={data.style} type="text"/></td>
                  <td className={style.td}><input defaultValue={row.original.description} type="text"/></td>
                  <td className={style.td}><input defaultValue={row.original.description} type="text"/></td>
                  <td className={style.td}><input defaultValue={row.original.description} type="text"/></td>
                  <td className={style.td}><input defaultValue={row.original.description} type="text"/></td>
                  <td className={style.td}><input defaultValue={row.original.height} type="text"/></td>
                  <td className={style.td}><input defaultValue={row.original.backgroundColor} type="text"/></td>
                </tr>
                </tbody>
              </table>
              <div className={style.editButtons}>
                <button onClick={() => {
                  console.log(this.state)
                }
                }
                        className={classNames(style.editButton,"btn", "btn-primary")}>Update</button>
                <button onClick={() => deleteRequest(row.original.id)} className={classNames(style.editButton,"btn", "btn-danger")}>Delete</button>
              </div>
            </div>
          )
          }}
        />
        <div className={style.tableButton}>
          <button onClick={() => newEdit()} className={classNames(style.newButton,"btn", "btn-primary")}>Create New</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({banners}: ApplicationState) => ({
  banners: banners.banners,
  targetBanner: banners.targetBanner,
  editing: banners.editing
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRequest: () => dispatch(fetchRequest()),
  updateRequest: (banner: Banner) => dispatch(updateRequest(banner)),
  deleteRequest: (id: number) => dispatch(deleteRequest(id)),
  edit: (banner: Banner) => dispatch(edit(banner)),
  newEdit: () => dispatch(newEdit()),
  cancel: () => dispatch(cancel()),
  targetBannerChange: (targetBanner: Banner) => dispatch(targetBannerChange(targetBanner))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BannerPage)
