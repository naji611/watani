import { StatusBar } from "expo-status-bar";
import RegisterNavigation from "./navigation/RegisterNavigation";
import { HomeStackNavigator } from "./navigation/RegisterNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // GestureHandler required
import Animated from "react-native-reanimated"; // Import Reanimated
import AuthContextProvider from "./store/TokenContext.jsx";
import LanguageContextProvider from "./store/languageContext.jsx";
import ThemeContextProvider from "./store/ColorMode.jsx";
import CustomAlert from "./components/UI/CustomAlert.jsx";
import { useContext, useEffect } from "react";
import { AuthContext } from "./store/TokenContext";
import { LanguageContext } from "./store/languageContext.jsx";

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
  const authCtx = useContext(AuthContext);
  const languageCtx = useContext(LanguageContext);
  console.log(authCtx.showAlert);
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
