import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import Login from './Login/Login';
import registerServiceWorker from './registerServiceWorker';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

ReactDOM.render(
<Router>
  <main>
    <Switch>
      <Route exact path='/' component={App}/>
      <Route path='/login' component={Login}/>
      <Route path="*" component={App} />  
    </Switch>
  </main>
</Router>
, document.getElementById('root'));
registerServiceWorker();
