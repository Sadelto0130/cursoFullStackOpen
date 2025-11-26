import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";

const AppBarTab = ({ title, path }) => {
  return (
    <Pressable
      onPress={() => router.push(path)}
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.pressed : null, // efecto al presionar
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
    backgroundColor: "#2f363d", // ligeramente más claro que el fondo
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.6, // feedback al presionar
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

export default AppBarTab;
