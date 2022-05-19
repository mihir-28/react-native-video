
import React from "react";
import { TouchableOpacity } from "react-native";
import IconIonicons from 'react-native-vector-icons/Ionicons'


const FullScreenButton = (props) => {

    return (
        <TouchableOpacity
        style={{ position: 'absolute', top: 16, right: 16 }}
        onPress={props.onPress}
        >
        <IconIonicons
          name="expand-sharp"
          size={24}
          color={"green"}
        />
        </TouchableOpacity>
    );
  };
  
  export default FullScreenButton;