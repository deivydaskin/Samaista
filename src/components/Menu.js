import React from 'react';
import '../css/Menu.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import logo from '../Samaista-logo.svg';
import zIndex from '@material-ui/core/styles/zIndex';

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
        } else if (e === "logout") {
            props.history.push('/')
        }
    }

    return (
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
                <Button variant="contained" color="primary" className="logout" onClick={() => handleSubmit("logout")}>
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
    );
}

export default withRouter(Menu);