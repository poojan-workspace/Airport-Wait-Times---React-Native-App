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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";


const SignUp = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !firstNameRef.current ||
      !lastNameRef.current
    ) {
      Alert.alert("Sign Up", "Please fill all fields.");
      return;
    }
  
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.trim(),
        passwordRef.current.trim()
      );
      const user = userCredential.user;
      console.log("User signed up:", user.email);
      Alert.alert("Success", "Account created!");
      router.push("/search");
    } catch (error: any) {
      Alert.alert("Error", error.message);
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
          <Text style={styles.HelloText}>Let's get you started!</Text>
          <View style={{ gap: 3 }}>
            <Text style={styles.WelcomeText}>Join us for a </Text>
            <Text style={styles.WelcomeText}>
              stress-free travel experience!
            </Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
            Please fill the details below to create an account
          </Text>
          <Input
            icon={
              <Icon
                name="person-outline"
                size={26}
                strokeWidth={1.6}
                color={theme.colors.textLight}
              />
            }
            placeholder="Enter your first name"
            onChangeText={(value) => (firstNameRef.current = value)}
          />
          <Input
            icon={
              <Icon
                name="person-outline"
                size={26}
                strokeWidth={1.6}
                color={theme.colors.textLight}
              />
            }
            placeholder="Enter your last name"
            onChangeText={(value) => (lastNameRef.current = value)}
          />
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
            onChangeText={(value) => (passwordRef.current = value)}
          />

          {/* Button */}
          <Button title="Sign Up" onPress={onSubmit} loading={loading} />

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Pressable onPress={() => router.push("/login")}>
              <Text
                style={[
                  styles.footerText,
                  {
                    color: theme.colors.primaryDark,
                  },
                ]}
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

export default SignUp;

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
