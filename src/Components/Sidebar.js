import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  drawerContent1,
  drawerContent2,
  drawerContent3,
  drawerContent4,
} from "./Utilities/drawerContent";

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: 240,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 240,
    },
      drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },   
}))

function Sidebar(props) {
    const classes = useStyles()
    const {drawerOpen} = props

    return(      
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={drawerOpen}
            classes={{
              paper: classes.drawerPaper,
            }}
            style={!drawerOpen ? { display: "none" } : null}
        >
            <Divider />
            <Toolbar />
            <List>
              {drawerContent1.map((item, index) => (
                <ListItem button key={index} style={item.style}>
                  <ListItemIcon style={{ color: "black" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} style={{ color: "black" }} />
                </ListItem>
              ))}
              <Divider />
              {drawerContent2.map((item, index) => (
                <ListItem button key={index}>
                  <ListItemIcon style={{ color: "black" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} style={{ color: "black" }} />
                </ListItem>
              ))}
              <Divider />
              <h4 className="header_h4">MORE FROM YOUTUBE</h4>
              {drawerContent3.map((item, index) => (
                <ListItem button key={index}>
                  <ListItemIcon style={{ color: "black" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} style={{ color: "black" }} />
                </ListItem>
              ))}
              <Divider />
              {drawerContent4.map((item, index) => (
                <ListItem button key={index}>
                  <ListItemIcon style={{ color: "black" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} style={{ color: "black" }} />
                </ListItem>
              ))}
              <Divider />
              <div className="header_drawer_footer">
                <div>
                  <span>About</span> <span>Press</span> <span>Copyright</span>{" "}
                  <span>Contact us</span> <span>Creator</span>{" "}
                  <span>Advertise</span> <span>Developers</span>
                </div>
                <div>
                  <span>Terms</span> <span>Privacy</span>{" "}
                  <span>Policy {"&"} Safety</span> <span>How YouTube works</span>{" "}
                  <br /> <span>Test new features</span>
                </div>
                <p> © 2022 Google LLC</p>
              </div>
            </List>
        </Drawer>
    )
}

export default Sidebar
  