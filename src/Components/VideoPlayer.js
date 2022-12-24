import React, {useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import youtube from './Api/youtube'
import apiKey from './Utilities/apiKey'
import { IconButton, makeStyles, Card, CardMedia } from '@material-ui/core'
import {
    ThumbUpAltOutlined, ThumbDownAltOutlined, ShareOutlined, 
    AllInclusiveOutlined, PlaylistAddOutlined, MoreHorizOutlined
} from '@material-ui/icons';
import '../Styles/VideoPlayer.scss'
// import relatedVideos from './mockdata'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles({
    IconButton: {
        fontSize: "0.9rem",
        textTransform: "uppercase",
        color: "black",
        padding: 0,
        marginRight: "1rem"
    },
    icon: {
        marginRight: "5px"
    },
    card: {
        width: "100%",
        boxShadow: "none",
        backgroundColor: "#f9f9f9",
        display: "flex",
        padding: "5px",
        '&:hover': {
          cursor: "pointer"
        }
    },
    cardImage: {
        height: "8rem",
        width: "175%",
        marginRight: "5px"
    },
})

function VideoPlayer() {
    const classes = useStyles()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [videoId, setVideoId] = useState(searchParams.get("v"))
    const [relatedVideos, setRelatedVideos] = useState(null)
    const views = Math.floor(Math.random() * 1000)
    const days = Math.floor(Math.random() * 29)
    const videoSrc = `https://www.youtube.com/embed/${videoId}`

    const handleClick = (id, video) => {
        navigate(`/watch?v=${id}`)
        setSelectedVideo(video)
        window.location.reload()
    }

    useEffect(() => {
        async function fetchDataVideo() {
            const response1 = await youtube.get("videos", {params: {
                part: "snippet",
                maxResults: 20,
                key: apiKey,
                id: videoId
            }})
            setSelectedVideo(response1.data.items[0])
            const response2 = await youtube.get("search", {params: {
                part: "snippet",
                maxResults: 4,
                key: apiKey,
                q: response1.data.items[0].snippet.title.split("")[0]
            }})
            setRelatedVideos(response2.data.items)
        }
        fetchDataVideo()
        
        // async function fetchDataRelated() {
        //     const response = await youtube.get("search", {params: {
        //         part: "snippet",
        //         maxResults: 4,
        //         key: apiKey,
        //         q: selectedVideo.snippet.title.split("")[0]
        //     }})
        //     setRelatedVideos(response.data.items)
        // }
        // fetchDataRelated()
    }, [])

    return (
        <div className='root'>
        {selectedVideo && 
            <div className='left'>
                <iframe frameBorder='none' title="video" className='player' src={videoSrc}/>
                <div className='name'>
                    <p>{selectedVideo.snippet.title}</p>
                    <div className='name_bottom'>
                        <p>786k views &#183; Published at {selectedVideo.snippet.publishedAt.slice(0, 10)} </p>
                        <div className='name_bottom_left'>
                            <IconButton className={classes.IconButton}>
                                <ThumbUpAltOutlined className={classes.icon}/>
                                Like
                            </IconButton>
                            <IconButton className={classes.IconButton}>
                                <ThumbDownAltOutlined className={classes.icon}/>
                                Dislike
                            </IconButton>
                            <IconButton className={classes.IconButton}>
                                <ShareOutlined className={classes.icon}/>
                                Share
                            </IconButton>
                            <IconButton className={classes.IconButton}>
                                <AllInclusiveOutlined className={classes.icon}/>
                                Clip
                            </IconButton>
                            <IconButton className={classes.IconButton}>
                                <PlaylistAddOutlined className={classes.icon}/>
                                Save
                            </IconButton>
                            <IconButton className={classes.IconButton}>
                                <MoreHorizOutlined className={classes.icon}/>
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        }
        {
            relatedVideos &&
            <div className='right'>
                {relatedVideos.map((item, i) => {
                    return(
                        <Card 
                            className={classes.card} 
                            key={i}
                            onClick={() => handleClick(item.id.videoId, item)}
                        >
                            <CardMedia 
                                className={classes.cardImage}
                                title={item.snippet.title}
                                image={item.snippet.thumbnails.high.url} 
                            />
                            <div className="text">
                                <p className='name'>{selectedVideo.snippet.title}</p>
                                <p className='small'>
                                    {item.snippet.channelTitle} <br/> {views}kviews &#183; {days} days ago 
                                </p>
                            </div>
                        </Card>
                    )
                })} 
            </div>
        }
        </div>
    )
}

export default VideoPlayer