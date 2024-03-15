import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

const Form = ({
  formik,
  nullReportingTo,
  allUsers,
  user,
  loading,
  nullSkillSet,
  email,
}) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="col-lg-6 mb-2">
          <div className="col-lg-12">
            <div className="form-group">
              <label htmlFor="area">Name:</label>
              <TextField
                id="name"
                name="name"
                type="text"
                className="form-control w-100"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>
          </div>
          {formik.touched.name && formik.errors.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>

        <div className="col-lg-6 mb-2">
          <div className="col-lg-12">
            <div className="form-group">
              <label htmlFor="area">Email:</label>
              <TextField
                id="email"
                name="email"
                type="text"
                className="form-control"
                value={email}
                disabled
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 mb-2">
          <div className="col-lg-12">
            <div className="form-group">
              <label htmlFor="area">Designation:</label>
              <TextField
                id="designation"
                name="designation"
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.designation}
              />
            </div>
          </div>
          {formik.touched.designation && formik.errors.designation && (
            <div className="error">{formik.errors.designation}</div>
          )}
        </div>

        <div className="col-lg-6">
          <label htmlFor="userHierarchy" className="w-100">
            User Roles:
          </label>
          <Select
            id="userHierarchy"
            name="userHierarchy"
            className="w-100 h-40"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userHierarchy}
          >
            <MenuItem value="">Select Role</MenuItem>
            <MenuItem value="IAH">IAH</MenuItem>
            <MenuItem value="Management_Auditee">Management_Auditee</MenuItem>
            <MenuItem value="Team_Lead">Team_Lead</MenuItem>
            <MenuItem value="Audit_Executive_2">Audit_Executive_2</MenuItem>
            <MenuItem value="Audit_Executive_1">Audit_Executive_1</MenuItem>
          </Select>
          {formik.touched.userHierarchy && formik.errors.userHierarchy && (
            <div className="error">{formik.errors.userHierarchy}</div>
          )}
        </div>
      </div>

      {nullSkillSet && (
        <div className="col-lg-12 mb-2">
          <label htmlFor="area">Skill Set:</label>
          <TextField
            id="designation"
            name="designation"
            type="text"
            className="form-control"
            defaultValue="null"
            readOnly
            disabled
          />
        </div>
      )}
      {!nullSkillSet && (
        <div className="col-lg-12 mb-2">
          <label htmlFor="skillSet" className="w-100">
            Skill Set:
          </label>
          <Select
            id="skillSet"
            name="skillSet"
            className="w-100 h-40"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.skillSet}
          >
            <MenuItem value="">Select Role</MenuItem>
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Fraud">Fraud</MenuItem>
            <MenuItem value="Operations">Operations</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
          {formik.touched.skillSet && formik.errors.skillSet && (
            <div className="error">{formik.errors.skillSet}</div>
          )}
        </div>
      )}

      <div className="row">
        {!nullReportingTo && (
          <div className="col-lg-6">
            <label htmlFor="reportingTo" className="w-100">
              Reporting To:
            </label>
            <Select
              id="reportingTo"
              name="reportingTo"
              className="w-100 h-40"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.reportingTo}
            >
              <MenuItem value="">Select User</MenuItem>
              {allUsers?.map((userVal, ind) => {
                return (
                  <MenuItem
                    value={userVal?.employeeid?.name}
                    key={ind}
                    className="h-80"
                  >
                    {userVal?.employeeid?.name}(
                    {userVal?.employeeid?.userHierarchy || "null"})
                  </MenuItem>
                );
              })}
            </Select>
            {formik.touched.reportingTo && formik.errors.reportingTo && (
              <div className="error">{formik.errors.reportingTo}</div>
            )}
          </div>
        )}

        {nullReportingTo && (
          <div className="col-lg-6">
            <label htmlFor="area">Reporting To:</label>
            <TextField
              id="designation"
              name="designation"
              type="text"
              className="form-control"
              defaultValue="null"
              readOnly
              disabled
            />
          </div>
        )}

        {/* Default Remarks select field */}
        <div className="col-lg-6">
          <label htmlFor="company" className="w-100">
            Company:
          </label>
          <Select
            id="company"
            name="company"
            className="w-100 h-40"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.company}
          >
            <MenuItem value="">Select Company</MenuItem>
            {user[0]?.userId?.company?.map((company, index) => {
              return (
                <MenuItem
                  value={company?.companyName}
                  key={index}
                  className="h-80"
                >
                  {company?.companyName}
                </MenuItem>
              );
            })}
          </Select>
          {formik.touched.company && formik.errors.company && (
            <div className="error">{formik.errors.company}</div>
          )}
        </div>
      </div>

      <button
        type="submit"
        className={`btn btn-primary ${loading && "disabled"} mt-4`}
      >
        {loading ? "Loading..." : "Update User"}
      </button>
    </form>
  );
};

export default Form;
