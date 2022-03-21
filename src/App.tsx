import React from 'react';
import { app } from './firebase';
//import { useAppDispatch, useAppSelector } from './Store/hooks';
//import { increment, decrement } from './Store/counterSlice';
import NavBar from './Component/navbar';

const  App:React.FC = () => {
 // const count = useAppSelector(state => state.counter.value);
 // const dispatch = useAppDispatch();
 console.log(app);
  return (
    <div className="App">
      <NavBar/>
      <h2 className="text-3xl font-bold">Hello Typescript</h2>
    </div>
  );
}

export default App;
