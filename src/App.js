import React from 'react';
import './css/App.css';
import Login from './components/Login.js';
import Menu from './components/Menu.js';
import CreateTechCard from './components/createDocs/CreateTechCard.js';
import CreateMenu from './components/createDocs/CreateMenu.js';
import CreateProduct from './components/createDocs/CreateProduct.js';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ViewProducts from './components/viewDocs/ViewProducts';
import ViewTechCards from './components/viewDocs/ViewTechCards';
import ViewMenu from './components/viewDocs/ViewMenu';
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";

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
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Switch>
            <PrivateRoute path="/viewMenu" component={ViewMenu} />
            <PrivateRoute path="/viewTechCards" component={ViewTechCards} />
            <PrivateRoute path="/viewProducts" component={ViewProducts} />
            <PrivateRoute path="/createProduct" component={CreateProduct} />
            <PrivateRoute path="/createTechCard" component={CreateTechCard} />
            <PrivateRoute path="/createMenu" component={CreateMenu} />
            <PrivateRoute path="/menu" component={Menu} />
            <Route path="/">
              <Menu />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
