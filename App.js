import { StatusBar } from "expo-status-bar";
import RegisterNavigation from "./navigation/RegisterNavigation";
import { HomeStackNavigator } from "./navigation/RegisterNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // GestureHandler required
import Animated from "react-native-reanimated"; // Import Reanimated
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.View style={{ flex: 1 }}>
        <StatusBar style="light"></StatusBar>
        {/* <HomeStackNavigator></HomeStackNavigator> */}
        <RegisterNavigation></RegisterNavigation>
      </Animated.View>
    </GestureHandlerRootView>
  );
}
