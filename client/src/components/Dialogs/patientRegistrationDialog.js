import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import PatientRegistration from "../forms/patientRegistration";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';

const style =theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class PatientRegistrationDialog extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Dialog fullScreen open={this.props.open} onClose={this.props.handleClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={this.props.handleClose} aria-label="close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Patient Registration Form
                            </Typography>
                            <Button autoFocus color="inherit" onClick={this.props.handleClose}>
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <PatientRegistration />
                </Dialog>
            </div>
        );
    }
}
PatientRegistrationDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};
export default withStyles(style)(PatientRegistrationDialog);