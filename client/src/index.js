import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router, Route, Switch} from 'react-router-dom'
import BaseLayout from './components/Baselayout.js'
// import history from './utils/history'
import Register from './components/Registration';
import Application from './components/Application';
import Login from './components/Login';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();



ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <BaseLayout>
      <Switch>
        <Route exact path = '/register' component={Register} />
        <Route exact path = '/login' component={Login} />
        <Route exact path = '/application' component={Application} />
    </Switch>
    </BaseLayout>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
