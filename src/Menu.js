import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        borderRadius: 50,
        backgroundColor: "#C29FFF",
        color: "#FFF",
        padding: '16px 59.5725px 16px',
        width: 'auto',
        boxShadow: 'none',
        margin: theme.spacing(2),
    }
}));

function Menu() {
    const classes = useStyles();
    return (
        <div className="Menu">
            <Button variant="contained" color="primary" className={classes.button}>
                Pavadinimas
            </Button>
            <Button variant="contained" color="primary" className={classes.button}>
                Kategorija
            </Button>
        </div>
    );
}

export default Menu;