import React from 'react'
import {
    Switch,
    Route
} from 'react-router-dom'
import Calculator from './pages/Calculator'

export default function ApplicationRouter() {

    return (
        <Switch >
            <Route path={[ '/matrix', '/' ]}>
                <Calculator/>
            </Route>

        </Switch>
    )

}