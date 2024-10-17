import React, { useState } from "react";
import { View, Switch, StyleSheet, Text } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../../store/ColorMode";
const ButtonSwitch = () => {
  const themeCtx = useContext(ThemeContext);
  const [isLight, setIsLight] = useState(true);
  const toggleSwitch = () => {
    setIsLight((state) => !state);
    themeCtx.toggleTheme();
    console.log(themeCtx.theme);
  };

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isLight ? "#f5dd4b" : "black"}
        onValueChange={toggleSwitch}
        value={isLight === true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ButtonSwitch;
