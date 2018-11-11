import * as React from "react"
import { render } from "react-dom"
// import App from "./App"

import createBrowserHistory from "history/createBrowserHistory"
import configureStore, {ApplicationState} from "./store"
import {History} from "history";
import {Store} from "redux";
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import Routes from "./routes";
// import {Provider} from "react-redux";
// import {ConnectedRouter} from "connected-react-router";
// import Routes from "./Routes";

export const history = createBrowserHistory()
const initialState: any = {}

const store = configureStore(history, initialState)

interface OwnProps {
  store: Store<ApplicationState>
  history: History
}

type AllProps = OwnProps

// render(<App store={store} history={history} />, document.getElementById("root"))
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
  , document.getElementById("root"))
