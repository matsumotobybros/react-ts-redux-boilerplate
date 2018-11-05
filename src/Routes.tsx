import * as React from "react"
import { Route, Switch } from "react-router-dom"
import Header from "./container/header"
import UsersPage from "./container/users"

const Routes: React.SFC = () => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={() => <div>Home</div>} />
      <Route exact path="/users" component={UsersPage} />
      <Route
        exact
        path="/communities"
        component={() => <div>communities</div>}
      />
    </Switch>
  </div>
)

export default Routes
