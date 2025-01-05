// import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
// import React, { useState } from "react";
// import { launchCameraAsync } from "expo-image-picker";
// import { LanguageContext } from "../store/languageContext.jsx";
// import { useContext } from "react";
// import Button from "./UI/Button";
// const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
// export default function ImagePicker({ onImageTaken }) {
//   const [pickedImage, setPickedImage] = useState();
//   const langCtx = useContext(LanguageContext);
//   async function handleImagePicker() {
//     try {
//       const result = await launchCameraAsync({
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.5,
//       });

//       if (!result.canceled) {
//         setPickedImage(result.assets[0].uri);
//         onImageTaken(result.assets[0].uri);
//       } else {
//         console.log("Camera canceled");
//       }
//     } catch (error) {
//       console.error("Error launching camera:", error);
//     }
//   }

//   let imagePreview = (
//     <Text>
//       {langCtx.language === "en" ? "No image selected." : "لم يتم اختيار صورة"}
//     </Text>
//   );

//   if (pickedImage) {
//     imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
//   }

//   return (
//     <View>
//       <View style={styles.imagePreview}>{imagePreview}</View>
//       <Button style={styles.button} onPress={handleImagePicker}>
//         {langCtx.language === "en" ? "take image" : " التقاط صورة"}
//       </Button>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   imagePreview: {
//     width: "100%",
//     height: 200,
//     marginVertical: 8,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#AFE1AF",
//     borderRadius: 10,
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 10,
//   },
//   button: {
//     flex: 1,
//     marginHorizontal: screenWidth * 0.02, // Dynamic margin for spacing
//     paddingVertical: screenHeight * 0.015, // Adjusted padding for better touch targets
//     backgroundColor: "#4CAF50",
//     borderRadius: 5,
//     alignItems: "center",
//   },
// });
