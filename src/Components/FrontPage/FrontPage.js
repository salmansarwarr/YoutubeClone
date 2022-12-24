import React, {useEffect} from "react";
import {CssBaseline} from "@material-ui/core";
import "../../Styles/Header.scss"
import Videos from "./Videos"
import apiKey from "../Utilities/apiKey"
import youtube from "../Api/youtube";

export var setSearchedVideos;

function FrontPage(props) {
    const {drawerOpen, videos, handleVideos, handleSelectedVideo} = props
    const options = ["religion", "islam","technology", "crafts", "Pakistan", "karachi", "vehicles", "news", "art", "cricket", "sports"]
    const selectedOption = options[Math.floor(Math.random()*options.length - 1)]
    
    useEffect(() => {
        async function fetchData() {
            const response = await youtube.get("search", {params: {
                part: "snippet",
                maxResults: 20,
                key: apiKey,
                q: selectedOption
            }})
            handleVideos(response.data.items)
        }
        fetchData()
    }, [])

    return (
        <div style={{display: "flex", overflow: "hidden"}}>
            <CssBaseline />
            <Videos
                drawerOpen={drawerOpen} 
                videos={videos}
                handleVideos={handleVideos}
                handleSelectedVideo={handleSelectedVideo}
            />
        </div>
    );
}

export default FrontPage
