import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SplashScreen from "./src/screens/SplashScreen";
import HomeScreen from "./src/screens/HomeScreen";
import { useEffect, useState } from "react";

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() =>{
    setTimeout(() =>{
      setIsShowSplash(false);
    }, 3000)
  });
  return <>{isShowSplash ? <SplashScreen/> : <HomeScreen />}</>;
}
