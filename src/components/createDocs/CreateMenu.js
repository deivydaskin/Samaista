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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { age3, age7 } from './LegalLimits';
import Switch from '@material-ui/core/Switch';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CreateMenu(props) {
    const classes = useStyles();
    const { getTokenSilently } = useAuth0();
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [openLimitModal, setOpenLimitModal] = useState(false);
    const [overLimitName, setOverLimitName] = useState();
    // ageGroupe false = 3 years, true = 7 years.
    const [ageGroup, setAgeGroup] = useState(false);
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
        const validacity = await validation();
        if (validacity) {
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
                    };
                    setOpenLimitModal(false)
                })
                .catch((error) => {
                    setSnackbarText("Įvyko klaida!");
                    setSnackbarSeverity("error");
                    handleSnackbar("open");
                    console.log(error);
                });
        }
    }

    function validation() {
        let validationArr = { ...breakfastState };
        if (validationArr.nameOfMenu === "") {
            setSnackbarText("Valgiaraščio pavadinimas negali būti tusčias!");
            setSnackbarSeverity("error");
            handleSnackbar("open");
            return false;
        }
        return true;
    }

    function handleSubmit() {
        if (!ageGroup) {
            checkLimits(age3);
        } else if (ageGroup) {
            checkLimits(age7);
        }
    }

    function handleSwitchChange() {
        setAgeGroup(!ageGroup);
        console.log(ageGroup);
    }

    function checkLimits(age) {
        let limitFor3 = age;
        if (breakfastState.breakfastOverallB > limitFor3.breakFastLimit.bMax) {
            setOverLimitName(["Pusryčių", "baltymų", "viršyja", parseFloat(breakfastState.breakfastOverallB - limitFor3.breakFastLimit.bMax).toFixed(2)]);
            setOpenLimitModal(true);
        } else if (breakfastState.breakfastOverallB < limitFor3.breakFastLimit.bMin) {
            setOverLimitName(["Pusryčių", "baltymų", "nesiekia", parseFloat(limitFor3.breakFastLimit.bMin - breakfastState.breakfastOverallB).toFixed(2)]);
            setOpenLimitModal(true);
        } else if (breakfastState.breakfastOverallR > limitFor3.breakFastLimit.rMax) {
            setOverLimitName(["Pusryčių", "riebalų", "viršyja", parseFloat(breakfastState.breakfastOverallR - limitFor3.breakFastLimit.rMax).toFixed(2)]);
            setOpenLimitModal(true);
        } else if (breakfastState.breakfastOverallR < limitFor3.breakFastLimit.rMin) {
            setOverLimitName(["Pusryčių", "riebalų", "nesiekia", parseFloat(limitFor3.breakFastLimit.rMin - breakfastState.breakfastOverallR).toFixed(2)]);
            setOpenLimitModal(true);
        } else if (breakfastState.breakfastOverallA > limitFor3.breakFastLimit.aMax) {
            setOverLimitName(["Pusryčių", "angliavandenių", "viršyja", parseFloat(breakfastState.breakfastOverallA - limitFor3.breakFastLimit.aMax).toFixed(2)]);
            setOpenLimitModal(true);
        } else if (breakfastState.breakfastOverallA < limitFor3.breakFastLimit.aMin) {
            setOverLimitName(["Pusryčių", "angliavandenių", "nesiekia", parseFloat(limitFor3.breakFastLimit.aMin - breakfastState.breakfastOverallA).toFixed(2)]);
            setOpenLimitModal(true);
        } else if (breakfastState.breakfastOverallKcal > limitFor3.breakFastLimit.kcalMax) {
            setOverLimitName(["Pusryčių", "kilokalorijų", "viršyja", parseFloat(breakfastState.breakfastOverallKcal - limitFor3.breakFastLimit.kcalMax).toFixed(2)]);
            setOpenLimitModal(true);
        } else if (breakfastState.breakfastOverallKcal < limitFor3.breakFastLimit.kcalMin) {
            setOverLimitName(["Pusryčių", "kilokalorijų", "nesiekia", parseFloat(limitFor3.breakFastLimit.kcalMin - breakfastState.breakfastOverallKcal).toFixed(2)]);
            setOpenLimitModal(true);
        } else if (lunchState.lunchOverallB > limitFor3.lunchLimit.bMax) {
            setOverLimitName(["Pietų", "baltymų", "viršyja", parseFloat(lunchState.lunchOverallB - limitFor3.lunchLimit.bMax).toFixed(2)]);
            setOpenLimitModal(true);
        } else if (lunchState.lunchOverallB < limitFor3.lunchLimit.bMin) {
            setOverLimitName(["Pietų", "baltymų", "nesiekia", parseFloat(limitFor3.lunchLimit.bMin - lunchState.lunchOverallB).toFixed(2)]);
            setOpenLimitModal(true);
        } else if (lunchState.lunchOverallR > limitFor3.lunchLimit.rMax) {
            setOverLimitName(["Pietų", "riebalų", "viršyja", parseFloat(lunchState.lunchOverallR - limitFor3.lunchLimit.rMax).toFixed(2)]);
            setOpenLimitModal(true);
        } else if (lunchState.lunchOverallR < limitFor3.lunchLimit.rMin) {
            setOverLimitName(["Pietų", "riebalų", "nesiekia", parseFloat(limitFor3.lunchLimit.rMin - lunchState.lunchOverallR).toFixed(2)]);
            setOpenLimitModal(true);
        } else if (lunchState.lunchOverallA > limitFor3.lunchLimit.aMax) {
            setOverLimitName(["Pietų", "angliavandenių", "viršyja", parseFloat(lunchState.lunchOverallA - limitFor3.lunchLimit.aMax).toFixed(2)]);
            setOpenLimitModal(true);
        } else if (lunchState.lunchOverallA < limitFor3.lunchLimit.aMin) {
            setOverLimitName(["Pietų", "angliavandenių", "nesiekia", parseFloat(limitFor3.lunchLimit.aMin - lunchState.lunchOverallA).toFixed(2)]);
            setOpenLimitModal(true);
        } else if (lunchState.lunchOverallKcal > limitFor3.lunchLimit.kcalMax) {
            setOverLimitName(["Pietų", "kilokalorijų", "viršyja", parseFloat(lunchState.lunchOverallKcal - limitFor3.lunchLimit.kcalMax).toFixed(2)]);
            setOpenLimitModal(true);
        } else if (lunchState.lunchOverallKcal < limitFor3.lunchLimit.kcalMin) {
            setOverLimitName(["Pietų", "kilokalorijų", "nesiekia", parseFloat(limitFor3.lunchLimit.kcalMin - lunchState.lunchOverallKcal).toFixed(2)]);
            setOpenLimitModal(true);
        } else if (dinnerState.dinnerOverallB > limitFor3.dinnerLimit.bMax) {
            setOverLimitName(["Vakarienės", "baltymų", "viršyja", parseFloat(dinnerState.dinnerOverallB - limitFor3.dinnerLimit.bMax).toFixed(2)]);
            setOpenLimitModal(true);
        } else if (dinnerState.dinnerOverallB < limitFor3.dinnerLimit.bMin) {
            setOverLimitName(["Vakarienės", "baltymų", "nesiekia", parseFloat(limitFor3.dinnerLimit.bMin - dinnerState.dinnerOverallB).toFixed(2)]);
            setOpenLimitModal(true);
        } else if (dinnerState.dinnerOverallR > limitFor3.dinnerLimit.rMax) {
            setOverLimitName(["Vakarienės", "riebalų", "viršyja", parseFloat(dinnerState.dinnerOverallR - limitFor3.dinnerLimit.rMax).toFixed(2)]);
            setOpenLimitModal(true);
        } else if (dinnerState.dinnerOverallR < limitFor3.dinnerLimit.rMin) {
            setOverLimitName(["Vakarienės", "riebalų", "nesiekia", parseFloat(limitFor3.dinnerLimit.rMin - dinnerState.dinnerOverallR).toFixed(2)]);
            setOpenLimitModal(true);
        } else if (dinnerState.dinnerOverallA > limitFor3.dinnerLimit.aMax) {
            setOverLimitName(["Vakarienės", "angliavandenių", "viršyja", parseFloat(dinnerState.dinnerOverallA - limitFor3.dinnerLimit.aMax).toFixed(2)]);
            setOpenLimitModal(true);
        } else if (dinnerState.dinnerOverallA < limitFor3.dinnerLimit.aMin) {
            setOverLimitName(["Vakarienės", "angliavandenių", "nesiekia", parseFloat(limitFor3.dinnerLimit.aMin - dinnerState.dinnerOverallA).toFixed(2)]);
            setOpenLimitModal(true);
        } else if (dinnerState.dinnerOverallKcal > limitFor3.dinnerLimit.kcalMax) {
            setOverLimitName(["Vakarienės", "kilokalorijų", "viršyja", parseFloat(dinnerState.dinnerOverallKcal - limitFor3.dinnerLimit.kcalMax).toFixed(2)]);
            setOpenLimitModal(true);
        } else if (dinnerState.dinnerOverallKcal < limitFor3.dinnerLimit.kcalMin) {
            setOverLimitName(["Vakarienės", "kilokalorijų", "nesiekia", parseFloat(limitFor3.dinnerLimit.kcalMin - dinnerState.dinnerOverallKcal).toFixed(2)]);
            setOpenLimitModal(true);
        } else {
            saveDoc();
        }
    }

    return (
        <div className="CreateMenu">
            <div className="marginTop" id="marginTop">
                <div className="backBtnContainer">
                    <Button variant="contained" color="secondary" className="backBtn" onClick={() => props.history.push('/menu')}>Atgal</Button>
                </div>
            </div>
            <div style={{ alignSelf: "flex-end", marginRight: "35px" }}>
                <b style={{ color: "#FFFFFF", fontSize: "0.8em" }}>1-3m.</b>
                <Switch
                    checked={ageGroup}
                    onChange={handleSwitchChange}
                    name="ageGroupe"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                <b style={{ color: "#FFFFFF", fontSize: "0.8em" }}>4-7m.</b>
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

            <Button onClick={handleSubmit} variant="contained" color="secondary" className={classes.button} style={{ alignSelf: "center" }}>Išsaugoti</Button>
            <Snackbar open={snackbarState} autoHideDuration={6000} onClose={() => handleSnackbar("close")}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
                <Alert onClose={() => handleSnackbar("close")} severity={snackbarSeverity}>
                    {snackbarText}
                </Alert>
            </Snackbar>
            <Dialog
                open={openLimitModal}
                onClose={() => setOpenLimitModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Ar tikrai norite išsaugoti šį valgiaraštį?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {overLimitName && (
                            overLimitName[0] + " " + overLimitName[1] + " bendras kiekis " + overLimitName[2] + " " + overLimitName[3] + " g. rekomenduojamos paros normos.")
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenLimitModal(false)} color="primary" autoFocus>
                        Ne
                    </Button>
                    <Button onClick={saveDoc} color="primary" >
                        Taip
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default withRouter(CreateMenu);