import HomeIcon from "@material-ui/icons/Home";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import SlowMotionVideoOutlinedIcon from "@material-ui/icons/SlowMotionVideoOutlined";
import VideoLibraryOutlinedIcon from "@material-ui/icons/VideoLibraryOutlined";
import SubscriptionsOutlinedIcon from "@material-ui/icons/SubscriptionsOutlined";

const videosDrawerContent = [
    {
      text: "Home",
      icon: <HomeIcon style={{ color: "black" }} />,
    },
    {
      text: "Explore",
      icon: <ExploreOutlinedIcon style={{ color: "black" }} />,
    },
    {
      text: "Shorts",
      icon: <SlowMotionVideoOutlinedIcon style={{ color: "black" }} />,
    },
    {
      text: "Subscription",
      icon: <SubscriptionsOutlinedIcon style={{ color: "black" }} />,
    },
    {
      text: "Library",
      icon: <VideoLibraryOutlinedIcon style={{ color: "black" }} />,
    },
];

export default videosDrawerContent