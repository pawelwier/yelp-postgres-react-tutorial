import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './routes/Home'
import UpdatePage from './routes/UpdatePage'
import RestaurantDetailPage from './routes/RestaurantDetailPage'

const App = () => {
    return <div>
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path exact path="/restaurants/:id" component={RestaurantDetailPage} />
                <Route path exact path="/restaurants/:id/update" component={UpdatePage} />
            </Switch>
        </Router>
    </div>;  
}

export default App;