import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { FaFilter } from "react-icons/fa";
import _ from "lodash";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import EnqDataTable from "./Enq-Data-Table";
import EnqEditTable from "./Enq-Edit-Table";
import ExportToExcel from "./ExportToExcel";

const pageSize = 10;
export default function EnquiryList() {
  const [list, setList] = useState([]);
  const [paged, setPaged] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getData = () => {
    axios
      .get("https://enq-form-api.onrender.com/enq")
      .then((res) => {
        setList(res.data);
        setAllVal(res.data);
        setPaged(_(res.data).slice(0).take(pageSize).value());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const [enqId, setEnqId] = useState(null);
  const [order, setOrder] = useState("ASC");
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...list].sort((a, b) =>
        a[col].toString().toLowerCase() > b[col].toString().toLowerCase()
          ? 1
          : -1
      );
      setPaged(sorted) || setList(sorted);
      setOrder("DSC");
    }

    if (order === "DSC") {
      const sorted = [...list].sort((a, b) =>
        a[col].toString().toLowerCase() < b[col].toString().toLowerCase()
          ? 1
          : -1
      );
      setPaged(sorted) || setList(sorted);
      setOrder("ASC");
    }
  };

  const [values, setValues] = useState({
    candiateFname: "",
    candiateLname: "",
    email: "",
    mobile: "",
    technology: "",
    startdate: "",
    followupdate: "",
    resource: "",
    status: "",
    feedback: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newEditData = { ...values };
    newEditData[name] = value;
    setValues(newEditData);
  };

  const enqdata = {
    candiateFname: values.candiateFname,
    candiateLname: values.candiateLname,
    email: values.email,
    mobile: values.mobile,
    technology: values.technology,
    startdate: values.startdate,
    followupdate: values.followupdate,
    resource: values.resource,
    status: values.status,
    feedbackc: values.feedback,
  };
  const editData = (id) => {
    axios
      .put(`http://localhost:5000/enq/update-enqdata/${id}`, enqdata)
      .then((res) => {
        console.log(res.data);
        console.log("Empdata Successfully updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditClick = (event, obj) => {
    event.preventDefault();

    setEnqId(obj._id);

    const formValues = {
      candiateFname: obj.candiateFname,
      candiateLname: obj.candiateLname,
      email: obj.email,
      mobile: obj.mobile,
      technology: obj.technology,
      startdate: obj.startdate,
      followupdate: obj.followupdate,
      resource: obj.resource,
      status: obj.status,
      feedback: obj.feedback,
    };
    setValues(formValues);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // console.log(values);
    // console.log("I am Working");

    editData(enqId);

    const editedData = {
      id: enqId,
      candiateFname: values.candiateFname,
      candiateLname: values.candiateLname,
      email: values.email,
      mobile: values.mobile,
      technology: values.technology,
      startdate: values.startdate,
      followupdate: values.followupdate,
      resource: values.resource,
      status: values.status,
      feedback: values.feedback,
    };

    const newList = [...(list || paged)];
    const index = list.findIndex((lists) => lists._id === enqId);
    newList[index] = editedData;
    setList(newList) || setPaged(newList);
    setEnqId(null);
  };
  const Datass = list.map((edata,index)=>({
    SNo:index+1,
   CandiateFname:edata.candiateFname,
    CandiateLname:edata.candiateLname,
    Email:edata.email,
    Mobile:edata.mobile,
    StartDate:edata.startdate,
    Followupdate:edata.followupdate,
    Technology:edata.technology,
    Resource:edata.resource,
    Status:edata.status,
    Feedback:edata.feedback
}))
  const Datas = Datass
  const Filename ='EnquiredData'

  const [search, setSearch] = useState("");
  const [allVal, setAllVal] = useState([]);
  const [click, setClick] = useState(true);
  const [click1, setClick1] = useState(true);
  const [click2, setClick2] = useState(true);
  const [click3, setClick3] = useState(true);
  const [click4, setClick4] = useState(true);
  const [click5, setClick5] = useState(true);
  const [click6, setClick6] = useState(true);
  const [click7, setClick7] = useState(true);
  const [click8, setClick8] = useState(true);

  const toggle = () => {
    setClick(!click);
  };
  const toggle1 = () => {
    setClick1(!click1);
  };
  const toggle2 = () => {
    setClick2(!click2);
  };
  const toggle3 = () => {
    setClick3(!click3);
  };
  const toggle4 = () => {
    setClick4(!click4);
  };
  const toggle5 = () => {
    setClick5(!click5);
  };
  const toggle6 = () => {
    setClick6(!click6);
  };
  const toggle7 = () => {
    setClick7(!click7);
  };
  const toggle8 = () => {
    setClick8(!click8);
  };

  const pageCount = list ? Math.ceil(list.length / pageSize) : 0;
  if (pageCount === -1) return null;
  const pages = _.range(1, pageCount + 1);
  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const pagePost = _(list).slice(startIndex).take(pageSize).value();
    setPaged(pagePost);
  };

  return (
    <div className="data-table">
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        style={{
          position: "relative",
          marginTop: "50",
          left: "1rem",
          marginBottom: "20",
          width: "20rem",
        }}
        onChange={(e) => {
          e.preventDefault();
          setSearch(e.target.value);
          if (search === "") {
            return setPaged(allVal) || setList(allVal);
          } else {
            let temp = allVal.filter(
              (data) =>
                data.candiateFname
                  .toLowerCase()
                  .trim()
                  .includes(search.toLowerCase()) ||
                data.candiateLname
                  .toLowerCase()
                  .trim()
                  .includes(search.toLowerCase()) ||
                data.email.toLowerCase().trim().includes(search.toLowerCase())
            );
            setPaged(temp) || setList(temp);
          }
        }}
      />
      <div
        className="drop-down"
        style={{
          display: click ? "none" : "",
          transition: click ? ".6s" : ".6s",
          top: "15rem",
          left: "2rem",
        }}
      >
        <Multiselect
          isObject={false}
          id="css_custom"
          // groupBy="cat"
          closeIcon="circle"
          // ref={multiselectRef}
          style={{
            optionContainer: {
              width: "11rem",
              height: "5rem",
              background: "grey",
              fontSize: "0.7rem",
            },
            searchBox: {
              maxHeight: "2.5rem",
              overflow: "hidden",
              border: "2px solid black",
            },
            inputFileld: {
              margin: "3px",
            },
          }}
          keepSearchTerm="false"
          options={allVal.map((fil) => fil.candiateFname)}
          closeOnSelect
          onSelect={(event) => {
            if (event.length === 0) {
              return setList(allVal) || setPaged(allVal);
            } else {
              let temp = allVal.filter((data) =>
                event.includes(data.candiateFname)
              );
              setPaged(temp) || setList(temp);
              console.log(event);
            }
          }}
          onRemove={(event) => {
            if (event.length === 0) {
              return setList(allVal) || setPaged(allVal);
            } else {
              let temp = allVal.filter((data) =>
                event.includes(data.candiateFname)
              );
              setPaged(temp) || setList(temp);
              console.log(event);
            }
          }}
          selectedValues={() => {
            setList(allVal) || setPaged(allVal);
          }}
          showCheckbox
          showArrow
          displayValue
        />
        <button class="btn btn-primary okay" onClick={toggle}>
          Okay
        </button>
      </div>

      <div
        className="drop-down"
        style={{
          display: click1 ? "none" : "",
          transition: click1 ? ".6s" : ".6s",
          top: "15rem",
          left: "12rem",
        }}
      >
        <Multiselect
          isObject={false}
          id="css_custom"
          // groupBy="cat"
          closeIcon="circle"
          // ref={multiselectRef}
          style={{
            optionContainer: {
              width: "11rem",
              height: "5rem",
              background: "grey",
              fontSize: "0.7rem",
            },
            searchBox: {
              maxHeight: "2.5rem",
              overflow: "hidden",
              border: "2px solid black",
            },
            inputFileld: {
              margin: "3px",
            },
          }}
          keepSearchTerm="false"
          options={allVal.map((fil) => fil.candiateLname)}
          closeOnSelect
          onSelect={(event) => {
            if (event.length === 0) {
              return setList(allVal) || setPaged(allVal);
            } else {
              let temp = allVal.filter((data) =>
                event.includes(data.candiateLname)
              );
              setPaged(temp) || setList(temp);
              console.log(event);
            }
          }}
          onRemove={(event) => {
            if (event.length === 0) {
              return setList(allVal) || setPaged(allVal);
            } else {
              let temp = allVal.filter((data) =>
                event.includes(data.candiateLname)
              );
              setPaged(temp) || setList(temp);
              console.log(event);
            }
          }}
          selectedValues={() => {
            setList(allVal) || setPaged(allVal);
          }}
          showCheckbox
          showArrow
          displayValue
        />
        <button class="btn btn-primary okay" onClick={toggle1}>
          Okay
        </button>
      </div>

      <div
        className="drop-down"
        style={{
          display: click2 ? "none" : "",
          transition: click2 ? ".6s" : ".6s",
          top: "15rem",
          left: "22rem",
        }}
      >
        <Multiselect
          isObject={false}
          id="css_custom"
          // groupBy="cat"
          closeIcon="circle"
          // ref={multiselectRef}
          style={{
            optionContainer: {
              width: "11rem",
              height: "5rem",
              background: "grey",
              fontSize: "0.7rem",
            },
            searchBox: {
              maxHeight: "2.5rem",
              overflow: "hidden",
              border: "2px solid black",
            },
            inputFileld: {
              margin: "3px",
            },
          }}
          keepSearchTerm="false"
          options={allVal.map((fil) => fil.email)}
          closeOnSelect
          onSelect={(event) => {
            if (event.length === 0) {
              return setList(allVal) || setPaged(allVal);
            } else {
              let temp = allVal.filter((data) => event.includes(data.email));
              setPaged(temp) || setList(temp);
              console.log(event);
            }
          }}
          onRemove={(event) => {
            if (event.length === 0) {
              return setList(allVal) || setPaged(allVal);
            } else {
              let temp = allVal.filter((data) => event.includes(data.email));
              setPaged(temp) || setList(temp);
              console.log(event);
            }
          }}
          selectedValues={() => {
            setList(allVal) || setPaged(allVal);
          }}
          showCheckbox
          showArrow
          displayValue
        />
        <button class="btn btn-primary okay" onClick={toggle2}>
          Okay
        </button>
      </div>
      <div
        className="drop-down"
        style={{
          display: click3 ? "none" : "",
          transition: click3 ? ".6s" : ".6s",
          top: "15rem",
          left: "35rem",
        }}
      >
        <Multiselect
          isObject={false}
          id="css_custom"
          // groupBy="cat"
          closeIcon="circle"
          // ref={multiselectRef}
          style={{
            optionContainer: {
              width: "11rem",
              height: "5rem",
              background: "grey",
              fontSize: "0.7rem",
            },
            searchBox: {
              maxHeight: "2.5rem",
              overflow: "hidden",
              border: "2px solid black",
            },
            inputFileld: {
              margin: "3px",
            },
          }}
          keepSearchTerm="false"
          options={allVal.map((fil) => fil.mobile)}
          closeOnSelect
          onSelect={(event) => {
            if (event.length === 0) {
              return setList(allVal) || setPaged(allVal);
            } else {
              let temp = allVal.filter((data) => event.includes(data.mobile));
              setPaged(temp) || setList(temp);
              console.log(event);
            }
          }}
          onRemove={(event) => {
            if (event.length === 0) {
              return setList(allVal) || setPaged(allVal);
            } else {
              let temp = allVal.filter((data) => event.includes(data.mobile));
              setPaged(temp) || setList(temp);
              console.log(event);
            }
          }}
          selectedValues={() => {
            setList(allVal) || setPaged(allVal);
          }}
          showCheckbox
          showArrow
          displayValue
        />
        <button class="btn btn-primary okay" onClick={toggle3}>
          Okay
        </button>
      </div>

      <div
        className="drop-down"
        style={{
          display: click4 ? "none" : "",
          transition: click4 ? ".6s" : ".6s",
          top: "15rem",
          left: "42rem",
        }}
      >
        <Multiselect
          isObject={false}
          id="css_custom"
          // groupBy="cat"
          closeIcon="circle"
          // ref={multiselectRef}
          style={{
            optionContainer: {
              width: "11rem",
              height: "5rem",
              background: "grey",
              fontSize: "0.7rem",
            },
            searchBox: {
              maxHeight: "2.5rem",
              overflow: "hidden",
              border: "2px solid black",
            },
            inputFileld: {
              margin: "3px",
            },
          }}
          keepSearchTerm="false"
          options={allVal.map((fil) => fil.technology)}
          closeOnSelect
          onSelect={(event) => {
            if (event.length === 0) {
              return setList(allVal) || setPaged(allVal);
            } else {
              let temp = allVal.filter((data) =>
                event.includes(data.technology)
              );
              setPaged(temp) || setList(temp);
              console.log(event);
            }
          }}
          onRemove={(event) => {
            if (event.length === 0) {
              return setList(allVal) || setPaged(allVal);
            } else {
              let temp = allVal.filter((data) =>
                event.includes(data.technology)
              );
              setPaged(temp) || setList(temp);
              console.log(event);
            }
          }}
          selectedValues={() => {
            setList(allVal) || setPaged(allVal);
          }}
          showCheckbox
          showArrow
          displayValue
        />
        <button class="btn btn-primary okay" onClick={toggle4}>
          Okay
        </button>
      </div>

      <div
        className="drop-down"
        style={{
          display: click5 ? "none" : "",
          transition: click5 ? ".6s" : ".6s",
          top: "15rem",
          left: "55rem",
        }}
      >
        <Multiselect
          isObject={false}
          id="css_custom"
          // groupBy="cat"
          closeIcon="circle"
          // ref={multiselectRef}
          style={{
            optionContainer: {
              width: "11rem",
              height: "5rem",
              background: "grey",
              fontSize: "0.7rem",
            },
            searchBox: {
              maxHeight: "2.5rem",
              overflow: "hidden",
              border: "2px solid black",
            },
            inputFileld: {
              margin: "3px",
            },
          }}
          keepSearchTerm="false"
          options={allVal.map((fil) => fil.startdate)}
          closeOnSelect
          onSelect={(event) => {
            if (event.length === 0) {
              return setList(allVal) || setPaged(allVal);
            } else {
              let temp = allVal.filter((data) =>
                event.includes(data.startdate)
              );
              setPaged(temp) || setList(temp);
              console.log(event);
            }
          }}
          onRemove={(event) => {
            if (event.length === 0) {
              return setList(allVal) || setPaged(allVal);
            } else {
              let temp = allVal.filter((data) =>
                event.includes(data.startdate)
              );
              setPaged(temp) || setList(temp);
              console.log(event);
            }
          }}
          selectedValues={() => {
            setList(allVal) || setPaged(allVal);
          }}
          showCheckbox
          showArrow
          displayValue
        />

        <button class="btn btn-primary okay" onClick={toggle5}>
          Okay
        </button>
      </div>

      <div
        className="drop-down"
        style={{
          display: click6 ? "none" : "",
          transition: click6 ? ".6s" : ".6s",
          top: "15rem",
          left: "62rem",
        }}
      >
        <Multiselect
          isObject={false}
          id="css_custom"
          // groupBy="cat"
          closeIcon="circle"
          // ref={multiselectRef}
          style={{
            optionContainer: {
              width: "11rem",
              height: "5rem",
              background: "grey",
              fontSize: "0.7rem",
            },
            searchBox: {
              maxHeight: "2.5rem",
              overflow: "hidden",
              border: "2px solid black",
            },
            inputFileld: {
              margin: "3px",
            },
          }}
          keepSearchTerm="false"
          options={allVal.map((fil) => fil.followupdate)}
          closeOnSelect
          onSelect={(event) => {
            if (event.length === 0) {
              return setList(allVal) || setPaged(allVal);
            } else {
              let temp = allVal.filter((data) =>
                event.includes(data.followupdate)
              );
              setPaged(temp) || setList(temp);
              console.log(event);
            }
          }}
          onRemove={(event) => {
            if (event.length === 0) {
              return setList(allVal) || setPaged(allVal);
            } else {
              let temp = allVal.filter((data) =>
                event.includes(data.followupdate)
              );
              setPaged(temp) || setList(temp);
              console.log(event);
            }
          }}
          selectedValues={() => {
            setList(allVal) || setPaged(allVal);
          }}
          showCheckbox
          showArrow
          displayValue
        />
        <button class="btn btn-primary okay" onClick={toggle6}>
          Okay
        </button>
      </div>

      <div
        className="drop-down"
        style={{
          display: click7 ? "none" : "",
          transition: click7 ? ".6s" : ".6s",
          top: "15rem",
          left: "70rem",
        }}
      >
        <Multiselect
          isObject={false}
          id="css_custom"
          // groupBy="cat"
          closeIcon="circle"
          // ref={multiselectRef}
          style={{
            optionContainer: {
              width: "11rem",
              height: "5rem",
              background: "grey",
              fontSize: "0.7rem",
            },
            searchBox: {
              maxHeight: "2.5rem",
              overflow: "hidden",
              border: "2px solid black",
            },
            inputFileld: {
              margin: "3px",
            },
          }}
          keepSearchTerm="false"
          options={allVal.map((fil) => fil.resource)}
          closeOnSelect
          onSelect={(event) => {
            if (event.length === 0) {
              return setList(allVal) || setPaged(allVal);
            } else {
              let temp = allVal.filter((data) => event.includes(data.resource));
              setPaged(temp) || setList(temp);
              console.log(event);
            }
          }}
          onRemove={(event) => {
            if (event.length === 0) {
              return setList(allVal) || setPaged(allVal);
            } else {
              let temp = allVal.filter((data) => event.includes(data.resource));
              setPaged(temp) || setList(temp);
              console.log(event);
            }
          }}
          selectedValues={() => {
            setList(allVal) || setPaged(allVal);
          }}
          showCheckbox
          showArrow
          displayValue
        />
        <button class="btn btn-primary okay" onClick={toggle7}>
          Okay
        </button>
      </div>

      <div
        className="drop-down"
        style={{
          display: click8 ? "none" : "",
          transition: click8 ? ".6s" : ".6s",
          top: "15rem",
          left: "81rem",
        }}
      >
        <Multiselect
          isObject={false}
          id="css_custom"
          // groupBy="cat"
          closeIcon="circle"
          // ref={multiselectRef}
          style={{
            optionContainer: {
              width: "11rem",
              height: "5rem",
              background: "grey",
              fontSize: "0.7rem",
            },
            searchBox: {
              maxHeight: "2.5rem",
              overflow: "hidden",
              border: "2px solid black",
            },
            inputFileld: {
              margin: "3px",
            },
          }}
          keepSearchTerm="false"
          options={allVal.map((fil) => fil.status)}
          closeOnSelect
          onSelect={(event) => {
            if (event.length === 0) {
              return setList(allVal) || setPaged(allVal);
            } else {
              let temp = allVal.filter((data) => event.includes(data.status));
              setPaged(temp) || setList(temp);
              console.log(event);
            }
          }}
          onRemove={(event) => {
            if (event.length === 0) {
              return setList(allVal) || setPaged(allVal);
            } else {
              let temp = allVal.filter((data) => event.includes(data.status));
              setPaged(temp) || setList(temp);
              console.log(event);
            }
          }}
          selectedValues={() => {
            setList(allVal) || setPaged(allVal);
          }}
          showCheckbox
          showArrow
          displayValue
        />
        <button class="btn btn-primary okay" onClick={toggle8}>
          Okay
        </button>
      </div>
      <div style={{margin:'1rem'}}>
      <ExportToExcel csvData={Datas} fileName={Filename}/>
      </div>
      <form onSubmit={handleSubmit}>
        <Table className="tables" bordered hover>
          <thead style={{verticalAlign:'middle',boxSizing:'border-box'}}>
            <tr style={{background: "brown", color: "white" }}>
              <th style={{ paddingRight: "5rem" }}>
              <FaFilter
                  className="filter"
                  onClick={toggle}
                  style={{
                    
                    marginLeft:'0.5rem',
                    marginRight:'0.5rem'
                   
                  }}
                />
                <i
                  onClick={() => sorting("candiateFname")}
                  className={
                    order === "DSC"
                      ? "fa fa-sort-alpha-asc"
                      : "fa fa-sort-alpha-desc"
                  }
                  style={{ paddingRight: "1rem" }}
                ></i>
                
                Candiate-Fname
                {/* <FaFilter
                  className="filter"
                  onClick={toggle}
                  style={{
                    position: "absolute",
                    left: "10rem",
                    top: "1.5rem",
                  }}
                /> */}
              </th>
              <th style={{ paddingRight: "5rem" }}>
              <FaFilter
                  className="filter"
                  onClick={toggle1}
                  style={{
                    
                    marginLeft:'0.5rem',
                    marginRight:'0.5rem'
                   
                  }}
                />
                <i
                  onClick={() => sorting("candiateLname")}
                  className={
                    order === "DSC"
                      ? "fa fa-sort-alpha-asc"
                      : "fa fa-sort-alpha-desc"
                  }
                  style={{ paddingRight: "1rem" }}
                ></i>
                Candiate-Lname
                {/* <FaFilter
                  className="filter"
                  onClick={toggle1}
                  style={{
                    position: "absolute",
                    left: "22rem",
                    top: "1.5rem",
                  }}
                /> */}
              </th>
              <th style={{ paddingRight: "5rem" }}>

              <FaFilter
                  className="filter"
                  onClick={toggle2}
                  style={{
                    
                    marginLeft:'0.5rem',
                    marginRight:'0.5rem'
                   
                  }}
                />
                <i
                  onClick={() => sorting("email")}
                  className={
                    order === "DSC"
                      ? "fa fa-sort-alpha-asc"
                      : "fa fa-sort-alpha-desc"
                  }
                  style={{ paddingRight: "1rem" }}
                ></i>
                Email
                {/* <FaFilter
                  className="filter"
                  onClick={toggle2}
                  style={{
                    position: "absolute",
                    left: "35rem",
                    top: "1.5rem",
                  }}
                /> */}
              </th>
              <th style={{ paddingRight: "5rem" }}>
              <FaFilter
                  className="filter"
                  onClick={toggle3}
                  style={{
                    
                    marginLeft:'0.5rem',
                    marginRight:'0.5rem'
                   
                  }}
                />
                <i
                  onClick={() => sorting("mobile")}
                  className={
                    order === "DSC"
                      ? "fa fa-sort-alpha-asc"
                      : "fa fa-sort-alpha-desc"
                  }
                  style={{ paddingRight: "1rem" }}
                ></i>
                Mobile
                {/* <FaFilter
                  className="filter"
                  onClick={toggle3}
                  style={{
                    position: "absolute",
                    left: "44.5rem",
                    top: "1.5rem",
                  }}
                /> */}
              </th>
              <th style={{ paddingRight: "5rem" }}>
              <FaFilter
                  className="filter"
                  onClick={toggle4}
                  style={{
                    
                    marginLeft:'0.5rem',
                    marginRight:'0.5rem'
                   
                  }}
                />
                <i
                  onClick={() => sorting("technology")}
                  className={
                    order === "DSC"
                      ? "fa fa-sort-alpha-asc"
                      : "fa fa-sort-alpha-desc"
                  }
                  style={{ paddingRight: "1rem" }}
                ></i>
                Technology
                {/* <FaFilter
                  className="filter"
                  onClick={toggle4}
                  style={{
                    position: "absolute",
                    left: "56.5rem",
                    top: "1.5rem",
                  }}
                /> */}
              </th>
              <th style={{ paddingRight: "5rem" }}>
              <FaFilter
                  className="filter"
                  onClick={toggle5}
                  style={{
                    
                    marginLeft:'0.5rem',
                    marginRight:'0.5rem'
                   
                  }}
                />
                <i
                  onClick={() => sorting("startdate")}
                  className={
                    order === "DSC"
                      ? "fa fa-sort-alpha-asc"
                      : "fa fa-sort-alpha-desc"
                  }
                  style={{ paddingRight: "1rem" }}
                ></i>
                Start-Date
                {/* <FaFilter
                  className="filter"
                  onClick={toggle5}
                  style={{
                    position: "absolute",
                    left: "66.5rem",
                    top: "1.5rem",
                  }}
                /> */}
              </th>
              <th style={{ paddingRight: "5rem" }}>
              <FaFilter
                  className="filter"
                  onClick={toggle6}
                  style={{
                    
                    marginLeft:'0.5rem',
                    marginRight:'0.5rem'
                   
                  }}
                />
                <i
                  onClick={() => sorting("followupdate")}
                  className={
                    order === "DSC"
                      ? "fa fa-sort-alpha-asc"
                      : "fa fa-sort-alpha-desc"
                  }
                  style={{ paddingRight: "1rem" }}
                ></i>
                Follow-Up-Date
                {/* <FaFilter
                  className="filter"
                  onClick={toggle6}
                  style={{
                    position: "absolute",
                    left: "78rem",
                    top: "1.5rem",
                  }}
                /> */}
              </th>

              <th style={{ paddingRight: "5rem" }}>
              <FaFilter
                  className="filter"
                  onClick={toggle7}
                  style={{
                    
                    marginLeft:'0.5rem',
                    marginRight:'0.5rem'
                   
                  }}
                />
                <i
                  onClick={() => sorting("resource")}
                  className={
                    order === "DSC"
                      ? "fa fa-sort-alpha-asc"
                      : "fa fa-sort-alpha-desc"
                  }
                  style={{ paddingRight: "1rem" }}
                ></i>
                Resource
                {/* <FaFilter
                  className="filter"
                  onClick={toggle7}
                  style={{
                    position: "absolute",
                    left: "89rem",
                    top: "1.5rem",
                  }}
                /> */}
              </th>
              <th style={{ paddingRight: "5rem" }}>
              <FaFilter
                  className="filter"
                  onClick={toggle8}
                  style={{
                    
                    marginLeft:'0.5rem',
                    marginRight:'0.5rem'
                   
                  }}
                />
                <i
                  onClick={() => sorting("status")}
                  className={
                    order === "DSC"
                      ? "fa fa-sort-alpha-asc"
                      : "fa fa-sort-alpha-desc"
                  }
                  style={{ paddingRight: "1rem" }}
                ></i>
                Status
                {/* <FaFilter
                  className="filter"
                  onClick={toggle8}
                  style={{
                    position: "absolute",
                    left: "98.5rem",
                    top: "1.5rem",
                  }}
                /> */}
              </th>
              <th style={{ paddingRight: "8rem" }}>
                <i
                  onClick={() => sorting("feedback")}
                  className={
                    order === "DSC"
                      ? "fa fa-sort-alpha-asc"
                      : "fa fa-sort-alpha-desc"
                  }
                  style={{ paddingRight: "1rem" }}
                ></i>
                Feedback
              </th>
              <th style={{ paddingRight: "5rem" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((obj) => (
              <Fragment>
                {enqId === obj._id ? (
                  <EnqEditTable values={values} handleChange={handleChange} />
                ) : (
                  <EnqDataTable
                    obj={obj}
                    List={list}
                    setList={setList}
                    paged={paged}
                    setPaged={setPaged}
                    handleEditClick={handleEditClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </Table>
      </form>
      <nav className="d-flex justify-content-center page">
        <ul className="pagination">
          {pages.map((page) => (
            <li
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <p className="page-link" onClick={() => pagination(page)}>
                {page}
              </p>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
