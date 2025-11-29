import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

const AppBarTab = ({ title, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.pressed : null,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 6,
    borderRadius: 8,
    backgroundColor: "#2f363d", 
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.6, 
  },
  text: {
    color: "white",
    fontSize: 12,
    letterSpacing: 0.5,
  },
});

export default AppBarTab;
