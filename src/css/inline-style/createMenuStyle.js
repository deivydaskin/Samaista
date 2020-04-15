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
        backgroundColor: 'rgba(254, 149, 173, 0.5)',
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