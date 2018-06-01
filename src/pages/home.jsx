import React from 'react'
import { connect } from 'react-redux'
import actions from '~src/store/proj/actions'
import PropTypes from 'prop-types'

class Home extends React.Component{
    constructor(props) {
        super(props)

        this._initialData(this.props)
    }

    _initialData = async(props) => {
        await props.sendSample()
    }

    render() {
        return (
            <h4 className="mt-3 text-uppercase w-100 text-center">{this.props.sample.shownText}</h4>
        )
    }
}

const mapStateToProps = state => {
    return {
        sample: state.sampleReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendSample: () => dispatch(actions.sample('start....'))
    }
}

Home.propTypes = {
    sample: PropTypes.object.isRequired,
    sendSample: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)