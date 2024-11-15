import { StatusBar } from "expo-status-bar";
import RegisterNavigation from "./navigation/RegisterNavigation";
import { HomeStackNavigator } from "./navigation/RegisterNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // GestureHandler required
import AuthContextProvider from "./store/TokenContext.jsx";
import LanguageContextProvider from "./store/languageContext.jsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./store/TokenContext";
import LoadingIndicator from "./components/UI/LoadingIndicator.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  return (
    <LanguageContextProvider>
      <AuthContextProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <MainNavigator />
        </GestureHandlerRootView>
      </AuthContextProvider>
    </LanguageContextProvider>
  );
}

function MainNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedUserData = await AsyncStorage.getItem("userData");

        if (storedToken && storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          authCtx.authenticate(storedToken, parsedUserData);
        }
      } catch (error) {
        console.error("Error fetching token or user data:", error);
      } finally {
        setIsLoading(false); // Ensure loading ends even if an error occurs
      }
    }

    fetchToken();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      {authCtx.isAuthenticated ? (
        <>
          <StatusBar style="light" />
          <HomeStackNavigator />
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
