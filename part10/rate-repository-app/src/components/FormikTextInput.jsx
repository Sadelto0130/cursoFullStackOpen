import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: '#d73a4a'
  },
  inputError: {
    borderColor: "red",
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={[styles.input, showError && styles.inputError]}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;