import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../css/inline-style/createMenuStyle.js';
import TextFieldMui from '@material-ui/core/TextField';
import { age3, age7 } from './LegalLimits';
import { useAuth0 } from "../../react-auth0-spa";
import axios from 'axios';

const TextField1 = withStyles(styles)(function TextField({ classes, ...props }) {
    return (
        <TextFieldMui
            InputLabelProps={{
                classes: {
                    root: classes.label,
                    focused: classes.focusedLabel,
                    error: classes.erroredLabel
                }
            }}
            InputProps={{
                classes: {
                    root: classes.underline,
                    error: classes.error
                }
            }}
            {...props}
        />
    );
});


function Norms(props) {
    const { getTokenSilently } = useAuth0();

    const [age3s, setAge3s] = useState(age3);
    const [age7s, setAge7s] = useState(age7);

    async function updateNorms() {
        const token = await getTokenSilently();
        axios({
            url: 'https://samaista.herokuapp.com/graphql',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                query: `
                mutation{
                        updateNorm(ageGroup: ${3}, breakFastLimit:{kcalMin: ${age3s.breakFastLimit.kcalMin}, kcalMax: ${age3s.breakFastLimit.kcalMax}, bMin: ${age3s.breakFastLimit.bMin}, bMax: ${age3s.breakFastLimit.bMax}, rMin: ${age3s.breakFastLimit.rMin}, rMax: ${age3s.breakFastLimit.rMax}, aMin: ${age3s.breakFastLimit.aMin}, aMax: ${age3s.breakFastLimit.aMax}},
                             lunchLimit: {kcalMin: ${age3s.lunchLimit.kcalMin}, kcalMax: ${age3s.lunchLimit.kcalMax}, bMin: ${age3s.lunchLimit.bMin}, bMax: ${age3s.lunchLimit.bMax}, rMin: ${age3s.lunchLimit.rMin}, rMax: ${age3s.lunchLimit.rMax}, aMin: ${age3s.lunchLimit.aMin}, aMax: ${age3s.lunchLimit.aMax}},
                             dinnerLimit: {kcalMin: ${age3s.dinnerLimit.kcalMin}, kcalMax: ${age3s.dinnerLimit.kcalMax}, bMin: ${age3s.dinnerLimit.bMin}, bMax: ${age3s.dinnerLimit.bMax}, rMin: ${age3s.dinnerLimit.rMin}, rMax: ${age3s.dinnerLimit.rMax}, aMin: ${age3s.dinnerLimit.aMin}, aMax: ${age3s.dinnerLimit.aMax}}){
                          ageGroup
                          breakFastLimit {
                            kcalMin
                            kcalMax
                            bMin
                            bMax
                            rMin
                            rMax
                            aMin
                            aMax
                          }
                          lunchLimit {
                            kcalMin
                            kcalMax
                            bMin
                            bMax
                            rMin
                            rMax
                            aMin
                            aMax
                          }
                          dinnerLimit {
                            kcalMin
                            kcalMax
                            bMin
                            bMax
                            rMin
                            rMax
                            aMin
                            aMax
                          }
                        }
                      }
                `
            }
        })
            .then((response) => {
            })
            .catch((error) => {
                console.log(error);
            });
        axios({
            url: 'https://samaista.herokuapp.com/graphql',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                query: `
                    mutation{
                            updateNorm(ageGroup: ${7}, breakFastLimit:{kcalMin: ${age7s.breakFastLimit.kcalMin}, kcalMax: ${age7s.breakFastLimit.kcalMax}, bMin: ${age7s.breakFastLimit.bMin}, bMax: ${age7s.breakFastLimit.bMax}, rMin: ${age7s.breakFastLimit.rMin}, rMax: ${age7s.breakFastLimit.rMax}, aMin: ${age7s.breakFastLimit.aMin}, aMax: ${age7s.breakFastLimit.aMax}},
                                 lunchLimit: {kcalMin: ${age7s.lunchLimit.kcalMin}, kcalMax: ${age7s.lunchLimit.kcalMax}, bMin: ${age7s.lunchLimit.bMin}, bMax: ${age7s.lunchLimit.bMax}, rMin: ${age7s.lunchLimit.rMin}, rMax: ${age7s.lunchLimit.rMax}, aMin: ${age7s.lunchLimit.aMin}, aMax: ${age7s.lunchLimit.aMax}},
                                 dinnerLimit: {kcalMin: ${age7s.dinnerLimit.kcalMin}, kcalMax: ${age7s.dinnerLimit.kcalMax}, bMin: ${age7s.dinnerLimit.bMin}, bMax: ${age7s.dinnerLimit.bMax}, rMin: ${age7s.dinnerLimit.rMin}, rMax: ${age7s.dinnerLimit.rMax}, aMin: ${age7s.dinnerLimit.aMin}, aMax: ${age7s.dinnerLimit.aMax}}){
                              ageGroup
                              breakFastLimit {
                                kcalMin
                                kcalMax
                                bMin
                                bMax
                                rMin
                                rMax
                                aMin
                                aMax
                              }
                              lunchLimit {
                                kcalMin
                                kcalMax
                                bMin
                                bMax
                                rMin
                                rMax
                                aMin
                                aMax
                              }
                              dinnerLimit {
                                kcalMin
                                kcalMax
                                bMin
                                bMax
                                rMin
                                rMax
                                aMin
                                aMax
                              }
                            }
                          }
                    `
            }
        })
            .then((response) => {
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleChange = i => e => {
        let temp3Obj = { ...props.age3State };
        let temp7Obj = { ...props.age7State };
        if (e.target.name === "breakfast3") {
            temp3Obj.breakFastLimit[e.target.id] = parseInt(e.target.value);
        }
        else if (e.target.name === "lunch3") {
            temp3Obj.lunchLimit[e.target.id] = parseInt(e.target.value);
        }
        else if (e.target.name === "dinner3") {
            temp3Obj.dinnerLimit[e.target.id] = parseInt(e.target.value);
        }
        else if (e.target.name === "breakfast7") {
            temp7Obj.breakFastLimit[e.target.id] = parseInt(e.target.value);
        }
        else if (e.target.name === "lunch7") {
            temp7Obj.lunchLimit[e.target.id] = parseInt(e.target.value);
        }
        else if (e.target.name === "dinner7") {
            temp7Obj.dinnerLimit[e.target.id] = parseInt(e.target.value);
        }
        setAge3s(temp3Obj);
        setAge7s(temp7Obj);

    }
    function handleClick() {
        updateNorms();
        props.setEditNorms(false);
    }
    return (
        <div className="Norms">
            <Dialog
                open={props.editNorms}
                onClose={() => props.setEditNorms(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                scroll="body"
            >
                <DialogTitle id="alert-dialog-title">{"Įstatymų dienos rekomenduojamos normos"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Pusryčiai:
                    </DialogContentText>
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age3s.breakFastLimit.kcalMax || ""}
                        onChange={handleChange()}
                        helperText="Kcal Max"
                        name="breakfast3"
                        id="kcalMax"
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age3s.breakFastLimit.kcalMin}
                        onChange={handleChange()}
                        helperText="Kcal Min"
                        name="breakfast3"
                        id="kcalMin"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age3s.breakFastLimit.bMax}
                        onChange={handleChange()}
                        helperText="B Max"
                        name="breakfast3"
                        id="bMax"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age3s.breakFastLimit.bMin}
                        onChange={handleChange()}
                        helperText="B Min"
                        name="breakfast3"
                        id="bMin"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age3s.breakFastLimit.rMax}
                        onChange={handleChange()}
                        helperText="R Max"
                        name="breakfast3"
                        id="rMax"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age3s.breakFastLimit.rMin}
                        onChange={handleChange()}
                        helperText="R Min"
                        name="breakfast3"
                        id="rMin"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age3s.breakFastLimit.aMax}
                        onChange={handleChange()}
                        helperText="A Max"
                        name="breakfast3"
                        id="aMax"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age3s.breakFastLimit.aMin}
                        onChange={handleChange()}
                        helperText="A Min"
                        name="breakfast3"
                        id="aMin"
                        style={{ marginLeft: "5px" }}
                    />
                </DialogContent>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Pietūs:
                    </DialogContentText>
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age3s.lunchLimit.kcalMax}
                        onChange={handleChange()}
                        helperText="Kcal Max"
                        name="lunch3"
                        id="kcalMax"
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age3s.lunchLimit.kcalMin}
                        onChange={handleChange()}
                        helperText="Kcal Min"
                        name="lunch3"
                        id="kcalMin"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age3s.lunchLimit.bMax}
                        onChange={handleChange()}
                        helperText="B Max"
                        name="lunch3"
                        id="bMax"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age3s.lunchLimit.bMin}
                        onChange={handleChange()}
                        helperText="B Min"
                        name="lunch3"
                        id="bMin"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age3s.lunchLimit.rMax}
                        onChange={handleChange()}
                        helperText="R Max"
                        name="lunch3"
                        id="rMax"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age3s.lunchLimit.rMin}
                        onChange={handleChange()}
                        helperText="R Min"
                        name="lunch3"
                        id="rMin"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age3s.lunchLimit.aMax}
                        onChange={handleChange()}
                        helperText="A Max"
                        name="lunch3"
                        id="aMax"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age3s.lunchLimit.aMin}
                        onChange={handleChange()}
                        helperText="A Min"
                        name="lunch3"
                        id="aMin"
                        style={{ marginLeft: "5px" }}
                    />
                </DialogContent>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Vakarienė:
                    </DialogContentText>
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age3s.dinnerLimit.kcalMax}
                        onChange={handleChange()}
                        helperText="Kcal Max"
                        name="dinner3"
                        id="kcalMax"
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age3s.dinnerLimit.kcalMin}
                        onChange={handleChange()}
                        helperText="Kcal Min"
                        name="dinner3"
                        id="kcalMin"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age3s.dinnerLimit.bMax}
                        onChange={handleChange()}
                        helperText="B Max"
                        name="dinner3"
                        id="bMax"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age3s.dinnerLimit.bMin}
                        onChange={handleChange()}
                        helperText="B Min"
                        name="dinner3"
                        id="bMin"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age3s.dinnerLimit.rMax}
                        onChange={handleChange()}
                        helperText="R Max"
                        name="dinner3"
                        id="rMax"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age3s.dinnerLimit.rMin}
                        onChange={handleChange()}
                        helperText="R Min"
                        name="dinner3"
                        id="rMin"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age3s.dinnerLimit.aMax}
                        onChange={handleChange()}
                        helperText="A Max"
                        name="dinner3"
                        id="aMax"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age3s.dinnerLimit.aMin}
                        onChange={handleChange()}
                        helperText="A Min"
                        name="dinner3"
                        id="aMin"
                        style={{ marginLeft: "5px" }}
                    />
                </DialogContent>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Pusryčiai:
                    </DialogContentText>
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age7s.breakFastLimit.kcalMax}
                        onChange={handleChange()}
                        helperText="Kcal Max"
                        name="breakfast7"
                        id="kcalMax"
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age7s.breakFastLimit.kcalMin}
                        onChange={handleChange()}
                        helperText="Kcal Min"
                        name="breakfast7"
                        id="kcalMin"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age7s.breakFastLimit.bMax}
                        onChange={handleChange()}
                        helperText="B Max"
                        name="breakfast7"
                        id="bMax"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age7s.breakFastLimit.bMin}
                        onChange={handleChange()}
                        helperText="B Min"
                        name="breakfast7"
                        id="bMin"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age7s.breakFastLimit.rMax}
                        onChange={handleChange()}
                        helperText="R Max"
                        name="breakfast7"
                        id="rMax"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age7s.breakFastLimit.rMin}
                        onChange={handleChange()}
                        helperText="R Min"
                        name="breakfast7"
                        id="rMin"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age7s.breakFastLimit.aMax}
                        onChange={handleChange()}
                        helperText="A Max"
                        name="breakfast7"
                        id="aMax"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age7s.breakFastLimit.aMin}
                        onChange={handleChange()}
                        helperText="A Min"
                        name="breakfast7"
                        id="aMin"
                        style={{ marginLeft: "5px" }}
                    />
                </DialogContent>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Pietūs:
                    </DialogContentText>
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age7s.lunchLimit.kcalMax}
                        onChange={handleChange()}
                        helperText="Kcal Max"
                        name="lunch7"
                        id="kcalMax"
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age7s.lunchLimit.kcalMin}
                        onChange={handleChange()}
                        helperText="Kcal Min"
                        name="lunch7"
                        id="kcalMin"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age7s.lunchLimit.bMax}
                        onChange={handleChange()}
                        helperText="B Max"
                        name="lunch7"
                        id="bMax"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age7s.lunchLimit.bMin}
                        onChange={handleChange()}
                        helperText="B Min"
                        name="lunch7"
                        id="bMin"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age7s.lunchLimit.rMax}
                        onChange={handleChange()}
                        helperText="R Max"
                        name="lunch7"
                        id="rMax"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age7s.lunchLimit.rMin}
                        onChange={handleChange()}
                        helperText="R Min"
                        name="lunch7"
                        id="rMin"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age7s.lunchLimit.aMax}
                        onChange={handleChange()}
                        helperText="A Max"
                        name="lunch7"
                        id="aMax"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age7s.lunchLimit.aMin}
                        onChange={handleChange()}
                        helperText="A Min"
                        name="lunch7"
                        id="aMin"
                        style={{ marginLeft: "5px" }}
                    />
                </DialogContent>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Vakarienė:
                    </DialogContentText>
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age7s.dinnerLimit.kcalMax}
                        onChange={handleChange()}
                        helperText="Kcal Max"
                        name="dinner7"
                        id="kcalMax"
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age7s.dinnerLimit.kcalMin}
                        onChange={handleChange()}
                        helperText="Kcal Min"
                        name="dinner7"
                        id="kcalMin"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age7s.dinnerLimit.bMax}
                        onChange={handleChange()}
                        helperText="B Max"
                        name="dinner7"
                        id="bMax"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age7s.dinnerLimit.bMin}
                        onChange={handleChange()}
                        helperText="B Min"
                        name="dinner7"
                        id="bMin"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age7s.dinnerLimit.rMax}
                        onChange={handleChange()}
                        helperText="R Max"
                        name="dinner7"
                        id="rMax"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age7s.dinnerLimit.rMin}
                        onChange={handleChange()}
                        helperText="R Min"
                        name="dinner7"
                        id="rMin"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age7s.dinnerLimit.aMax}
                        onChange={handleChange()}
                        helperText="A Max"
                        name="dinner7"
                        id="aMax"
                        style={{ marginLeft: "5px" }}
                    />
                    <TextField1
                        inputProps={{
                            style: { color: '#000', width: 50 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={age7s.dinnerLimit.aMin}
                        onChange={handleChange()}
                        helperText="A Min"
                        name="dinner7"
                        id="aMin"
                        style={{ marginLeft: "5px" }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.setEditNorms(false)} color="primary" autoFocus>
                        Uždaryti
                            </Button>
                    <Button onClick={() => { handleClick() }} color="primary" >
                        Išsaugoti
                            </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default withRouter(Norms);