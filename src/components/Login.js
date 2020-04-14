import React from 'react';
import logo from '../Samaista-logo.svg';
//import LoginPhoto from '../public/login-photo.jpg'
import '../css/App.css';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles, fade } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    button: {
        backgroundColor: "#F95F83",
        color: "#FFF",
        padding: '16px 59.5725px 16px',
        width: 'auto',
        boxShadow: 'none',
        margin: theme.spacing(1),
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

const useStylesReddit = makeStyles(theme => ({
    root: {
        border: '0px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 50,
        backgroundColor: '#fcfcfb',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:hover': {
            backgroundColor: '#fff',
        },
        '&$focused': {
            backgroundColor: '#fff',
            boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,
        },
    },
    focused: {},
}));

function RedditTextField(props) {
    const classes = useStylesReddit();

    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}

function Login(props) {

    const classes = useStyles();

    function handleSubmit(e) {
        e.preventDefault();
        props.history.push('/menu')
    }

    return (
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
                    <TextField
                        label="Prisijungimo vardas"
                        className={classes.margin}
                        id="username"
                    />
                    <TextField
                        label="Slaptažodis"
                        className={classes.margin}
                        id="password"
                    />
                    <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>
                        Prisijungti
                </Button>
                </header>
            </div>
        </div>
    );
}

export default withRouter(Login);