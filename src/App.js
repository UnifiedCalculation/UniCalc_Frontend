import React from 'react';
import './App.css';
import LoginForm from './components/loginForm/loginForm.';
import './components/layouts/navigation'
import { BottomNavigation } from '@material-ui/core';
import Navigation from "./components/layouts/navigation";

function App() {
  return (
    <div className="App">
      // Add your code here
      <Navigation></Navigation>
    </div>
  );
}

export default App;
