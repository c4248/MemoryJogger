import React from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Log from '../components/Log'
import Entry from '../components/Entry'
import Header from '../components/Header'
import FullList from '../components/FullList'

const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Log} exact />
            <Route path="/full" component={FullList} />
            <Route path="/:id" component={Entry} />     
        </Switch>
    </BrowserRouter>
)

export default AppRouter