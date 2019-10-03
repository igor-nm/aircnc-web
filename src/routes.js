import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import CreateSpot from "./pages/create-spot";

export default function Routes()
{
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/create-spot" component={CreateSpot} />
            </Switch>
        </BrowserRouter>
    )
}
