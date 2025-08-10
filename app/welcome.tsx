import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { StatusBar } from "expo-status-bar";
import { hp, wp } from "@/helpers/common";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";

const welcome = () => {
  const router = useRouter();

  let runAnimation;

  useEffect(() => {
    runAnimation.play();
  }, []);

  return (
    <ScreenWrapper bg={theme.colors.titanWhite}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* Welcome Image */}
        {/* <Image
          source={require("@/assets/images/welcome.png")}
          style={styles.welcomeImage}
          resizeMode="contain"
          contentFit="contain"
        /> */}

        <LottieView
          ref={(animation) => (runAnimation = animation)}
          source={require("@/assets/animations/welcome.json")}
          style={styles.welcomeImage}
          autoPlay
          loop
        />

        {/* Title */}
        <View style={{ gap: 20 }}>
          <Text style={styles.title}>
            Port<Text style={{ color: theme.colors.primary }}>X</Text>
          </Text>
          <Text style={styles.punchline}>
            Your shortcut to stress-free travel starts here. Own your time, own
            your life.
          </Text>
        </View>

        {/* footer - Get Started Button */}
        <View style={styles.footer}>
          <Button
            title="Getting Started"
            buttonStyle={{ marginHorizontal: wp(3) }}
            onPress={() => router.push("/signUp")}
          />
          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>Already have an account!</Text>
            <Pressable onPress={() => router.push("/login")}>
              <Text
                style={[styles.loginText, { color: theme.colors.primaryDark }]}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: theme.colors.titanWhite,
    paddingHorizontal: wp(4),
  },
  welcomeImage: {
    width: wp(100),
    height: hp(30),
    alignSelf: "center",
  },
  title: {
    fontSize: hp(5),
    fontWeight: theme.fonts.extrabold,
    color: "#1a1a1a",
    textAlign: "center",
  },
  punchline: {
    fontSize: hp(1.6),
    textAlign: "center",
    paddingHorizontal: wp(10),
    color: theme.colors.text,
  },

  footer: {
    gap: 30,
    width: "100%",
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  loginText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
});
