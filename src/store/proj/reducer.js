import { combineReducers } from 'redux'
import * as types from './action-types'

const initialState = {
    shownText: null
}

const sampleReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SAMPLE:
            state.shownText = action.data
            return Object.assign({}, state)
        default:
            return state
    }
}

export default combineReducers({
    sampleReducer
})