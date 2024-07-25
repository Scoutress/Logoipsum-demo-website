import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import styles from "./AuthModal.module.scss";
import Loading from "../loading/Loading";

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthModal must be used within an AuthProvider");
  }

  const { login, register } = authContext;
  const [isLogin, setIsLogin] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const validationSchema = Yup.object().shape({
    username: isLogin ? Yup.string() : Yup.string().required("Required"),
    firstName: isLogin ? Yup.string() : Yup.string().required("Required"),
    lastName: isLogin ? Yup.string() : Yup.string().required("Required"),
    city: isLogin ? Yup.string() : Yup.string().required("Required"),
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format"
      )
      .required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    confirmPassword: isLogin
      ? Yup.string()
      : Yup.string()
          .oneOf([Yup.ref("password")], "Passwords do not match")
          .required("Required"),
  });

  const initialValues = {
    username: "",
    firstName: "",
    lastName: "",
    city: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const success = await login({
          email: values.email,
          password: values.password,
        });
        if (success) {
          onClose();
        } else {
          setError("Invalid email or password");
        }
      } else {
        const success = await register({
          username: values.username,
          firstName: values.firstName,
          lastName: values.lastName,
          city: values.city,
          email: values.email,
          password: values.password,
        });
        if (success) {
          onClose();
        } else {
          setError("Registration failed");
        }
      }
    } catch (error: any) {
      if (error.response) {
        setError(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        setError("Network error, please try again later.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        <h2>{isLogin ? "Login" : "Register"}</h2>
        {loading ? (
          <Loading />
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              {!isLogin && (
                <>
                  <div className={styles.formGroup}>
                    <label htmlFor="username">Username</label>
                    <Field type="text" id="username" name="username" />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="firstName">First Name</label>
                    <Field type="text" id="firstName" name="firstName" />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="lastName">Last Name</label>
                    <Field type="text" id="lastName" name="lastName" />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="city">City</label>
                    <Field type="text" id="city" name="city" />
                    <ErrorMessage
                      name="city"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>
                </>
              )}
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <Field type="text" id="email" name="email" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
              {!isLogin && (
                <div className={styles.formGroup}>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>
              )}
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit">{isLogin ? "Login" : "Register"}</button>
            </Form>
          </Formik>
        )}
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className={styles.toggleForm}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

AuthModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AuthModal;
