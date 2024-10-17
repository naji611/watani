import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import Button from "../components/UI/Button";
import { useContext } from "react";
import AuthContextProvider, { AuthContext } from "../store/TokenContext.jsx";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { Feedback } from "../utl/apis.js";
import { LanguageContext } from "../store/languageContext.jsx";

import CustomAlert from "../components/UI/CustomAlert.jsx";
export default function FeedBackScreen() {
  const authCtx = useContext(AuthContext);
  const langCtx = useContext(LanguageContext);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertError, setAlertError] = useState(false);
  const handleSubmit = () => {
    if (feedback === "" || feedback === null) {
      if (langCtx.language === "ar") {
        setAlertMessage(" يرجى تعبئة البيانات !");
        setAlertVisible(true);
        setAlertError(true);
      } else if (langCtx.language === "en") {
        setAlertMessage(" please fill the data !");
        setAlertVisible(true);
        setAlertError(true);
      }
    } else {
      setIsLoading(true);
      Feedback(feedback, authCtx.userData.id)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.status);
            setFeedback("");
            if (langCtx.language === "ar") {
              setAlertMessage("تمت العملية بنجاح!");
              setAlertVisible(true);
              setAlertError(false);
            }
            if (langCtx.language === "en") {
              setAlertMessage("Operation was successful!");
              setAlertVisible(true);
              setAlertError(false);
            }
          } else if (response.status === 404 || response.status === 500) {
            if (langCtx.language === "ar") {
              setAlertMessage("يرجى المحاولة لاحقا!");
              setAlertVisible(true);
              setAlertError(true);
            }
            if (langCtx.language === "en") {
              setAlertMessage("something Wrong!  Please try again");
              setAlertVisible(true);
              setAlertError(true);
              setIsLoading(true);
            }
          }
        })
        .catch((er) => {
          console.log(er);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onConfirm={() => setAlertVisible(false)}
        error={alertError}
      ></CustomAlert>
      {isLoading && <LoadingIndicator />}
      {!isLoading && (
        <View style={styles.container}>
          <Text style={styles.title}>رأيك بهمنا لنطور من خدماتنا</Text>

          <TextInput
            style={styles.textArea}
            placeholder="أكتب رأيك..."
            placeholderTextColor="#999"
            multiline={true}
            numberOfLines={6}
            onChangeText={(val) => setFeedback(val)}
            value={feedback}
            maxLength={300}
          />

          <Button onPress={handleSubmit} color="green">
            أرسل
          </Button>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  textArea: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top", // Ensures text starts at the top of the input
    marginBottom: 20,
    fontSize: 16,
    height: 120, // Set the height for multiline input
  },
});
