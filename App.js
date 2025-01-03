import { StatusBar } from "expo-status-bar";
import RegisterNavigation from "./navigation/RegisterNavigation";
import { HomeStackNavigator } from "./navigation/RegisterNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthContextProvider from "./store/TokenContext.jsx";
import LanguageContextProvider from "./store/languageContext.jsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./store/TokenContext";
import LoadingIndicator from "./components/UI/LoadingIndicator.jsx";
import * as SecureStore from "expo-secure-store";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <LanguageContextProvider>
        <AuthContextProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <MainNavigator />
          </GestureHandlerRootView>
        </AuthContextProvider>
      </LanguageContextProvider>
    </SafeAreaProvider>
  );
}

function MainNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // Fetch token and user data from SecureStore
        const [storedToken, storedUserData] = await Promise.all([
          SecureStore.getItemAsync("token"), // Using expo-secure-store
          SecureStore.getItemAsync("userData"), // Using expo-secure-store
        ]);

        // Parse and authenticate if both are available
        if (storedToken && storedUserData) {
          try {
            const parsedUserData = JSON.parse(storedUserData);
            authCtx.authenticate(storedToken, parsedUserData);
          } catch (parseError) {
            console.error("Error parsing user data:", parseError);
          }
        }
      } catch (error) {
        console.error("Error fetching token or user data:", error);
        alert("An error occurred while loading data. Please try again.");
      } finally {
        setIsLoading(false); // Always stop loading
      }
    };

    fetchToken();
  }, []); // Empty dependency array to only run this effect once on mount

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
