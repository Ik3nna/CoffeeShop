import { Dimensions, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemeContext } from '../../themes/themeContext'
import { getFontSize } from '../../utils/getFontSize'
import TopTabs from '../../components/topTabs';
import { FormDataProps, NavigationProps } from '../../types';
import { useForm, Controller } from "react-hook-form";
import Button from '../../components/button';
import { PAYMENT, REGISTER } from '../../constants/routeName';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import Input from '../../components/input'

const { width, height } = Dimensions.get("window");

const Login = ({ navigation }: NavigationProps) => {
  const theme = useThemeContext();
  const [isLoading, setIsLoading] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormDataProps>({
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const onSubmit = async (data: FormDataProps)=> {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigation.navigate(PAYMENT);
    } catch (error: any) {
      Alert.alert("Error", "Invalid Login Credentials. Try again")
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundHex }]}>
      <TopTabs text='Login' noRightPocket />

        <View style={styles.form_container}>
            <Controller
                control={control}
                rules={{
                    required: "This field is required",
                    pattern: {
                    value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                    message: "Please enter a valid email address"
                    }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input 
                        placeholder='Email'
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={errors.email?.message}
                    />
                )}
                name="email"
            />

            <Controller
                control={control}
                rules={{
                    required: "This field is required",
                    pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*([a-zA-Z\d])\1{2}).{8,}$/,
                    message: "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long."
                    }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input 
                        placeholder="Password"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        secureTextEntry
                        error={errors.password?.message}
                        errorWidth={width - (0.08 * width)}
                    />
                )}
                name="password"
            />
        </View>

        <View style={styles.btn_container}>
            <Button 
                content='Login'
                bgColor={theme.activeHex}
                color={isLoading ? theme.activeHex : theme.textHex}
                loading={isLoading}
                width= {width - (width * 0.08)}
                height={width * 0.13}
                radius={15}
                size={getFontSize(0.025)}
                onClick={handleSubmit(onSubmit)}
            />

            <Button 
                content='Signup'
                bgColor={theme.activeHex}
                color={theme.textHex}
                width= {width - (width * 0.08)}
                height={width * 0.13}
                radius={15}
                size={getFontSize(0.025)}
                onClick={()=>navigation.navigate(REGISTER)}
            />
        </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        height: height,
        position: "relative",
        paddingHorizontal: "4%"
    },
    form_container: {
        paddingVertical: "5%",
        flexDirection: "column",
        rowGap: 20,
        flex: 1,
        paddingHorizontal: "4%",
        paddingTop: "7%"
    },
    btn_container: {
        position: "absolute",
        bottom: "7%",
        paddingHorizontal: "4%",
        paddingTop: "4%",
        rowGap: 20
    }
})