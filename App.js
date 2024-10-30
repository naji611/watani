import { StatusBar } from "expo-status-bar";
import RegisterNavigation from "./navigation/RegisterNavigation";
import { HomeStackNavigator } from "./navigation/RegisterNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // GestureHandler required
import Animated from "react-native-reanimated"; // Import Reanimated
import AuthContextProvider from "./store/TokenContext.jsx";
import LanguageContextProvider from "./store/languageContext.jsx";
import ThemeContextProvider from "./store/ColorMode.jsx";
import CustomAlert from "./components/UI/CustomAlert.jsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./store/TokenContext";
import { LanguageContext } from "./store/languageContext.jsx";
import LoadingIndicator from "./components/UI/LoadingIndicator.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
export default function App() {
  return (
    <ThemeContextProvider>
      <LanguageContextProvider>
        <AuthContextProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Animated.View style={{ flex: 1 }}>
              <MainNavigator />
            </Animated.View>
          </GestureHandlerRootView>
        </AuthContextProvider>
      </LanguageContextProvider>
    </ThemeContextProvider>
  );
}

function MainNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUserData = await AsyncStorage.getItem("userData");
      const parsedUserData = JSON.parse(storedUserData);
      console.log(parsedUserData);
      if (storedToken && parsedUserData) {
        authCtx.authenticate(storedToken, parsedUserData);
      }
      setIsLoading(false);
    }
    fetchToken();
  }, []);
  if (isLoading) {
    return <LoadingIndicator></LoadingIndicator>;
  }

  return (
    <>
      {authCtx.isAuthenticated ? (
        <>
          <StatusBar style="light" />

          <HomeStackNavigator></HomeStackNavigator>
        </>
      ) : (
        <>
          <StatusBar style="dark" />
          <RegisterNavigation />
        </>
      )}
    </>
  );
}
