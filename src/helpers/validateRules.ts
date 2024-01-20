import { object, string } from "yup";

function getErrorsFromValidationError(validationError: any) {
  const FIRST_ERROR = 0;
  return validationError.inner.reduce((errors: any, error: any) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    };
  }, {});
}
function handleErrorMeg(msg: string, schema: any) {
  try {
    schema.validateSync(msg, { abortEarly: false });
    return {};
  } catch (error) {
    return getErrorsFromValidationError(error);
  }
}

// Validation section

export function candidateFormValidate(values: any) {
  return handleErrorMeg(values, candidateFormchema);
}
const candidateFormchema = object().shape({
  name: string().required("Name cannot be empty"),
  email: string().email("Invalid Email").required("Email cannot be empty"),
  phoneNumber: string().required("Phone Number cannot be empty"),
  qualifications: string().required("Qualifications cannot be empty"),
  status: string().required("Status cannot be empty"),
  reactjsExp: string().required("ReactJS Experience cannot be empty"),
  nodejsExp: string().required("NodeJS Experience cannot be empty"),
  expectedSalary: string().required("Salary cannot be empty"),
});