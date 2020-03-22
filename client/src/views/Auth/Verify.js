import React, {Component} from "react";
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import Background from "../../assets/images/hush-naidoo-yo01Z-9HQAw-unsplash.jpg";
import * as PropTypes from "prop-types";
import {verifyAction} from "./actions";
import {connect} from "react-redux";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

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

class Verify extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        const token = this.props.match.params.token;
        this.props.verify(token, this.props.history);
    }
    handleChange(e) {
        let value = e.target.value;
        this.setState({
            email: value,
        });
    }
    render() {
        const classes = this.props.classes;
        return (
            <React.Fragment>
                <Box color="text.secondary" p={1}>
                    <Typography variant="h4" component="h2">
                        Unable to verify!! , Please enter your Email Address.<br />
                        We will send you a new token. Thanks :-)
                    </Typography>
                </Box>
            <form>
                <GridContainer
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <GridItem xs={10} md={6} lg={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={this.state.email}
                            onChange={this.handleChange}
                            id="email"
                            type="email"
                            label="Email Address"
                            name="email"
                            />
                    </GridItem>
                    <GridItem xs={5} md={2} lg={2}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Resend Token
                        </Button>
                    </GridItem>
                </GridContainer>
            </form>
            </React.Fragment>
        );
    }
}

Verify.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    verify: PropTypes.func.isRequired,
};
const mapDispatchToProps = dispatch => ({
    verify: (token, hist) => {
        dispatch(verifyAction(token, hist));
    }
});
export default  connect(
    null,
    mapDispatchToProps
)(withStyles(style)(Verify));
