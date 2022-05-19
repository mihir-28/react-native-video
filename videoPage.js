
import React, { useState, useRef } from "react";
import Video from "react-native-video";
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import {StyleSheet,View,Button} from 'react-native'
import FullScreenButton from "./fullScreenButton";

const VideoPage = ({navigation}) => {

    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
  
  
    const videoPlayer = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [paused, setPaused] = useState(false);
    const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
    const [screenType, setScreenType] = useState('contain');

    const dataVideo='https://d1wd77iqpfpytn.cloudfront.net/public/thejoint-701310692594897607-1652360230405.mp4'
  
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
        setCurrentTime(data.currentTime+1);
      }
    };
  
    const onload = (data) => {
      console.log(data);
      setDuration(data.duration);
      setIsLoading(false);
      setWidth(data.naturalSize.width);
      setHeight(data.naturalSize.height);
    };
  
    const onLoadStart = (data) => setIsLoading(true);
  
    const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);
  
    const onFullScreen = () => {
      setIsFullScreen(isFullScreen);
      if (screenType == 'contain') setScreenType('cover');
      else setScreenType('contain');
    };
  
    const onSeeking = (currentTime) => setCurrentTime(currentTime);
  
  
    return (
      <View style={{backgroundColor:"black",flex:1}}>
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: dataVideo }}
            style={{
              flex: 1,
              height: height,
              width: width
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
          <FullScreenButton 
        onPress={()=>navigation.navigate('VideoPlayer',{paramKey:dataVideo,seekTime:currentTime})}
        />
        </View>
        
      </View>
    )
  }

  
export default VideoPage;


const styles = StyleSheet.create({

    videoContainer: {
      height: 300,
      backgroundColor: "white",
      borderRadius: 10,
      overflow: "hidden",
      alignItems: "center"
    },
  });