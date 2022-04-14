import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Pages/home';
import Pick from './Pages/pick';
import Drop from './Pages/drop';



const  App:React.FC = () => {
  return (
    <div>
      <Router>
          <Switch>
            <Route exact path = "/" component={Home}/>
            <Route exact path = "/pick" component={Pick}/>
            <Route exact path = "/drop" component = {Drop}/>
          </Switch>
    </Router>
    </div>
  );
}

export default App;
