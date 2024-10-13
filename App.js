import { StatusBar } from "expo-status-bar";
import RegisterNavigation from "./navigation/RegisterNavigation";
import { HomeStackNavigator } from "./navigation/RegisterNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // GestureHandler required
import Animated from "react-native-reanimated"; // Import Reanimated
import { useContext } from "react";
import AuthContextProvider, { AuthContext } from "./store/TokenContext.jsx";

export default function App() {
  return (
    <AuthContextProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Animated.View style={{ flex: 1 }}>
          <StatusBar style="light" />
          <MainNavigator />
        </Animated.View>
      </GestureHandlerRootView>
    </AuthContextProvider>
  );
}

function MainNavigator() {
  const authCtx = useContext(AuthContext);

  return authCtx.isAuthenticated ? (
    <HomeStackNavigator />
  ) : (
    <RegisterNavigation />
  );
}
