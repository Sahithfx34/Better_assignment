import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { usePasswordStrength } from "../hooks/usePasswordStrength";
import 'react-toastify/dist/ReactToastify.css';

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const initialValues: SignupFormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validate = (values: SignupFormValues) => {
    const errors: Partial<SignupFormValues> = {};

    if (!values.name) {
      errors.name = "Name is required";
    } else if (values.name.length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords must match";
    }

    return errors;
  };

  const { strength, label, calculateStrength } = usePasswordStrength();

  const handleSubmit = (values: SignupFormValues) => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = storedUsers.find((user: any) => user.email === values.email);

    if (userExists) {
      toast.error("Email already exists");
    } else {
      localStorage.setItem("users", JSON.stringify([...storedUsers, { name: values.name, email: values.email, password: values.password }]));
      toast.success("Signup successful!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl w-full max-w-xl md:flex-row md:space-y-0 animate-fade-in">
        <div className="flex flex-col justify-center p-12 md:p-16 w-full">
          <span className="text-4xl font-extrabold text-gray-800 animate-slide-down mb-4">Create an Account</span>
          <span className="font-light text-gray-500 mb-8 animate-fade-in-delay">Join us by filling in the information below.</span>

          <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
            {({ handleChange }) => (
              <Form>
                <div className="py-2">
                  <label className="mb-2 text-md text-gray-700">Full Name</label>
                  <Field type="text" name="name" className="w-full p-3 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Your Name" />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="py-2">
                  <label className="mb-2 text-md text-gray-700">Email</label>
                  <Field type="email" name="email" className="w-full p-3 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Your Email" />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="py-2">
                  <label className="mb-2 text-md text-gray-700">Password</label>
                  <Field type="password" name="password" className="w-full p-3 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleChange(e); calculateStrength(e.target.value); }} />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className={`h-2.5 rounded-full ${strength === 4 ? "bg-green-500" : strength === 3 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${strength * 25}%` }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600">Password Strength: {label}</span>
                  </div>
                </div>

                <div className="py-2">
                  <label className="mb-2 text-md text-gray-700">Confirm Password</label>
                  <Field type="password" name="confirmPassword" className="w-full p-3 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Confirm Password" />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-lg mb-6 hover:bg-blue-700 transition duration-300 transform hover:scale-105 animate-bounce-in">Sign up</button>
              </Form>
            )}
          </Formik>

          <div className="text-center text-gray-600">
            Already have an account?
            <Link to="/">
              <span className="font-bold text-blue-600 hover:underline cursor-pointer">Log in</span>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
