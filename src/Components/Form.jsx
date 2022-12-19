import React from "react";
import EnquiryForm from "./Enquiry-Form";
import "./Form.css";


export default function EnqForm() {
  
  return (
    
      <div className="form-container">
        {/* <div className="form-left">
          <img
            src="https://intellectoglobal.com/wp-content/uploads//2022/04/IG-Logo-White.svg"
            alt="img not found"
          />
        </div> */}
        <div className="form-right">
          <EnquiryForm />
        </div>
      </div>
    
  );
}
