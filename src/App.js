import React, {useState} from "react";
import "./Styles/Header.scss";
import FrontPage from "./Components/FrontPage/FrontPage";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./Components/Header"
import VideoPlayer from "./Components/VideoPlayer"
import Sidebar from "./Components/Sidebar"

function App() {
    const [drawerOpen, setDrawerOpen] = useState()
    const [videos, setVideos] = useState([])
    const handleVideos = items => setVideos(items)
    const handleDrawer = bool => setDrawerOpen(bool)

    return (
        <BrowserRouter>
            <Header 
                drawerOpen={drawerOpen} 
                handleDrawer={handleDrawer}
                handleVideos={handleVideos}
            />
            <Sidebar 
                drawerOpen={drawerOpen}
            />
            <Routes>
                <Route path="/" element={
                    <FrontPage
                        drawerOpen={drawerOpen} 
                        videos={videos}
                        handleVideos={handleVideos}
                    />
                }/>
                <Route path="/:id" element={<VideoPlayer />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App
