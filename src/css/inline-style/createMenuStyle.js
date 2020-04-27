import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    button: {
        color: "#FFF",
        width: 'auto',
        boxShadow: 'none',
        margin: theme.spacing(2),
    },
    border: {
        border: '2px solid white',
        color: '#FFFFFF'
    },
    header: {
        border: '2px solid white',
        color: '#FFFFFF',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    blueHeader: {
        border: '2px solid white',
        color: '#FFFFFF',
        backgroundColor: 'rgba(133,176,255, 0.5)',
    },
    input: {
        color: '#FFFFFF',
        border: '1px solid #FFFFFF',
        padding: '5px',
    },
    select: {
        '&:before': {
            borderColor: "#FFFFFF",
        },
        '&:after': {
            borderColor: "#FFFFFF",
        }
    },
    icon: {
        fill: "#FFFFFF",
    },
    root: {
        borderRadius: "5px",
        color: "#FFFFFF"
    },
    demo: {
        backgroundColor: "#4687FF",
        minWidth: "500px",
        overflow: 'auto',
        maxHeight: 500,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
    modalPaper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 150,
        color: '#FFFFFF'
    },
    selected: {
        '&$selected': {
            color: 'white'
        }
    },
    label: {
        '&$focusedLabel': {
            color: 'white'
        },
        '&$erroredLabel': {
            color: 'white'
        }
    },
    focusedLabel: {},
    erroredLabel: {},
    underline: {
        '&$error:after': {
            borderBottomColor: 'white'
        },
        '&:after': {
            borderBottom: `1px solid white`
        }
    },
    error: {},
});