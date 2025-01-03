import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import Button from "../components/UI/Button";
import { useContext } from "react";
import { AuthContext } from "../store/TokenContext.jsx";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { Feedback } from "../utl/apis.js";
import { LanguageContext } from "../store/languageContext.jsx";
import CustomAlert from "../components/UI/CustomAlert.jsx";

const { width } = Dimensions.get("window"); // Get the width of the screen

export default function FeedBackScreen() {
  const authCtx = useContext(AuthContext);
  const langCtx = useContext(LanguageContext);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertError, setAlertError] = useState(false);

  const handleSubmit = () => {
    if (feedback.trim() === "") {
      setAlertMessage(
        langCtx.language === "ar"
          ? " يرجى تعبئة البيانات !"
          : " please fill the data !"
      );
      setAlertVisible(true);
      setAlertError(true);
      return;
    }

    setIsLoading(true);
    Feedback(feedback, authCtx.userData.id, authCtx.token)
      .then((response) => {
        if (response.status === 200) {
          setFeedback("");
          setAlertMessage(
            langCtx.language === "ar"
              ? "تمت العملية بنجاح!"
              : "Operation was successful!"
          );
          setAlertVisible(true);
          setAlertError(false);
        } else {
          console.log(response.status);
          setAlertMessage(
            langCtx.language === "ar"
              ? "يرجى المحاولة لاحقا!"
              : "Something went wrong! Please try again."
          );
          setAlertVisible(true);
          setAlertError(true);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onConfirm={() => setAlertVisible(false)}
        error={alertError}
      />
      {isLoading && <LoadingIndicator />}
      {!isLoading && (
        <View style={styles.container}>
          <Text style={styles.title}>
            {langCtx.language === "ar"
              ? "رأيك بهمنا لنطور من خدماتنا"
              : "Your Feedback is important"}
          </Text>

          <TextInput
            style={styles.textArea}
            placeholder={
              langCtx.language === "ar"
                ? "أكتب رأيك..."
                : "Write your Opinion..."
            }
            placeholderTextColor="#999"
            multiline={true}
            numberOfLines={6}
            onChangeText={setFeedback}
            value={feedback}
            maxLength={300}
          />

          <Button onPress={handleSubmit} color="green">
            {langCtx.language === "ar" ? "ارسال" : "Send"}
          </Button>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width > 400 ? 40 : 20, // Adjust padding based on screen width
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: width > 400 ? 24 : 20, // Responsive font size
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  textArea: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    textAlignVertical: "top", // Ensures text starts at the top of the input
    marginBottom: 20,
    fontSize: width > 400 ? 18 : 16, // Responsive font size
    height: 120, // Set the height for multiline input
  },
});
