import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./AccountPwPart.module.scss";

interface AccountPwPartProps {
  userId: string;
  userDetails: {
    username: string;
    firstName: string;
    lastName: string;
    city: string;
    email: string;
  };
  onUpdate: () => void;
}

const AccountPwPart: React.FC<AccountPwPartProps> = ({
  userId,
  userDetails,
  onUpdate,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    newPassword: "",
    confirmNewPassword: "",
    currentPassword: "",
  };

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New Password is required"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
      .required("Confirm New Password is required"),
    currentPassword: Yup.string().required("Current Password is required"),
  });

  const handleSave = async (values: typeof initialValues) => {
    setIsUpdating(true);
    setErrorMessage("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      await axios.delete(`http://localhost:5005/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newUserDetails = {
        ...userDetails,
        password: values.newPassword,
      };

      await axios.post("http://localhost:5005/auth/register", newUserDetails);

      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        onUpdate();
      }, 1500);
    } catch (error) {
      setErrorMessage("Error updating password.");
      console.error("Error updating password:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={styles.accountPwPart}>
      {showSuccessMessage ? (
        <p className={styles.successMessage}>Password updated successfully!</p>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSave}
        >
          {({ isValid, dirty }) => (
            <Form>
              <div className={styles.inputGroup}>
                <label htmlFor="newPassword">New Password</label>
                <Field
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className={styles.input}
                  disabled={isUpdating}
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="confirmNewPassword">Confirm New Password</label>
                <Field
                  type="password"
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  className={styles.input}
                  disabled={isUpdating}
                />
                <ErrorMessage
                  name="confirmNewPassword"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="currentPassword">Current Password</label>
                <Field
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  className={styles.input}
                  disabled={isUpdating}
                />
                <ErrorMessage
                  name="currentPassword"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.buttonContainer}>
                <button
                  type="submit"
                  disabled={isUpdating || !(isValid && dirty)}
                >
                  {isUpdating ? "Saving..." : "Save"}
                </button>
                {errorMessage && (
                  <p className={styles.errorMessage}>{errorMessage}</p>
                )}
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default AccountPwPart;
