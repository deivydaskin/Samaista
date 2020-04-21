import React, { useState } from 'react';
import '../css/createMenu.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Breakfast from './Breakfast.js';
import Lunch from './Lunch.js';
import Dinner from './Dinner.js';
import Button from '@material-ui/core/Button';
import { useStyles } from '../css/inline-style/createMenuStyle.js';

function CreateMenu() {
    const classes = useStyles();
    const [breakfastState, setBreakfastState] = useState({
        nameOfMenu: "Pavadinimas",
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

    function saveDoc() {

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
            data: {
                query: `
                mutation {
                    addMenu (nameOfMenu: "${breakfastState.nameOfMenu}", breakfastData: ${breakfastUnquoted}, breakfastOverallB: ${breakfastState.breakfastOverallB}, 
                            breakfastOverallR: ${breakfastState.breakfastOverallR}, breakfastOverallA: ${breakfastState.breakfastOverallA}, breakfastOverallKcal: ${breakfastState.breakfastOverallKcal},
                            lunchData: ${lunchUnquoted}, lunchOverallB: ${lunchState.lunchOverallB}, 
                            lunchOverallR: ${lunchState.lunchOverallR}, lunchOverallA: ${lunchState.lunchOverallA}, lunchOverallKcal: ${lunchState.lunchOverallKcal},
                            dinnerData: ${dinnerUnquoted}, dinnerOverallB: ${lunchState.lunchOverallB}, 
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
                console.log(response);
                alert(response.statusText);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="CreateMenu">
            <div className="first" id="firstMargin">
                <Breakfast setBreakfastState={setBreakfastState} breakfastState={breakfastState} />
            </div>
            <div className="second" >
                <Lunch setLunchState={setLunchState} lunchState={lunchState} />
            </div>
            <div className="third" >
                <Dinner setDinnerState={setDinnerState} dinnerState={dinnerState} />
            </div>
            <div>
                <Button onClick={saveDoc} variant="contained" color="secondary" className={classes.button} style={{ alignSelf: "flex-end", marginRight: '30px' }}>Išsaugoti</Button>
            </div>
        </div >
    );
}

export default withRouter(CreateMenu);