import React from 'react';
import './css/App.css';
import Login from './components/Login.js';
import Menu from './components/Menu.js';
import CreateTechCard from './components/createDocs/CreateTechCard.js';
import CreateMenu from './components/createDocs/CreateMenu.js';
import CreateProduct from './components/createDocs/CreateProduct.js';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ViewProducts from './components/viewDocs/ViewProducts';
import ViewTechCards from './components/viewDocs/ViewTechCards';
import ViewMenu from './components/viewDocs/ViewMenu';

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
            <Route path="/viewMenu">
              <ViewMenu />
            </Route>
            <Route path="/viewTechCards">
              <ViewTechCards />
            </Route>
            <Route path="/viewProducts">
              <ViewProducts />
            </Route>
            <Route path="/createProduct">
              <CreateProduct />
            </Route>
            <Route path="/createTechCard">
              <CreateTechCard />
            </Route>
            <Route path="/createMenu">
              <CreateMenu />
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
