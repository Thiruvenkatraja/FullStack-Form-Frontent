export default function Validation(values){
    let errors={}

    if(!values.candiateFname){
        errors.fname="Fname Required"
    }
    if(!values.candiateLname){
        errors.lname="Lname Required"
    }
    if(!values.email){
        errors.email="Email Required"
    }
    if(!values.mobile){
        errors.mobile="MobileNum Required"
    }else if(values.mobile.length < 10){
        errors.mobile="MobileNum Not valid"
    }
    if(!values.technology){
        errors.technology="Technology Required"
    }
    if(!values.startdate){
        errors.startdate="Date Required"
    }
    if(!values.followupdate){
        errors.followupdate="Follow Up Date Required"
    }
    if(!values.resource){
        errors.resource="Resource Required"
    }
    
    if(!values.status){
        errors.status="Status Required"
    }
  

    return errors;
}