import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary';
import ErrorFallback from './Component/ErrorFallBack';
import Home from './Pages/home';
import Pick from './Pages/pick';
import Drop from './Pages/drop';
import NoPage from './Pages/Nopage';

const  App:React.FC = () => {
  return (
    <div>
      <Router>
          <Switch>
            <Route exact path = "/" component={Home}/>
            <Route exact path = "/pick/:origin" component={Pick}/>
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              // onError={(error:any, info) => {
              //   console.log(error, info);
              // }}
              onReset={() => {

              }}
            >
            <Route exact path = "/drop/:origin/:end" component = {Drop}/>
            </ErrorBoundary>
            <Route exact path = "*" component = {NoPage}/>
          </Switch>
    </Router>
    </div>
  );
}

export default App;
