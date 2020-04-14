import React from 'react';
import './css/App.css';
import Login from './components/Login.js';
import Menu from './components/Menu.js';
import CreateTechCard from './components/CreateTechCard.js';
import CreateMenu from './components/CreateMenu.js';
import SendDoc from './components/SendDoc.js';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F95F83',
    },
    secondary: {
      main: '#4687FF',
    },
  }
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/createTechCard">
              <CreateTechCard />
            </Route>
            <Route path="/createMenu">
              <CreateMenu />
            </Route>
            <Route path="/sendDoc">
              <SendDoc />
            </Route>
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
