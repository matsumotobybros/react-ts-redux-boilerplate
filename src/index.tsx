import * as React from "react"
import { render } from "react-dom"
import App from "./App"

import createBrowserHistory from "history/createBrowserHistory"
import configureStore from "./store"
// import {Provider} from "react-redux";
// import {ConnectedRouter} from "connected-react-router";
// import Routes from "./Routes";

export const history = createBrowserHistory()
const initialState: any = {}

const store = configureStore(history, initialState)

render(<App store={store} history={history} />, document.getElementById("root"))
// render(
//   <Provider store={store}>
//     <ConnectedRouter history={history}>
//       <Routes />
//     </ConnectedRouter>
//   </Provider>
//   , document.getElementById("root"))
