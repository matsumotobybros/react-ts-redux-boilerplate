import * as React from "react"
import { Route, Switch } from "react-router-dom"
import Header from "./container/header"
import UsersPage from "./container/users"
import SignIn from "./components/auth/SigninForm"

const Routes: React.SFC = () => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/users" component={UsersPage} />
      <Route
        exact
        path="/communities"
        component={() => <div>Communities</div>}
      />
    </Switch>
  </div>
)

export default Routes
