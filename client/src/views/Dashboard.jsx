import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import {Nav} from "../components/Nav";
import {Switch} from "react-router-dom";
import {Sidebar} from "../components/Sidebar";
import * as PropTypes from "prop-types";
import ProfilePage from "./ProfilePage/ProfilePage";
import PrivateRoute from "../components/PrivateRoute";
import InfoCards from "./DashboardPage/section/InfoCards";
import SearchRecords from "./SearchPage/SearchPage";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function Dashboard(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Nav
                classes={classes}
                open={open} onClick={handleDrawerOpen}
                onClick1={props.handleTheme}
                darkMode={props.isDarkMode}
                logout={props.logout}
                history={props.history}
            />
            <Sidebar classes={classes} open={open} onClick={handleDrawerClose} {...props} />
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Switch>
                        <PrivateRoute
                            isLoggedIn={true}
                            path="/dashboard/account"
                            component={ProfilePage}
                        />
                        <PrivateRoute
                            isLoggedIn={true}
                            path="/dashboard/search"
                            component={SearchRecords}
                        />
                        <PrivateRoute
                            isLoggedIn={true}
                            path="/dashboard"
                            component={InfoCards}
                        />
                    </Switch>
                </Container>
                <Copyright/>
            </main>
        </div>
    );
}
Dashboard.propTypes = {
    classes: PropTypes.object,
    isDarkMode: PropTypes.bool.isRequired,
    handleTheme: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
};


