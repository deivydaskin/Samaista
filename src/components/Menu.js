import React from 'react';
import '../css/Menu.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import logo from '../Samaista-logo.svg';
import zIndex from '@material-ui/core/styles/zIndex';
import { useAuth0 } from "../react-auth0-spa";

const useStyles = makeStyles(theme => ({
    button: {
        //backgroundColor: "#F95F83",
        borderWidth: '1px',
        borderColor: '#FFFFFF',
        color: "#FFF",
        padding: 'auto',
        width: 'auto',
        boxShadow: 'none',
        margin: theme.spacing(2),
        zIndex: 30
    }
}));

function Menu(props) {
    const classes = useStyles();
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    function handleSubmit(e) {
        //e.preventDefault();
        if (e === "techCard") {
            props.history.push('/createTechCard')
        } else if (e === "menu") {
            props.history.push('/createMenu')
        } else if (e === "product") {
            props.history.push('/createProduct')
        } else if (e === "viewProducts") {
            props.history.push('/viewProducts')
        } else if (e === "viewTechCards") {
            props.history.push('/viewTechCards')
        } else if (e === "viewMenu") {
            props.history.push('/viewMenu')
        }
    }

    return (
        <div className="Menu" >
            {isAuthenticated ?
                <div className="Menu">
                    <div className="createCol">
                        <h3 className="logo">Samaista</h3>
                        <img src={process.env.PUBLIC_URL + '/notebook.png'} />
                        <div className="buttonBox">
                            <Button id="CreateDoc" variant="outlined" color="secondary" className={classes.button} onClick={() => handleSubmit("menu")}>
                                Valgiaraštį
                            </Button>
                            <Button id="CreateDoc" variant="outlined" color="secondary" className={classes.button} onClick={() => handleSubmit("techCard")}>
                                Techn. kortelę
                            </Button>
                            <Button id="CreateDoc" variant="outlined" color="secondary" className={classes.button} onClick={() => handleSubmit("product")}>
                                Produktą
                            </Button>
                        </div>
                    </div>
                    <div className="viewCol">
                        <Button variant="contained" color="primary" className="logout" onClick={() => logout()}>
                            Atsijungti
                        </Button>
                        <img src={process.env.PUBLIC_URL + '/statistics.png'} />
                        <div className="buttonBox">
                            <Button id="viewMenu" variant="outlined" color="primary" className={classes.button} onClick={() => handleSubmit("viewMenu")}>
                                Valgiaraščius
                            </Button>
                            <Button id="viewTechCards" variant="outlined" color="primary" className={classes.button} onClick={() => handleSubmit("viewTechCards")}>
                                Techn. korteles
                            </Button>
                            <Button id="viewProducts" variant="outlined" color="primary" className={classes.button} onClick={() => handleSubmit("viewProducts")}>
                                Produktus
                            </Button>
                        </div>
                    </div>
                </div>
                :
                <div className="Login">
                    <div className="column1">
                        <img src={process.env.PUBLIC_URL + '/Group1.png'} className="img" alt="photo" />
                        <div className="overlay">
                            <h1 className="h1">Organizuok meniu lengviau</h1>
                            <p className="p">Puikus ir lengvai įsisavinamas įrankis, kuris padės lengviau planuoti maisto gaminimą.</p>
                        </div>
                    </div>
                    <div className="column2">
                        <header className="Login-header">
                            <img src={logo} className="Login-logo" alt="logo" />
                            <Button variant="contained" color="primary" className={classes.button} onClick={() => loginWithRedirect({})}>
                                Prisijungti
                            </Button>
                        </header>
                    </div>
                </div>
            }
        </div >
    );
}

export default withRouter(Menu);