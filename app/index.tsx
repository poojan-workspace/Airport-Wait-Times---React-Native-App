import { Button, Text, View } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";


export default function Index() {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <Text className="text-4xl text-light-100">Welcome to PortEx_New</Text>
      <Button title="Go to Welcome" onPress={() => router.push("/welcome")} />
    </ScreenWrapper>
  );
}
