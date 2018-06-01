import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import React from 'react'
import Loadable from 'react-loadable'

const Loading = () => <div>Loading...</div>
const Home = Loadable({
    loader: () => import('../pages/home'),
    loading:Loading
})

export default class RouteConfig extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
            </Router>
        )
    }
}