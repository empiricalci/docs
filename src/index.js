import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router'
import Docs from './docs'
import './index.css';


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Docs}>
      <Route path='*' component={() => <div>Not Found</div>} />
    </Route>
  </Router>,
  document.getElementById('root')
);
