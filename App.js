import { StatusBar } from "expo-status-bar";
import RegisterNavigation from "./navigation/RegisterNavigation";
import { HomeStackNavigator } from "./navigation/RegisterNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // GestureHandler required
import Animated from "react-native-reanimated"; // Import Reanimated
import { useContext } from "react";
import AuthContextProvider, { AuthContext } from "./store/TokenContext.jsx";
import LanguageContextProvider from "./store/languageContext.jsx";
import ThemeContextProvider from "./store/ColorMode.jsx";
export default function App() {
  const authCtx = useContext(AuthContext);
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

  return authCtx.isAuthenticated ? (
    <>
      <StatusBar style={authCtx.isAuthenticated ? "light" : "dark"} />
      <HomeStackNavigator />
    </>
  ) : (
    <>
      <StatusBar style={authCtx.isAuthenticated ? "light" : "dark"} />
      <RegisterNavigation />
    </>
  );
}
