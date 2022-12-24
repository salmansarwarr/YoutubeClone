import React, { useState } from "react";
import "../../Styles/Videos.scss";
import {
  IconButton,
  makeStyles,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardHeader,
  Avatar,
  Tabs,
  Tab,
  AppBar,
} from "@material-ui/core";
import videosDrawerContent from "../Utilities/videoDrawerContent";
import apiKey from "../Utilities/apiKey";
import { useNavigate } from "react-router-dom";
import youtube from "../Api/youtube";

const useStyles = makeStyles({
  IconButton: {
    paddingBottom: "5px",
  },
  card: {
    width: "17.8rem",
    boxShadow: "none",
    backgroundColor: "#f9f9f9",
    "&:hover": {
      cursor: "pointer",
    },
  },
  cardImage: {
    height: "10rem",
    width: "17.8rem",
  },
  grid: {
    padding: "1rem",
  },
  tabs: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
  tab: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    minWidth: "auto",
    margin: "0 10px",
    width: "auto",
  },
  tabTypography: {
    textAlign: "center",
    backgroundColor: "rgb(235, 235, 235)",
    padding: "5px 10px",
    borderRadius: "20px",
    textTransform: "capitalize",
    margin: 0,
    fontSize: "0.8rem",
    color: "black",
    border: "1px solid lightgray",
  },
  tabBar: {
    color: "black",
    backgroundColor: "white",
    boxShadow: "none",
    borderTop: "1px solid lightgray",
    borderBottom: "1px solid lightgray",
  },
});

function Videos(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("");
  const { drawerOpen, videos, handleVideos } = props;
  const tabContent = [
    "All",
    "Music",
    "Gaming",
    "Ideas",
    "Live",
    "Comedies",
    "Art",
    "Thoughts",
    "Sports",
    "Poetry",
    "History",
    "News",
    "Entertainment",
    "Religion",
    "recently uploaded",
    "Watched",
    "New to you",
  ];

  async function handleTabClick(tab) {
    setSelectedTab(tab);
    const response = await youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 20,
        key: apiKey,
        q: tab,
      },
    });
    handleVideos(response.data.items);
  }

  return (
    <div className="videos">
      <div
        className="videos_drawer"
        style={drawerOpen ? { display: "none" } : null}
      >
        {videosDrawerContent.map(({ text, icon }, index) => (
          <div key={index}>
            <IconButton className={classes.IconButton}>{icon}</IconButton>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div
        className="videos_recommended"
        style={drawerOpen ? { marginLeft: "240px" } : null}
      >
        <AppBar position="static" className={classes.tabBar}>
          <Tabs
            value={1}
            TabIndicatorProps={{
              style: {
                display: "none",
              },
            }}
            textColor="primary"
            variant="scrollable"
          >
            {tabContent.map((item, i) => {
              return (
                <Tab
                  key={i}
                  onClick={() => handleTabClick(item)}
                  label={
                    <Typography
                      style={
                        selectedTab === ""
                          ? i === 0
                            ? {
                                backgroundColor: "black",
                                color: "white",
                                border: "none",
                              }
                            : null
                          : selectedTab === item
                          ? {
                              backgroundColor: "black",
                              color: "white",
                              border: "none",
                            }
                          : null
                      }
                      variant="subtitle1"
                      className={classes.tabTypography}
                    >
                      {item}
                    </Typography>
                  }
                  className={classes.tab}
                />
              );
            })}
          </Tabs>
        </AppBar>
        <Grid container spacing={1} className={classes.grid}>
          {videos.map((card, i) => {
            const thumbnail = card.snippet.thumbnails.high;
            const { title, channelTitle } = card.snippet;
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <Card
                  className={classes.card}
                  onClick={() => {
                    navigate(`/watch?v=${card.id.videoId}`);
                  }}
                >
                  <CardMedia
                    className={classes.cardImage}
                    image={thumbnail.url}
                    title={title}
                  />
                  <CardHeader
                    style={{ display: "flex", alignItems: "flex-start" }}
                    avatar={
                      <Avatar
                        style={{ display: "flex", alignItems: "flex-start" }}
                        src={card.avatar}
                      />
                    }
                    title={title}
                    titleTypographyProps={{ variant: "subtitle2" }}
                    subheader={
                      <Typography
                        style={{
                          color: "rgb(77, 77, 77)",
                          textAlign: "left",
                          fontSize: "12px",
                        }}
                      >
                        {channelTitle} <br /> 456k views &#183; 8 months ago
                      </Typography>
                    }
                    subheaderTypographyProps={{ variant: "caption" }}
                  />
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}

export default Videos;
