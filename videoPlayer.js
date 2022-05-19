import React,{useRef,useState} from 'react'
import { useWindowDimensions, View } from 'react-native'
import Video from "react-native-video";
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';

const VideoPlayer=({route})=>{

  const {height, width} = useWindowDimensions();

  const [videoHeight,setVideoHeight]=useState(0);
  const [videoWidth,setVideoWidth]=useState(0);

  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('contain');

  const onSeek = (seek) => {
    videoPlayer.current.seek(seek);
  };

  const onPaused = (playerState) => {
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = (data) => {
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onload = (data) => {
    console.log(data);
    setDuration(data.duration);
    setIsLoading(false);
    setVideoWidth(data.naturalSize.width);  //get video's width
    setVideoHeight(data.naturalSize.height); //get video's hieght
    videoPlayer.current.seek(route.params.seekTime);  //this return video pages's video's current time
  };

  const onLoadStart = (data) => {
    setIsLoading(true);
  }

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == 'contain') setScreenType('cover');
    else setScreenType('contain');
  };

  const onSeeking = (currentTime) => setCurrentTime(currentTime);


  return (
    <View>
      <View style={{height: height,
          width: width,
          backgroundColor: "white",
          borderRadius: 10,
          overflow: "hidden",
          alignItems: "center"}}>
          <Video
            source={{ uri: route.params.paramKey }}  // this return video pages's video's url
            style={{
              flex: 1,
              height: videoHeight,
              width: videoWidth
            }}
            onEnd={onEnd}
            onLoadStart={onLoadStart}
            onProgress={onProgress}
            paused={paused}
            resizeMode={screenType}
            onFullScreen={isFullScreen}
            onLoad={onload}
            volume={10}
            ref={videoPlayer}
          />
          <MediaControls
            duration={duration}
            isLoading={isLoading}
            mainColor='green'
            onFullScreen={onFullScreen}
            onPaused={onPaused}
            onReplay={onReplay}
            onSeek={onSeek}
            onSeeking={onSeeking}
            playerState={playerState}
            progress={currentTime}
            showOnStart={false}
            fadeOutDelay={1000}
          />
        </View>
    </View>
  )
}

export default VideoPlayer;
