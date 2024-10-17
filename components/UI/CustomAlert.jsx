import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function CustomAlert({ visible, message, onConfirm, error }) {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.alertBox,
            error ? styles.errorAlertBox : styles.normalAlertBox,
          ]}
        >
          <Text
            style={[
              styles.alertMessage,
              error ? styles.errorMessage : styles.normalMessage,
            ]}
          >
            {message}
          </Text>
          <TouchableOpacity
            style={[
              styles.confirmButton,
              error ? styles.errorButton : styles.confirmButton,
            ]}
            onPress={onConfirm}
          >
            <Text style={styles.buttonText}>تأكيد</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  alertBox: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  errorAlertBox: {
    backgroundColor: "#f8d7da", // light red for error
  },
  normalAlertBox: {
    backgroundColor: "white", // normal background for non-error
  },
  alertMessage: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  errorMessage: {
    color: "#721c24", // dark red for error message
  },
  normalMessage: {
    color: "black",
  },
  confirmButton: {
    backgroundColor: "green",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  errorButton: {
    backgroundColor: "#f44336", // red color for error button
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
