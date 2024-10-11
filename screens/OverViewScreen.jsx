import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function OverViewScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.description}>
        تم تصميم هذا التطبيق لمساعدة المواطنين على تقديم التقارير بفعالية. سواء
        كنت بحاجة إلى تتبع الشكاوى، أو تقديم الطلبات، أو العثور على معلومات ذات
        صلة، يوفر هذا التطبيق جميع الميزات اللازمة في واجهة سهلة الاستخدام.
      </Text>

      <Text style={styles.description}>
        نأمل أن يجعل هذا التطبيق تجربتك أكثر كفاءة ومتعة. لأي ملاحظات أو دعم،
        يرجى التواصل معنا من خلال قسم الاتصال.
      </Text>

      <Text style={styles.contactTitle}>تواصل معنا </Text>
      <Text style={styles.contactEmail}>
        البريد الإلكتروني: watanihu@gmail.com
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5", // Light gray background for a softer look
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center", // Center align the title
    color: "#4CAF50", // Green color for the title
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    color: "#333", // Dark gray for better readability
    lineHeight: 24, // Increased line height for better readability
    backgroundColor: "#ffffff", // White background for description
    padding: 15, // Padding around the description text
    borderRadius: 10, // Rounded corners
    shadowColor: "#000", // Shadow for depth
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Elevation for Android
  },
  contactTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
    textAlign: "center", // Center align the contact title
    color: "#4CAF50", // Green color for contact title
  },
  contactEmail: {
    fontSize: 16,
    color: "#333",
    textAlign: "center", // Center align the email
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#ffffff", // White background for email
    borderRadius: 10, // Rounded corners
    shadowColor: "#000", // Shadow for depth
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Elevation for Android
  },
});
