import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import PropTypes from "prop-types";
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Profile from "./profile";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import PrescriptionCard from "./prescriptionCard";
import {loadPatientPrescription} from "../actions";
import {connect} from "react-redux";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const style =theme => ({
    fab: {
        position: 'absolute',
        top: theme.spacing(2),
        left: theme.spacing(1),
        zIndex: 999999,
    },
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class PatientInfoDialog extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state={
            value: 0,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.open && this.props.open) {
            const { details, doctor } = this.props;
            this.props.load(doctor._id, details._id);
        }
    }

    handleChange(event, newValue) {
        this.setState({
            value: newValue,
        });
    }
    render() {
        const { details, close, prescriptions } = this.props;
        const value = this.state.value;
        return (
            <Dialog
                fullScreen
                open={this.props.open}
                TransitionComponent={Transition}
            >
                <GridContainer spacing={1}>
                    <GridItem xs={12} sm ={12} md={3} lg={3}>
                        <Profile
                            details={details}
                            close={close}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={9} lg={9}>
                        <AppBar position="static" >
                            <Tabs
                                value={value}
                                onChange={this.handleChange}
                                centered
                            >
                                <Tab label="Prescriptions" icon={<AssignmentIcon />} {...a11yProps(0)} />
                                <Tab label="Reports" icon={<LocalHospitalIcon />} {...a11yProps(1)} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0}>
                            <GridContainer>
                                {prescriptions.length>0 &&
                                    prescriptions.map((prescription, index) => (
                                        <GridItem xs={12} md={4} lg={4}>
                                            <PrescriptionCard prescription={prescription} key={index}/>
                                        </GridItem>
                                    ))
                                }
                            </GridContainer>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Item Two
                        </TabPanel>
                    </GridItem>
                </GridContainer>
            </Dialog>
        );
    }
}
PatientInfoDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    details: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired,
    doctor: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    prescriptions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
const mapStateToProps = state => ({
    doctor: state.auth.user,
    prescriptions: state.data.prescriptions,
});
const mapDispatchToProps = dispatch => ({
    load: (did,pid) => {
        console.log(did);
        dispatch(loadPatientPrescription(did, pid));
    }
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(style)(PatientInfoDialog));