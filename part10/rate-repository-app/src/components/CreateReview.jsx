import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup'
import FormikTextInput from './FormikTextInput';
import { useRouter } from 'expo-router';
import { useCreateReview } from '../hooks/useCreateReview';

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

const initialValues = { 
  owner_name: '', 
  repository_name: '',
  rating: '',
  text: '' 
};

const validationSchema = yup.object().shape({
  owner_name: yup.string().required('Repository owner name is required'),
  repository_name: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .typeError("Must be a number")
    .positive("Must be a positive number")
    .integer("Must be a integer")
    .max(100)
    .required("Rating is required")
})

const CreateReview = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter()
  const [createReview] = useCreateReview()

  const onSubmit = async (values, { setFieldError }) => {
    let hasError = false;
    const {
      owner_name, 
      repository_name,
      rating,
      text
    } = values;

    if (!hasError) {
      try{
        const review = await createReview({
          owner_name: owner_name,
          repository_name: repository_name,
          rating: Number(rating),
          text: text,
        })
        setErrorMessage('');
        router.push('/');
      } catch (e) {
        console.log("error:", e)
        setErrorMessage(e.message)
      }
    }
  };

  return (
    <>
      {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit} 
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <View style={styles.container}>

            <FormikTextInput name="owner_name" placeholder="Repository owner name" />
            <FormikTextInput name="repository_name" placeholder="Repository name" />
            <FormikTextInput name="rating" placeholder="Rating between 0 and 1000" />
            <FormikTextInput name="text" placeholder="Review" />

            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Create a review</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </>
  );
}

export default CreateReview