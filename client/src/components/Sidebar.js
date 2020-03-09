import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import { secondaryListItems } from "./listItems";
import * as PropTypes from "prop-types";
import React from "react";
import routes from "../routes";
import { NavLink } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

export function Sidebar(props) {
  function activeRoute(routeName) {
    return (props.location.pathname === routeName);
  }
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(
          props.classes.drawerPaper,
          !props.open && props.classes.drawerPaperClose
        )
      }}
      open={props.open}
    >
      <div className={props.classes.toolbarIcon}>
        <IconButton onClick={props.onClick}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {routes.map((route, index) => (
          <ListItem
            button
            component={NavLink}
            to={route.layout+route.path}
            key={index}
            selected={activeRoute(route.layout+route.path)}
          >
            <ListItemIcon>{<route.icon />}</ListItemIcon>
            <ListItemText primary={route.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>{secondaryListItems}</List>
    </Drawer>
  );
}

Sidebar.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  onClick: PropTypes.func,
  location: PropTypes.object.isRequired
};
