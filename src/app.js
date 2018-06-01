import React from 'react'
import ReactDOM from 'react-dom'
import Route from './router/'
import {Provider} from 'react-redux'
import store from './store'
import 'bootstrap/scss/bootstrap.scss'

const render = Component => {
    ReactDOM.render(
        <Provider store={store}>
            <Component />
        </Provider>,
        document.getElementById('app')
    )
}

render(Route)