import React from "react";
import Button from "react-bootstrap/Button";

const EnqEditTable = ({ values, handleChange }) => {
  return (
    <tr>
      <td>
        <input
          // className="form-input"
          type="text"
          name="candiateFname"
          placeholder="Enter your FirstName"
          value={values.candiateFname}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          // className="form-input"
          type="text"
          name="candiateLname"
          placeholder="Enter your LastName"
          value={values.candiateLname}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          // className="form-input"
          type="email"
          name="email"
          placeholder="Enter your Email"
          value={values.email}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          // className="form-input"
          type="number"
          name="mobile"
          placeholder="Enter your MobileNum"
          value={values.mobile}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          // className="form-input"
          type="text"
          name="technology"
          placeholder="Technology"
          value={values.technology}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          // className="form-input"
          type="date"
          name="startdate"
          placeholder="Start-Date"
          value={values.startdate}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          // className="form-input"
          type="date"
          name="followupdate"
          placeholder="Followup-Date"
          value={values.followupdate}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          // className="form-input"
          type="text"
          name="resource"
          placeholder="Resource"
          value={values.resource}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          // className="form-input"
          type="text"
          name="status"
          placeholder="Status"
          value={values.status}
          onChange={handleChange}
        />
      </td>

      <td>
        <input
          // className="form-input message"
          type="textarea"
          name="queries"
          placeholder="Type Here "
          value={values.feedback}
          onChange={handleChange}
        />
      </td>
      <td>
        <button
          type="submit"
          style={{ borderStyle: "none", marginLeft: "0.5rem" }}
        >
          <Button
            style={{
              display: "flex",
              alignItems: "centre",
              justifyContent: "centre",
            }}
          >
            <i className="fa fa-check" aria-hidden="true" />
          </Button>
        </button>
      </td>
    </tr>
  );
};
export default EnqEditTable;
