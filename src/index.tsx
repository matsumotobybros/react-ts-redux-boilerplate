import * as React from "react"
import { render } from "react-dom"
import App from "./App"

import createBrowserHistory from "history/createBrowserHistory"
import configureStore from "./store"

const history = createBrowserHistory()
const initialState: any = {}

const store = configureStore(history, initialState)

render(<App store={store} history={history} />, document.getElementById("root"))
