import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

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

function CreateDoc() {
    const classes = useStyles();
    return (
        <div className="CreateDoc">
            <Button variant="contained" color="primary" className={classes.button}>
                Kurti Valgiaraštį
            </Button>
            <Button variant="contained" color="primary" className={classes.button}>
                Kurti Technologinę kortelę
            </Button>
        </div>
    );
}

export default withRouter(CreateDoc);