import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import styles from "./AuthModal.module.scss";
import Loading from "../loading/Loading";
import { useTranslation } from "react-i18next";

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess }) => {
  const authContext = useContext(AuthContext);
  const { t } = useTranslation();

  if (!authContext) {
    throw new Error("AuthModal must be used within an AuthProvider");
  }

  const { login, register } = authContext;
  const [isLogin, setIsLogin] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const validationSchema = Yup.object().shape({
    username: isLogin ? Yup.string() : Yup.string().required(t("REQUIRED")),
    firstName: isLogin ? Yup.string() : Yup.string().required(t("REQUIRED")),
    lastName: isLogin ? Yup.string() : Yup.string().required(t("REQUIRED")),
    city: isLogin ? Yup.string() : Yup.string().required(t("REQUIRED")),
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        t("INVALID_EMAIL_FORMAT")
      )
      .required(t("REQUIRED")),
    password: Yup.string()
      .min(6, t("PASSWORD_MIN_LENGTH"))
      .required(t("REQUIRED")),
    confirmPassword: isLogin
      ? Yup.string()
      : Yup.string()
          .oneOf([Yup.ref("password")], t("PASSWORDS_DO_NOT_MATCH"))
          .required(t("REQUIRED")),
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
          onLoginSuccess();
          onClose();
        } else {
          setError(t("INVALID_EMAIL_OR_PASSWORD"));
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
          onLoginSuccess();
          onClose();
        } else {
          setError(t("REGISTRATION_FAILED"));
        }
      }
    } catch (error: any) {
      if (error.response) {
        setError(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        setError(t("NETWORK_ERROR"));
      } else {
        setError(t("UNEXPECTED_ERROR"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={styles.modalBackdrop}
      onClick={handleBackdropClick}
      data-testid="backdrop"
    >
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        <h2>{isLogin ? t("LOGIN") : t("REGISTER")}</h2>
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
                    <label htmlFor="username">{t("USERNAME")}</label>
                    <Field type="text" id="username" name="username" />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="firstName">{t("FIRST_NAME")}</label>
                    <Field type="text" id="firstName" name="firstName" />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="lastName">{t("LAST_NAME")}</label>
                    <Field type="text" id="lastName" name="lastName" />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="city">{t("CITY")}</label>
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
                <label htmlFor="email">{t("EMAIL")}</label>
                <Field type="text" id="email" name="email" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">{t("PASSWORD")}</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
              {!isLogin && (
                <div className={styles.formGroup}>
                  <label htmlFor="confirmPassword">
                    {t("CONFIRM_PASSWORD")}
                  </label>
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
              <button type="submit">
                {isLogin ? t("LOGIN") : t("REGISTER")}
              </button>
            </Form>
          </Formik>
        )}
        <p>
          {isLogin ? t("LOGIN_PROMPT") : t("REGISTER_PROMPT")}{" "}
          <span
            className={styles.toggleForm}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? t("LOGIN_ACTION") : t("REGISTER_ACTION")}
          </span>
        </p>
      </div>
    </div>
  );
};

AuthModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
};

export default AuthModal;
