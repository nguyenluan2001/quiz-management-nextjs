import * as yup from "yup";
const SignUpSchema = yup.object({
    fullname: yup.string().required("Fullname is required"),
    email: yup.string().email().required("Email is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
})
export {SignUpSchema}