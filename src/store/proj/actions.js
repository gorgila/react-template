import * as types from './action-types'

const sample = (text) => {
    return {
        type: types.SAMPLE,
        data: text
    }
}

export default {
    sample
}