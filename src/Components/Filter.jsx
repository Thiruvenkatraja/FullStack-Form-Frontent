import axios from "axios";
import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { FaFilter } from "react-icons/fa";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import filterFactory, {
  multiSelectFilter
} from "react-bootstrap-table2-filter";

function Filter() {
  const [data, setData] = useState([]);

  const getData = () => {
    axios
      .get("http://localhost:5000/enq")
      .then((res) => {
        setData(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (data.length == 0) {
      getData();
    }
  }, []);

  // const [opt, setOpt] = useState({});
  // data.map((op)=>( setOpt(op)))

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    selected: [1, 3],
    clickToEdit: true,
  };
  
  const selectOptions1 = data.reduce((obj,op) => ({...obj,[op.candiateFname]:op.candiateFname}), {});
  const selectOptions2 = data.reduce((obj,op) => ({...obj,[op.candiateLname]:op.candiateLname}), {});
  const selectOptions3 = data.reduce((obj,op) => ({...obj,[op.email]:op.email}), {});
  const selectOptions4 = data.reduce((obj,op) => ({...obj,[op.mobile]:op.mobile}), {});
  const selectOptions5 = data.reduce((obj,op) => ({...obj,[op.startdate]:op.startdate}), {});
  const selectOptions6 = data.reduce((obj,op) => ({...obj,[op.followupdate]:op.followupdate}), {});
  const selectOptions7 = data.reduce((obj,op) => ({...obj,[op.technology]:op.technology}), {});
  const selectOptions8 = data.reduce((obj,op) => ({...obj,[op.resource]:op.resource}), {});
  const selectOptions9 = data.reduce((obj,op) => ({...obj,[op.status]:op.status}), {});
 
  

  
  const columns = [
    {
      dataField: "candiateFname",
      text: "CandiateFname",
      sort: true, 
      headerStyle: {
    backgroundColor: '#DC3535',
     color:'#FBFACD'
  },
      filter: multiSelectFilter({
        options: selectOptions1,
        style:{width:'10rem',height:'2rem'},
        mode: "checkbox"
      })
      
    },
    
    {
      dataField: "candiateLname",
      text: "CandiateLname",
      sort: true,
       headerStyle: {
    backgroundColor: '#DC3535',
     color:'#FBFACD'
  },
  filter: multiSelectFilter({
        options: selectOptions2,
        style:{width:'10rem',height:'2rem'},
        mode: "checkbox"
      })
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
       headerStyle: {
    backgroundColor: '#DC3535',
     color:'#FBFACD'
  },
  filter: multiSelectFilter({
        options: selectOptions3,
        style:{width:'10rem',height:'2rem'},
        mode: "checkbox"
      })
    },
    {
      dataField: "mobile",
      text: "Mobile",
      sort: true,
       headerStyle: {
    backgroundColor: '#DC3535',
     color:'#FBFACD'
  },
  filter: multiSelectFilter({
        options: selectOptions4,
        style:{width:'10rem',height:'2rem'},
        mode: "checkbox"
      })
    },
    {
      dataField: "startdate",
      text: "Start-Date",
      sort: true,
       headerStyle: {
    backgroundColor: '#DC3535',
     color:'#FBFACD'
  },
  filter: multiSelectFilter({
        options: selectOptions5,
        style:{width:'10rem',height:'2rem'},
        mode: "checkbox"
      })
    },
    {
      dataField: "followupdate",
      text: "Follow-Up-Date",
      sort: true,
       headerStyle: {
    backgroundColor: '#DC3535',
     color:'#FBFACD'
  },
  filter: multiSelectFilter({
        options: selectOptions6,
        style:{width:'10rem',height:'2rem'},
        mode: "checkbox"
      })
    },
    {
      dataField: "technology",
      text: "Technology",
      sort: true,
       headerStyle: {
    backgroundColor: '#DC3535',
     color:'#FBFACD'
  },
  filter: multiSelectFilter({
        options: selectOptions7,
        style:{width:'10rem',height:'2rem'},
        mode: "checkbox"
      })
    },
    {
      dataField: "resource",
      text: "Resource",
      sort: true,
       headerStyle: {
    backgroundColor: '#DC3535',
     color:'#FBFACD'
  },
  filter: multiSelectFilter({
        options: selectOptions8,
        style:{width:'10rem',height:'2rem'},
        mode: "checkbox"
      })
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
       headerStyle: {
    backgroundColor: '#DC3535',
    color:'#FBFACD'
  },
  filter: multiSelectFilter({
        options: selectOptions9,
        style:{width:'10rem',height:'2rem'},
        mode: "checkbox"
      })
    },

    {
      dataField: "feedback",
      text: "Feedback",
      sort: true,
       headerStyle: {
    backgroundColor: '#DC3535',
     color:'#FBFACD'
  },
    },
  ];
  return (
    <div className="App">
      <BootstrapTable
        keyField="_id"
        data={data}
        columns={columns}
        striped
        hover
        condensed
        pagination={paginationFactory()}
        cellEdit={cellEditFactory({
          mode: "dbclick",
          blurToSave: true,
          nonEditableRows: () => [1, 2, 3],
        })}
        selectRow={selectRow}
        filter={filterFactory()}
      />
    </div>
  );
}

export default Filter;
