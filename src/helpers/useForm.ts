import { useState, useEffect, useCallback } from "react";
let thisError: any = {}
interface setSTateType {
  [name: string]: any;
}

const useForm = (initialValues: setSTateType = {}, callback: Function, validate: any) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(thisError);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) callback();
    // eslint-disable-next-line
  }, [errors]);

  const handleSubmit = useCallback((e: any) => {
    if (e) e.preventDefault();
    setErrors(false);
    if (validate === undefined) setErrors({});
    if (validate === null) setErrors({});
    if (validate !== undefined && validate) setErrors(validate(values));
    setIsSubmitting(true);
    // eslint-disable-next-line
  }, [values]);

  const handleCurrentVal = (obj: any) => {
    setValues(obj);
  };

  const resetForm = useCallback(() => {
    setIsSubmitting(false);
    setErrors({});
    setValues(initialValues);
    // eslint-disable-next-line
  }, []);

  const setUpdateValue = useCallback((field: string, value: any) => {
    setValues(values => ({
      ...values,
      [field]: value
    }));
  }, []);

  const handleChange = useCallback((e: any) => {
    e.persist();
    setValues(values => ({
      ...values,
      [e.target.name]: e.target.value
    }));
  }, []);

  const handleNumberChange = useCallback((e: any) => {
    e.persist();
    if (isNaN(e.target.value)) return;
    setValues(values => ({
      ...values,
      [e.target.name]: e.target.value
    }));
  }, []);

  const handleDateChange = useCallback((date: any, name = "date") => {
    date = new Date(date);
    let value = date.getTime();
    setValues(values => ({
      ...values,
      [name]: value
    }));
    // eslint-disable-next-line
  }, []);

  const handleSelectChange = useCallback((e: any, name = "select") => {
    let value = e ? e.value : null;
    setValues(values => ({
      ...values,
      [name]: value
    }));
    // eslint-disable-next-line
  }, []);

  const handleSelectDefault = useCallback((e: any, name = "select") => {
    let value = e ? e.target.value : null;
    setValues(values => ({
      ...values,
      [name]: value
    }));
    // eslint-disable-next-line
  }, []);

  return {
    handleChange,
    handleNumberChange,
    handleDateChange,
    handleSelectChange,
    handleSubmit,
    values,
    setUpdateValue,
    errors,
    resetForm,
    handleCurrentVal,
    handleSelectDefault
  };
};

export default useForm;
