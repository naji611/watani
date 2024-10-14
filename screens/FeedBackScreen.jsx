import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import Button from "../components/UI/Button";
import { useContext } from "react";
import AuthContextProvider, { AuthContext } from "../store/TokenContext.jsx";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { Feedback } from "../utl/apis.js";
export default function FeedBackScreen() {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const handleSubmit = () => {
    if (feedback === "" || feedback === null) {
      Alert.alert("Error", "Please enter your feedback");
    } else {
      setIsLoading(true);
      Feedback(feedback, authCtx.userData.id)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.status);
            setFeedback("");
            Alert.alert("Success", "Feedback submitted successfully");
          } else if (response.status === 404) {
            Alert.alert("Error", "something Wrong!  Please try again");
          } else if (response.status === 500) {
            Alert.alert("Error", "Internal Server Error");
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
