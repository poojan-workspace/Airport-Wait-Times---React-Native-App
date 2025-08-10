import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import { theme } from "@/constants/theme";
import ScreenWrapper from "@/components/ScreenWrapper";
import Icon from "react-native-vector-icons/MaterialIcons";
import BackButton from "@/components/BackButton";
import { useRouter } from "expo-router";
import { hp, wp } from "@/helpers/common";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

// import { useGoogleSignIn } from "@/lib/googleAuth"; // adjust path if needed

const Login = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);
  //   const { promptAsync, request } = useGoogleSignIn();

  const onSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Login", "Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailRef.current.trim(),
        passwordRef.current.trim()
      );
      const user = userCredential.user;
      console.log("Logged in:", user.email);
      Alert.alert("Success", "Welcome back!");
      router.push("/search");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    }
    setLoading(false);
  };

  return (
    <ScreenWrapper bg={theme.colors.titanWhite}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton router={router} />

        {/* Welcome Text */}
        <View style={{ gap: 18 }}>
          <Text style={styles.HelloText}>Hello Again!</Text>
          <View style={{ gap: 3 }}>
            <Text style={styles.WelcomeText}>Welcome back</Text>
            <Text style={styles.WelcomeText}>we've missed you!</Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
            Please login to continue
          </Text>
          <Input
            icon={
              <Icon
                name="alternate-email"
                size={26}
                strokeWidth={1.6}
                color={theme.colors.textLight}
              />
            }
            placeholder="Enter your email"
            onChangeText={(value) => (emailRef.current = value)}
          />
          <Input
            icon={
              <Icon
                name="lock-outline"
                size={26}
                strokeWidth={1.6}
                color={theme.colors.textLight}
              />
            }
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={(value) => (passwordRef.current = value)
            }
          />
          <Text style={styles.forgotPassword}>Forgot Password?</Text>

          {/* Button */}
          <Button title="Login" onPress={onSubmit} loading={loading} />

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <Pressable onPress={() => router.push("/signUp")}>
              <Text
                style={[
                  styles.footerText,
                  {
                    color: theme.colors.primaryDark,
                  },
                ]}
              >
                Sign up
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(5),
    gap: 45,
    flex: 1,
    backgroundColor: theme.colors.titanWhite,
  },
  HelloText: {
    fontSize: hp(3.5),
    fontWeight: theme.fonts.bold,
    color: "black",
    textAlign: "center",
  },

  WelcomeText: {
    fontSize: hp(2.5),
    color: "black",
    textAlign: "center",
    fontWeight: "500",
  },

  form: {
    gap: 25,
  },
  forgotPassword: {
    color: theme.colors.text,
    fontWeight: theme.fonts.semibold,
    textAlign: "right",
  },
  footer: {
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    color: theme.colors.text,
    fontSize: hp(1.6),
    textAlign: "center",
  },
});
