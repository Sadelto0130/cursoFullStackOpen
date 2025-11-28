import React from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup'
import FormikTextInput from './FormikTextInput';
import { useSignIn } from '../hooks/useSignIn';
import { setAccessToken } from '../utils/authStorage';
import { useRouter } from 'expo-router';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#0366d6",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
  },
});

const initialValues = { username: '', password: '' };

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
})

const SignIn = () => {
  const [signIn] = useSignIn()
  const router = useRouter()

  const onSubmit = async (values, { setFieldError }) => {
    let hasError = false;
    const {username, password} = values;

    if (!hasError) {
      try{
        const token = await signIn({username, password})
        if(token) {
          router.push('/')
        }
      } catch (e) {
        console.log("error:", e)
      }
    }
  };

  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit} 
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Iniciar sesión</Text>

          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput name="password" placeholder="Password" secureTextEntry />

          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Entrar</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;
