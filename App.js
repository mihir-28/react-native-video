// npm install react-native-video
// npm install react-native-media-controls
// npm install react-native-slider
// npm install @react-navigation/native
// npm install @react-navigation/stack
// npm install react-native-gesture-handler 
// npm install react-native-safe-area-context
// npm install react-native-screens
// npm install react-native-vector-icons

// add on  --->>>   android/build.gradle

// jcenter() {
//   content {
//       includeModule("com.yqritc", "android-scalablevideoview")
//   }

import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VideoPlayer from "./videoPlayer";
import VideoPage from "./videoPage";

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="VideoPage">
        <Stack.Screen
          name="VideoPage"
          component={VideoPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VideoPlayer"
          component={VideoPlayer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;

