import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "@/constants/theme";
import Icon from "react-native-vector-icons/MaterialIcons";

const BackButton = ({size=26, router}) => {
  
  return (
    <Pressable onPress={() => router.back()} style={styles.button}>
      <Icon
        name="flight"
        strokeWidth={2.5}
        size={size}
        color={theme.colors.text}
        style={{ transform: [{ rotate: "-90deg" }] }}
      />
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(0,0,0,0.07)",
    padding: 5,
    borderRadius: theme.radius.sm,
  },
});
