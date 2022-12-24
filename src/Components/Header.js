import React, {useState} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MicNoneOutlinedIcon from "@material-ui/icons/MicNoneOutlined";
import VideoCallOutlinedIcon from "@material-ui/icons/VideoCallOutlined";
import AppsOutlinedIcon from "@material-ui/icons/AppsOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import Avatar from "@material-ui/core/Avatar";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import apiKey from "./Utilities/apiKey"
import youtube from "./Api/youtube";

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: "white",
        boxShadow: "none",
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        zIndex: theme.zIndex.drawer + 1,
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    avatar: {
        height: "33px",
        width: "33px",
    },
}))

function Header(props) {
  const [searchTerm, setSearchTerm] = useState()
  const { drawerOpen, handleDrawer, handleVideos } = props

  async function handleSubmit(term) {
    const response = await youtube.get("search", {params: {
      part: "snippet",
      maxResults: 20,
      key: apiKey,
      q: term
    }})
    handleVideos(response.data.items)
  }

  function handleChange(event) {
    setSearchTerm(event.target.value)
  }

  const classes = useStyles()
  return (
      <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className="header_left">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={!drawerOpen ? () => handleDrawer(true) : () => handleDrawer(false)}
            edge="start"
            className={classes.menuButton}
            style={{ color: "black" }}
          >
            <MenuIcon />
          </IconButton>
          <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
            <img
              className="header_logo"
              src="https://upload.wikimedia.org/wikipedia/commons/1/13/YOUTUBE_LOGO.png"
              alt="YouTube"
            />
          </a>
        </div>
        <form className="header_input" onSubmit={(event) => {
          handleSubmit(searchTerm)
          event.preventDefault()
        }}>
          <input 
            type="text" 
            placeholder="Search" 
            value={searchTerm}
            onChange={handleChange} 
          />
          <div className="header_input_button" >
            <SearchOutlinedIcon style={{ color: "black" }} onClick={() => handleSubmit(searchTerm)}/>
          </div>
          <IconButton>
            <MicNoneOutlinedIcon style={{ color: "black" }} />
          </IconButton>
        </form>
        <div className="header_icons">
          <IconButton>
            <VideoCallOutlinedIcon style={{ color: "black" }} />
          </IconButton>
          <IconButton>
            <AppsOutlinedIcon style={{ color: "black" }} />
          </IconButton>
          <IconButton>
            <NotificationsNoneOutlinedIcon style={{ color: "black" }} />
          </IconButton>
          <IconButton>
            <Avatar
              className={classes.avatar}
              src="https://lh3.googleusercontent.com/a-/AOh14GjIekkbxx8hcimYGopj6ltYhmSGVkuftLFo9xnT=s96-c-rg-br100"
              alt="Salman"
            />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
