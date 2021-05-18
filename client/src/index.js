import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import BaseLayout from './components/Baselayout.js'
import Register from './components/Registration';
import Application from './components/Application';
import Login from './components/Login';
import Image from './components/Image';
import Apptracker from './components/appTracker';
import ProfilePage from './components/ProfilePage';
import Feed from './components/Feed';
import reducer from './utils/reducer'
import AuthPath from './auth'
import Logout from './components/logout'
import Apples from './components/apples';
import Top5 from './components/Top5'

const closet = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={closet}>
      <BrowserRouter>
        <BaseLayout>
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/logout' component={Logout} />
            <Route exact path='/top5' component={Top5} />
            <Route exact path='/application' component={Application} />
            <Route exact path='/app-track' component={AuthPath(Apples)} />
            <Route exact path='/' component={Feed} />
            <Route exact path='/upload' component={Image} />
            <Route exact path='/profile' component={AuthPath(ProfilePage)} />
            <Route component={Feed} />
          </Switch>
        </BaseLayout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
