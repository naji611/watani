import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";
import ForgetPasswordScreen from "../screens/ForgetPasswordScreen";

import HomeScreen from "../screens/HomeScreen";
import ReportsScreen from "../screens/ReportsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import TrackingScreen from "../screens/TrackingScreen";
import { Ionicons, Feather } from "@expo/vector-icons";

import FeedBackScreen from "../screens/FeedBackScreen";
import OverViewScreen from "../screens/OverViewScreen";

import TakeReportScreen from "../screens/TakeReportScreen";
import Map from "../screens/Map";
import PersonalDetails from "../screens/PersonalDetails";
import SuccessRegistrationScreen from "../screens/SuccessRegester";
import VerifyForgetPasswordFromEmail from "../screens/VerifyForgetPasswordFromEmail";
import ResetPasswordScreen from "../screens/ResetPassword";
import ChangePassword from "../screens/ChangePassword";
import SuccessComplaintScreen from "../screens/SucccessComplaint";
import { LanguageContext } from "../store/languageContext";
import UpdateComplaintsScreen from "../screens/UpdateComplantsScreen";
import SuccessUpdateScreen from "../screens/SuccessUpdateScreen";

// Create Stack and Tab Navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator for Home section
function HomeTabs() {
  const langCtx = useContext(LanguageContext);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        // headerLeft: () => {
        //   return <HeaderImage></HeaderImage>;
        // },
        headerStyle: {
          backgroundColor: "#006400", // Dark green background for header
          height: 100, // Adjusted header height for a more comfortable size
        },
        headerTitleStyle: {
          fontSize: 25,
          fontWeight: "bold",
        },
        headerTitleAlign: "center", // Center align the title in the header
        headerTintColor: "#fff", // White text color for the header
        tabBarStyle: {
          backgroundColor: "#006400", // Deep green for the tab bar
          height: 65, // Adjusted height for tab bar
          paddingVertical: 8, // Increased padding for better touch targets
          borderTopLeftRadius: 15, // Rounded top left corner
          borderTopRightRadius: 15, // Rounded top right corner
          elevation: 10, // Shadow effect for a floating tab bar
        },
        tabBarActiveTintColor: "#fff", // White color for active tab icons
        tabBarInactiveTintColor: "#ccc", // Light gray color for inactive tabs
        tabBarLabelStyle: {
          fontSize: 14, // Adjusted label size
          marginBottom: 5, // Spaced out label from icon for a cleaner look
        },
      }}
    >
      <Tab.Screen
        name="Tracking"
        component={TrackingScreen}
        options={{
          title:
            langCtx.language === "ar" ? "تتبع الشكاوي" : "Tracking Complaints",
          tabBarIcon: ({ color }) => (
            <Ionicons name="analytics-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: langCtx.language === "ar" ? "الرئيسية" : "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: langCtx.language === "ar" ? "الاعدادات" : "Settings",
          tabBarIcon: ({ color }) => (
            <Feather name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Main Home Stack Navigator holding the Tab Navigator
export function HomeStackNavigator() {
  const langCtx = useContext(LanguageContext);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#006400",
          },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ReportsScreen"
          component={ReportsScreen}
          options={{
            title: langCtx.language === "ar" ? "شكاوي" : "Complaints",
          }}
        />
        <Stack.Screen
          name="FeedBackScreen"
          component={FeedBackScreen}
          options={{
            title: langCtx.language === "ar" ? "اكتب رأيك" : "Feedback",
          }}
        />
        <Stack.Screen
          name="OverViewScreen"
          component={OverViewScreen}
          options={{
            title: langCtx.language === "ar" ? " عن التطبيق" : "About Us",
          }}
        />
        <Stack.Screen name="TakeReportScreen" component={TakeReportScreen} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            title:
              langCtx.language === "ar"
                ? "تغيير كلمة المرور"
                : " Change Password",
          }}
        />
        <Stack.Screen
          name="PersonalInfo"
          component={PersonalDetails}
          options={{
            title: langCtx.language === "ar" ? "معلوماتي" : "Personal Info",
          }}
        />
        <Stack.Screen
          name="SuccessComplaint"
          component={SuccessComplaintScreen}
          options={{
            title: "",
          }}
        />
        <Stack.Screen
          name="UpdateComplaintsScreen"
          component={UpdateComplaintsScreen}
        />
        <Stack.Screen
          options={{
            title: "",
          }}
          name="SuccessUpdateScreen"
          component={SuccessUpdateScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Register Navigation for authentication flow
export default function RegisterNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // No headers in the auth flow
          animation: "slide_from_left",
        }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen
          name="SuccessRegistrationScreen"
          component={SuccessRegistrationScreen}
        />
        <Stack.Screen
          name="ForgetPasswordScreen"
          component={ForgetPasswordScreen}
        />

        <Stack.Screen name="HomeStack" component={HomeStackNavigator} />
        <Stack.Screen
          name="verifyEmailFromEmail"
          component={VerifyForgetPasswordFromEmail}
        />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
