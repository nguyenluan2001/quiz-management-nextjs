import * as yup from "yup";
const SignInSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
})
export {SignInSchema}