import React from 'react';
import './App.css';
import Login from './Login.js';
import Menu from './Menu.js';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#C29FFF',
    },
    secondary: {
      main: '#F4E9FF',
    },
  }
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/menu">
              <Menu />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
