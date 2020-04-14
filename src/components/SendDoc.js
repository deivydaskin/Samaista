import React, { useState, useEffect } from 'react';
import '../css/App.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import jsPDF from "jspdf";
import "jspdf-autotable";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import EmailIcon from '@material-ui/icons/Email';


const useStyles = makeStyles(theme => ({
    button: {
        borderRadius: 50,
        backgroundColor: "#C29FFF",
        color: "#FFF",
        padding: '16px 59.5725px 16px',
        width: 'auto',
        boxShadow: 'none',
        margin: theme.spacing(2),
    },
    root: {
        width: '100%',
        minWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

function SendDoc(props) {
    const classes = useStyles();

    const [dataState, setDataState] = useState([]);
    const [menuState, setMenuState] = useState([]);

    useEffect(() => {
        getTechCards();
        getMenuCards();
    }, [])


    function getTechCards(name, i) {
        axios({
            url: 'http://localhost:3000/graphql',
            method: 'POST',
            data: {
                query: `
                query{
                    TechCards {
                      nameOfCard
                      description
                      overallB
                      overallR
                      overallA
                      overallKcal
                      yield
                    }
                }
                `
            }
        })
            .then((response) => {
                setDataState(response.data.data.TechCards);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function getMenuCards(name, i) {
        axios({
            url: 'http://localhost:3000/graphql',
            method: 'POST',
            data: {
                query: `
                query{
                    Menus {
                        nameOfMenu
                        overallB
                        overallR
                        overallA
                        overallKcal
                      }
                }
                `
            }
        })
            .then((response) => {
                setMenuState(response.data.data.Menus);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const techCardSend = i => e => {
        let payload = dataState[i];
        axios
            .post(`api/sendEmail`, {
                payload
            }
            )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const techCardPDF = i => e => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Technologine kortele";
        const headers = [["Eil. Nr.", "Pavadinimas", "Bruto, g", "Neto, g", "Baltymai, g", "Riebalai, g", "Angliavandeniai, g", "Energine verte, kcal"]];

        const data = dataState[i].data.map(elt => [elt.number, elt.name, elt.bruto, elt.neto, elt.b, elt.r, elt.a, elt.kcal]);

        let content = {
            startY: 150,
            head: headers,
            body: data
        };
        const title2 = dataState[i].nameOfCard;

        doc.text(title, 300, 100, { align: "center" });
        doc.text(title2, 300, 130, { align: "center" });
        doc.autoTable(content);
        doc.text(dataState[i].description, 300, 300, { align: "center" });
        doc.save(`techKortele-${title2}.pdf`)
        console.log(doc);
    }

    const menuPDF = i => e => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Valgiarastis";
        const headers = [["Eil. Nr.", "Pavadinimas", "Iseiga", "Baltymai, g", "Riebalai, g", "Angliavandeniai, g", "Energine verte, kcal"]];

        const menuData = menuState[i].data.map(elt => [elt.number, elt.name, elt.yield, elt.b, elt.r, elt.a, elt.kcal]);

        let content = {
            startY: 150,
            head: headers,
            body: menuData
        };
        const title2 = menuState[i].nameOfMenu;

        doc.text(title, 300, 100, { align: "center" });
        doc.text(title2, 300, 130, { align: "center" });
        doc.autoTable(content);
        doc.save(`menu-${title2}.pdf`)
        console.log(doc);
    }


    return (
        <div>
            <Button variant="contained" color="primary" className={classes.button} onClick={() => props.history.push('/Menu')} style={{ marginRight: "500px", marginBottom: 0 }}>Atgal</Button>
            <div className="SendDoc">
                <h5>Technologinės kortelės</h5>
                <Paper >
                    <List className={classes.root}>
                        {dataState.map((row, i) =>
                            <ListItem key={i} role={undefined} dense>
                                <ListItemText id={i} primary={row.nameOfCard} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="comments" onClick={techCardPDF(i)}>
                                        <PictureAsPdfIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="comments" onClick={techCardSend(i)}>
                                        <EmailIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )}
                    </List>

                </Paper>
                <h5>Valgiaraščiai</h5>
                <Paper>

                    <List className={classes.root}>
                        {menuState.map((row, i) =>
                            <ListItem key={i} role={undefined} dense>
                                <ListItemText id={i} primary={row.nameOfMenu} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="comments" onClick={menuPDF(i)}>
                                        <PictureAsPdfIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )}
                    </List>
                </Paper >
            </div >
        </div>
    );
}

export default withRouter(SendDoc);