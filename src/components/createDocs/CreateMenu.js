import React, { useState } from 'react';
import '../../css/createMenu.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Breakfast from './Breakfast.js';
import Lunch from './Lunch.js';
import Dinner from './Dinner.js';
import Button from '@material-ui/core/Button';
import { useStyles } from '../../css/inline-style/createMenuStyle.js';
import { useAuth0 } from "../../react-auth0-spa";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CreateMenu(props) {
    const classes = useStyles();
    const { getTokenSilently } = useAuth0();
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [breakfastState, setBreakfastState] = useState({
        nameOfMenu: "",
        breakfastData: [
            {
                recipeNumber: "",
                name: "",
                yield: "",
                b: null,
                r: null,
                a: null,
                kcal: null
            }],
        breakfastOverallB: 0,
        breakfastOverallR: 0,
        breakfastOverallA: 0,
        breakfastOverallKcal: 0,
    });
    const [lunchState, setLunchState] = useState({
        lunchData: [
            {
                recipeNumber: "",
                name: "",
                yield: "",
                b: null,
                r: null,
                a: null,
                kcal: null
            }],
        lunchOverallB: 0,
        lunchOverallR: 0,
        lunchOverallA: 0,
        lunchOverallKcal: 0,
    });
    const [dinnerState, setDinnerState] = useState({
        dinnerData: [
            {
                recipeNumber: "",
                name: "",
                yield: "",
                b: null,
                r: null,
                a: null,
                kcal: null
            }],
        dinnerOverallB: 0,
        dinnerOverallR: 0,
        dinnerOverallA: 0,
        dinnerOverallKcal: 0
    });

    function handleSnackbar(action) {
        if (action === "open") {
            setSnackbarState(true);
        } else if (action === "close") {
            setSnackbarState(false);
        }
    }

    async function saveDoc() {
        const token = await getTokenSilently();
        //GraphQL reikalauja names of fields be "" todel panaudojau regex, nes nezinau kaip kitaip isparsint.
        let breakfastQuoted = JSON.stringify(breakfastState.breakfastData);
        const breakfastUnquoted = breakfastQuoted.replace(/"([^"]+)":/g, '$1:');
        let lunchQuoted = JSON.stringify(lunchState.lunchData);
        const lunchUnquoted = lunchQuoted.replace(/"([^"]+)":/g, '$1:');
        let dinnerQuoted = JSON.stringify(dinnerState.dinnerData);
        const dinnerUnquoted = dinnerQuoted.replace(/"([^"]+)":/g, '$1:');

        axios({
            url: 'http://localhost:3000/graphql',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                query: `
                mutation {
                    addMenu (nameOfMenu: "${breakfastState.nameOfMenu}", breakfastData: ${breakfastUnquoted}, breakfastOverallB: ${breakfastState.breakfastOverallB}, 
                            breakfastOverallR: ${breakfastState.breakfastOverallR}, breakfastOverallA: ${breakfastState.breakfastOverallA}, breakfastOverallKcal: ${breakfastState.breakfastOverallKcal},
                            lunchData: ${lunchUnquoted}, lunchOverallB: ${lunchState.lunchOverallB}, 
                            lunchOverallR: ${lunchState.lunchOverallR}, lunchOverallA: ${lunchState.lunchOverallA}, lunchOverallKcal: ${lunchState.lunchOverallKcal},
                            dinnerData: ${dinnerUnquoted}, dinnerOverallB: ${dinnerState.dinnerOverallB}, 
                            dinnerOverallR: ${dinnerState.dinnerOverallR}, dinnerOverallA: ${dinnerState.dinnerOverallA}, dinnerOverallKcal: ${dinnerState.dinnerOverallKcal}
                            ){
                                nameOfMenu
                                breakfastOverallB
                                breakfastOverallR
                                breakfastOverallA
                                breakfastOverallKcal
                                lunchOverallB
                                lunchOverallR
                                lunchOverallA
                                lunchOverallKcal
                                dinnerOverallB
                                dinnerOverallR
                                dinnerOverallA
                                dinnerOverallKcal                                
                            }
                  }

                `
            }
        })
            .then((response) => {
                if (response.statusText === "OK" && !response.data.errors) {
                    setSnackbarText("Valgiaraštis išsaugotas!");
                    setSnackbarSeverity("success");
                    handleSnackbar("open");
                } else {
                    setSnackbarText("Išsaugoti nepavyko!");
                    setSnackbarSeverity("error");
                    handleSnackbar("open");
                }
            })
            .catch((error) => {
                setSnackbarText("Įvyko klaida!");
                setSnackbarSeverity("error");
                handleSnackbar("open");
                console.log(error);
            });
    }

    return (
        <div className="CreateMenu">
            <div className="marginTop" id="marginTop">
                <div className="backBtnContainer">
                    <Button variant="contained" color="secondary" className="backBtn" onClick={() => props.history.push('/menu')}>Atgal</Button>
                </div>
            </div>
            <div className="MenuContainer">
                <div className="first" id="firstMargin">
                    <Breakfast setBreakfastState={setBreakfastState} breakfastState={breakfastState} btnColor="secondary" />
                </div>
                <div className="second" >
                    <Lunch setLunchState={setLunchState} lunchState={lunchState} btnColor="secondary" />
                </div>
                <div className="third" >
                    <Dinner setDinnerState={setDinnerState} dinnerState={dinnerState} btnColor="secondary" />
                </div>
            </div>

            <Button onClick={saveDoc} variant="contained" color="secondary" className={classes.button} style={{ alignSelf: "center" }}>Išsaugoti</Button>
            <Snackbar open={snackbarState} autoHideDuration={6000} onClose={() => handleSnackbar("close")}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
                <Alert onClose={() => handleSnackbar("close")} severity={snackbarSeverity}>
                    {snackbarText}
                </Alert>
            </Snackbar>
        </div >
    );
}

export default withRouter(CreateMenu);