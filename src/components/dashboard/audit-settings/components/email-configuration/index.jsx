import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { baseUrl } from "../../../../../config/constants";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const EmailConfigurations = () => {
  const [loading, setLoading] = React.useState(false)
  const { company } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const [emailConfigs, setEmailConfigs] = useState({});

  const fetchEmailConfigurations = async () => {
    let companyId = user[0]?.company.find(
      (all) => all?.companyName === company
    )?.id;
    try {
      setLoading(true)
      const response = await axios.get(
        `${baseUrl}/email-configurations/company/${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${user[0]?.token}`,
          },
        }
      );
      setLoading(false)
      setEmailConfigs(response.data);
    } catch (error) {
      setLoading(false)
      console.error("Error fetching configurations", error);
    }
  };

  useEffect(() => {
    fetchEmailConfigurations();
  }, []);

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("User Name is required"),
    password: Yup.string().required("Password is required"),
    hostAddress: Yup.string().required("Host Address is required"),
    port: Yup.number()
      .required("Port is required")
      .integer("Port must be an integer"),
  });

  const handleAddConfiguration = async (values, { resetForm }) => {
    let companyId = user[0]?.company.find(
      (all) => all?.companyName === company
    )?.id;
    const payload = {
      ...values,
      starttlsEnable: values.starttlsEnable,
      smtpAuth: values.smtpAuth,
      companyId: companyId,
    };
    if (loading) return
    try {
      setLoading(true)
      await axios.post(`${baseUrl}/email-configurations`, payload, {
        headers: {
          Authorization: `Bearer ${user[0]?.token}`,
        },
      });
      setLoading(false)
      toast.success("Email Configuration Saved Successfully");
      fetchEmailConfigurations();
      resetForm();
    } catch (error) {
      setLoading(false)
      console.error("Error adding configuration", error);
    }
  };

  return (
    <div
      className="tab-pane fade"
      id="nav-email-configuration"
      role="tabpanel"
      aria-labelledby="nav-email-configuration-tab"
    >
      <h1 className="text-xl font-bold mb-1 sub-heading">
        Email Configuration
      </h1>
      <p className="fw-light">Save Email Configuration</p>
      <Formik
        initialValues={{
          userName: "",
          password: "",
          hostAddress: "",
          port: "",
          starttlsEnable: false,
          smtpAuth: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleAddConfiguration}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <label className="block font-medium">User Name</label>
              <Field
                name="userName"
                className="border p-2 w-full form-control"
                placeholder="Enter User Name"
              />
              {errors.userName && touched.userName && (
                <p className="text-red-500 text-sm error">{errors.userName}</p>
              )}
            </div>

            <div className="mt-3">
              <label className="block font-medium">Password</label>
              <Field
                name="password"
                type="password"
                className="border p-2 w-full form-control"
                placeholder="Enter Password"
              />
              {errors.password && touched.password && (
                <p className="text-red-500 text-sm error">{errors.password}</p>
              )}
            </div>

            <div className="mt-3">
              <label className="block font-medium">Host Address</label>
              <Field
                name="hostAddress"
                className="border p-2 w-full form-control"
                placeholder="Enter Host Address"
              />
              {errors.hostAddress && touched.hostAddress && (
                <p className="text-red-500 text-sm error">
                  {errors.hostAddress}
                </p>
              )}
            </div>

            <div className="mt-3">
              <label className="block font-medium">Port</label>
              <Field
                name="port"
                type="number"
                className="border p-2 w-full form-control"
                placeholder="Enter Port"
              />
              {errors.port && touched.port && (
                <p className="text-red-500 text-sm error">{errors.port}</p>
              )}
            </div>

            <div className="mt-3 d-flex gap-2 items-center">
              <Field
                name="starttlsEnable"
                type="checkbox"
                className="mr-2 form-check-input form-control height-20 width-20"
              />
              <label className="flex items-center">Start TLS Enable</label>
            </div>

            <div className="mt-3 d-flex gap-2 items-center">
              <Field
                name="smtpAuth"
                type="checkbox"
                className="mr-2 form-check-input form-control  height-20 width-20"
              />
              <label className="flex items-center">SMTP Auth</label>
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              {
                loading ? "Loading..." : "Save Email Configuration"
              }
            </button>
          </Form>
        )}
      </Formik>
      <hr className="mt-4" />
      <h1 className="text-xl font-bold mb-1 sub-heading">
        Email Configuration
      </h1>
      <p className="fw-light">Saved Email Configuration</p>

      {
        loading ? <CircularProgress /> :
          <div>
            <p className="f-20">
              <strong>User Name:</strong> {emailConfigs?.data?.userName || "--"}
            </p>
            <p className="f-20">
              <strong>Host:</strong> {emailConfigs?.data?.hostAddress || "--"}
            </p>
            <p className="f-20">
              <strong>Port:</strong> {emailConfigs?.data?.port || "--"}
            </p>
            <p className="f-20">
              <strong>Start TLS:</strong>{" "}
              {emailConfigs?.data?.starttlsEnable || "--"}
            </p>
            <p className="f-20">
              <strong>SMTP Auth:</strong> {emailConfigs?.data?.smtpAuth || "--"}
            </p>
          </div>
      }
    </div>
  );
};

export default EmailConfigurations;
