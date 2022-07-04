import { Route, Redirect } from 'react-router-dom';


const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
  const userName = localStorage.getItem('userName');
  return (
    <Route 
      {...restOfProps}
      render={(props) => userName ? <Component {...props} /> : <Redirect to="/auth" />} 
    />
  );
}

export default ProtectedRoute;