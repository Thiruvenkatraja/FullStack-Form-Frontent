// import { useEffect } from "react";
import {useState} from "react";
import axios from "axios";

 const UseForm = (Validation)=> {
  const [values, setValues] = useState({
    candiatename: "",
    email: "",
    mobile: "",
    technology: "",
    startdate: "",
    followupdate:"",
    resource: "",
    status: "",
    feedback: "",
  });
  const [errors, seterrors] = useState({});
  const [done, setdone] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevalues) => {
      return {
        ...prevalues,
        [name]: value,
      };
    });
  };

  
 const handleSubmit = (event) => {
    event.preventDefault();
     console.log(values)
     console.log("I am Working")

    const enqdata = {
      candiatename: values.candiatename,
      email: values.email,
      mobile: values.mobile,
      technology: values.technology,
      startdate: values.startdate,
      followupdate:values.followupdate,
      resource: values.resource,
      status: values.status,
      feedback: values.feedback,
    };

  
  axios.post('https://enq-form-api.onrender.com/enq/EnquiryData', enqdata) 
    .then(res=>console.log(res.data))
        

    setValues({
      candiatename: "",
      email: "",
      mobile: "",
      technology: "",
      startdate: "",
      followupdate:"",
      resource: "",
      status: "", 
      feedback: "",
    });

    seterrors(Validation(values));
    
    setdone(true)
  };
  

  return { handleChange, values, handleSubmit, errors, done };
}
export default UseForm;