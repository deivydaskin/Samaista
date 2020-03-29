import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import zIndex from '@material-ui/core/styles/zIndex';

const useStyles = makeStyles(theme => ({
    button: {
        borderRadius: 50,
        backgroundColor: "#C29FFF",
        color: "#FFF",
        padding: '16px 59.5725px 16px',
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
        if (e === "CreateDoc") {
            props.history.push('/createDoc')
        } else if (e === "SendDoc") {
            props.history.push('/sendDoc')
        }
    }

    return (
        <div className="Menu">
            <Button id="CreateDoc" variant="contained" color="primary" className={classes.button} onClick={() => handleSubmit("CreateDoc")}>
                Kurti dokumentus
            </Button>
            <Button id="SendDoc" variant="contained" color="primary" className={classes.button} onClick={() => handleSubmit("SendDoc")}>
                Siųsti dokumentus
            </Button>
        </div>
    );
}

export default withRouter(Menu);