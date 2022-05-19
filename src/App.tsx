import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary'

import Home from './Pages/home';
import Pick from './Pages/pick';
import Drop from './Pages/drop';
import NoPage from './Pages/Nopage';


// function ErrorHandler({error, resetErrorBoundary}) {
//   return (
//     <div role="alert">
//       <p>Something went wrong:</p>
//       <pre>{error.message}</pre>
//       <button onClick={resetErrorBoundary}>Try again</button>
//     </div>
//   )
// }


const  App:React.FC = () => {
  return (
    <div>
      <Router>
          <Switch>
            <Route exact path = "/" component={Home}/>
            <Route exact path = "/pick/:origin" component={Pick}/>
            {/* <ErrorBoundary
              FallbackComponent={ErrorHandler}
            > */}
            <Route exact path = "/drop/:origin/:end" component = {Drop}/>
            {/* </ErrorBoundary> */}
            
            <Route exact path = "*" component = {NoPage}/>
          </Switch>
    </Router>
    </div>
  );
}

export default App;
