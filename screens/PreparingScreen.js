import { View, Text } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";

const PreparingScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-[#4854fa]">
      <Animatable.Image
        source={require("../assets/giphy.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="w-full"
      />
      S
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg my-10 text-white font-bold text-center"
      >
        for restaurant to accept your order!
      </Animatable.Text>
      <Progress.Circle size={60} indeterminate={true} color="white" />
    </View>
  );
};

export default PreparingScreen;
