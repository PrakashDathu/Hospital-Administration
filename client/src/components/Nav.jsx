import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import * as PropTypes from "prop-types";
import React from "react";
import NightsStayIcon from '@material-ui/icons/NightsStay';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


export function Nav(props) {
    return <AppBar position="absolute" className={clsx(props.classes.appBar, props.open && props.classes.appBarShift)}>
        <Toolbar className={props.classes.toolbar}>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={props.onClick}
                className={clsx(props.classes.menuButton, props.open && props.classes.menuButtonHidden)}
            >
                <MenuIcon/>
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={props.classes.title}>
                Kashyap
            </Typography>
            <IconButton
                color="inherit"
                onClick={props.onClick1}
            >
                {props.darkMode ?
                    <Brightness7Icon/>
                    :
                    <NightsStayIcon/>
                }
            </IconButton>
            <IconButton
                color="inherit"
                onClick = {() => props.logout(props.history)}
            >
                <ExitToAppIcon />
            </IconButton>
        </Toolbar>
    </AppBar>;
}

Nav.propTypes = {
    classes: PropTypes.object,
    open: PropTypes.bool,
    onClick: PropTypes.func,
    onClick1: PropTypes.any,
    darkMode: PropTypes.any
};