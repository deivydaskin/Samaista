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

function CreateDoc(props) {
    const classes = useStyles();

    function handleSubmit(e) {

        if (e === "menu") {
            props.history.push('/createMenu')
        } else if (e === "techCard") {
            props.history.push('/createTechCard')
        }
    }

    return (
        <div>
            <Button variant="contained" color="primary" className={classes.button} onClick={() => props.history.push('/Menu')} style={{ marginRight: "500px", marginBottom: 0 }}>Atgal</Button>
            <div className="CreateDoc">

                <Button id="menu" variant="contained" color="primary" className={classes.button} onClick={() => handleSubmit("menu")}>
                    Kurti Valgiaraštį
            </Button>
                <Button id="techCard" variant="contained" color="primary" className={classes.button} onClick={() => handleSubmit("techCard")}>
                    Kurti Technologinę kortelę
            </Button>
            </div >
        </div >
    );
}

export default withRouter(CreateDoc);