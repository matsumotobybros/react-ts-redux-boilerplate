import { ConnectedRouter } from "connected-react-router"
import { History } from "history"
import * as React from "react"
import { Provider } from "react-redux"
import { Store } from "redux"
import Routes from "./Routes"
import { ApplicationState } from "./store"

interface OwnProps {
  store: Store<ApplicationState>
  history: History
}

type AllProps = OwnProps

class App extends React.Component<AllProps> {
  public render() {
    const { store, history } = this.props

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App