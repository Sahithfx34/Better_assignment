import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import 'react-toastify/dist/ReactToastify.css';

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login = () => {
  const initialValues: LoginFormValues = { email: "", password: "", rememberMe: false };

  const validate = (values: LoginFormValues) => {
    const errors: Partial<LoginFormValues> = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleSubmit = (values: LoginFormValues) => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const user = storedUsers.find((user: any) => user.email === values.email && user.password === values.password);

    if (user) {
      toast.success("Login successful!");
      if (values.rememberMe) {
        localStorage.setItem("rememberMe", JSON.stringify(values));
      }

    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl w-full max-w-lg md:flex-row md:space-y-0 animate-fade-in">
      <div className="flex flex-col justify-center p-12 md:p-16 w-full">
          <span className="text-4xl font-extrabold text-gray-800 animate-slide-down mb-4">Create an Account</span>
          <span className="font-light text-gray-500 mb-8 animate-fade-in-delay">Join us by filling in the information below.</span>

          <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
            {() => (
              <Form>
                <div className="py-4 animate-fade-in-delay">
                  <label className="mb-2 text-md text-gray-700">Email</label>
                  <Field type="email" name="email" className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="py-4 animate-fade-in-delay">
                  <label className="mb-2 text-md text-gray-700">Password</label>
                  <Field type="password" name="password" className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="py-4 animate-fade-in-delay">
                  <label className="flex items-center">
                    <Field type="checkbox" name="rememberMe" className="mr-2" />
                    <span className="text-gray-700">Remember Me</span>
                  </label>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg mb-4 hover:bg-blue-700 transition duration-300 transform hover:scale-105">Login</button>
              </Form>
            )}
          </Formik>

          <div className="text-center text-gray-600">
            Don't have an account?
            <Link to="/signup">
              <span className="font-bold text-blue-600 hover:underline cursor-pointer">Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
