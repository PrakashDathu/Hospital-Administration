import React, {Component} from "react";
import Avatar from "@material-ui/core/Avatar";
import {Container, LinearProgress} from '@material-ui/core';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Background from "../../assets/images/hush-naidoo-yo01Z-9HQAw-unsplash.jpg";
import { registerAction } from "./actions";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {Formik} from "formik";
import * as Yup from "yup";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}
const style =theme => ({
    root: {
        height: "100vh"
    },
    image: {
        backgroundImage: `url(${Background})`,
        backgroundRepeat: "no-repeat",
        backgroundColor: theme.palette.grey[50],
        backgroundSize: "cover",
        backgroundPosition: "center"
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
});

class SignUp extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const classes = this.props.classes;
        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                <Grid item xs={false} sm={4} md={7} className={classes.image}/>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <Formik
                            initialValues={
                                {
                                    email: '',
                                    firstName: '',
                                    lastName: '',
                                    password:'',
                                }}
                            onSubmit={(values, {setSubmitting}) => {
                                setSubmitting(true);
                                const hist = this.props.history;
                                this.props.register(values,hist);
                            }}
                            validationSchema={Yup.object().shape({
                                    email: Yup.string()
                                        .email('Invalid email')
                                        .required('Required'),
                                    firstName: Yup.string()
                                        .required('Required'),
                                    lastName: Yup.string()
                                        .required('Required'),
                                    password: Yup.string()
                                        .required('Please Enter your password')
                                        .matches(
                                            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                                        ),
                            })}
                        >
                            {(props) => {
                                const {
                                    values,
                                    touched,
                                    errors,
                                    dirty,
                                    isSubmitting,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    setFieldValue,
                                    handleReset,
                                } = props;
                                return (
                                    <form className={classes.form} onSubmit={handleSubmit}>
                                        <TextField
                                            variant="outlined"
                                            value={values.firstName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="firstName"
                                            type="text"
                                            label="First Name"
                                            name="firstName"
                                            autoFocus
                                            error={(errors.firstName && touched.firstName)}
                                            helperText={(errors.firstName && touched.firstName) && errors.firstName}
                                        />
                                        <TextField
                                            variant="outlined"
                                            value={values.lastName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="lastName"
                                            type="text"
                                            label="Last Name"
                                            name="lastName"
                                            autoFocus
                                            error={(errors.lastName && touched.lastName)}
                                            helperText={(errors.lastName && touched.lastName) && errors.lastName}
                                        />
                                        <TextField
                                            variant="outlined"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            type="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                            error={(errors.email && touched.email)}
                                            helperText={(errors.email && touched.email) && errors.email}
                                        />
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            error={(errors.password && touched.password)}
                                            helperText={(errors.password && touched.password) && errors.password}
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            disabled={isSubmitting}
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                        >
                                            Sign Up
                                        </Button>
                                    </form>
                                );
                            }}
                        </Formik>
                            <Box mt={5}>
                                <Copyright/>
                            </Box>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
});
const mapDispatchToProps = dispatch => ({
    register: (state,hist) => {
       dispatch(registerAction(state,hist));
    }
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(style)(SignUp));
