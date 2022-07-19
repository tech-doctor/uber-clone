import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary';
import ErrorFallback from './Component/ErrorFallBack';
import ProtectedRoute from './Component/ProtectedRoute';
import Home from './Pages/home';
import Pick from './Pages/pick';
import Drop from './Pages/drop';
import NoPage from './Pages/Nopage';
import Auth from './Pages/auth';

const  App:React.FC = () => {
    // const [showInsatlledMessage, setShowInsatlledMessage] = useState<boolean>(false);

   // Detects if device is on iOS 

    // const isIos = () => {
    //   const userAgent = window.navigator.userAgent.toLowerCase();
    //   return /iphone|ipad|ipod/.test( userAgent );
    // }

    // Detects if device is in standalone mode
    // const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);
   
    // Checks if should display install popup notification:

    // if (isIos() && !isInStandaloneMode()) {
    //   setShowInsatlledMessage(true);
    // }


    function isInStandaloneMode() {
    return (window.matchMedia('(display-mode: standalone)').matches);
  }



    

    const userName = localStorage.getItem('userName');
     //console.log(userName)
    if(!userName){
      return <Auth/>
    }

  return (
    <div>
      <Router>
          <Switch>
            {/* <Route exact path="/auth" component={Auth} /> */}
            <Route exact path = "/" component={Home}/>
            <Route exact path = "/pick/:origin" component={Pick}/>
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
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
