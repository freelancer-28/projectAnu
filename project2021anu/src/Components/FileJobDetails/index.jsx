import React, { useState, useEffect, useRef } from "react";
import Container from "@material-ui/core/Container";
import { useSelector, useDispatch } from "react-redux";
import { selectAdminFileData } from "../../reducers/adminFileData";
import { selectJobData } from '../../reducers/jobData'
import { selectJobApplications } from '../../reducers/jobApplications'
import { selectAdminRawData } from "../../reducers/adminRawData";
import { selectAddFile } from "../../reducers/addFile";
import { LinkContainer, Box, Button, SaveButton, ButtonContainer, TextField, IconContainer } from "./styles";
import Table from "../Table";
import fileAPIs from "../../apis/AdminTool";
import jobAPIs from "../../apis/JobTool"
import {updateProducerOptions,  updateFrequencyIdsOptions, updateRouteOptions, updateAdminFileData, updateFileData, submitFile, updateAdminRawData } from "../../actions";
import AddFile from "../AddFile";
import EditFile from "../EditFile";
import CustomErrorDialog from '../CustomErrorDialog/index'
import filtersAPIs from "../../apis/FileObserver/filters";
import Drawer from '@material-ui/core/Drawer';
import FileDetailsDrawer from '../FileDetails/FileDetailsDrawer'
import { updateJobData } from "../../actions/jobData";
// import { TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
// const ViewDetailsLink = <LinkContainer href="/filedetails">View Details</LinkContainer>;
import {
  faSort,
  faSortUp,
  faSortDown,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import { updatejobApplications } from "../../actions/jobApplications";

const getColumnWidth = (i) => {
  if (i == 1) return 10;
  else return 8;
}

const columns = [
{ name: "Job ID", id: "jobId", sort: true, width:"7em"},
  { name: "Job Name", id: "jobName", sort: true, width:"30em" },
  { name: "Application Name", id: "jobsApplicationName", sort: true, width:"7em"},
  { name: "", id: "", width:"7em"},
  // { name: "", id: "", width:"7em"}
]

const AdminTool = (props) => {

  const [status,setStatus] = useState(undefined)
  const [message,setMessage] = useState(undefined)
  const [jid,setJid] = useState(null)
  const [jname,setJname] = useState(null)
  const [japplicationName,setJApplicationName] = useState(null)
  const [addJob, setAddJob] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [rowID, setRowID] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(false);
  // const [isAddFile, setIsAddFile] = useState(false);
 
  const dispatch = useDispatch();
  // const data = useSelector(selectAdminFileData);
  const data = useSelector(selectJobData);
  const jobApplicationsOptions = useSelector(selectJobApplications);
  const rawData = useSelector(selectAdminRawData)

  const onEditRow = (rowIndex) => {
    dispatch(updateFileData(rawData[rowIndex]));
    props.history.push('/editfile')
    console.log(rowIndex)
  }

  const handleJobSearch = (event) => {
    console.log(event.target.value)
    setSearchText(event.target.value)
  }
  const onSearchSubmit = (event) => {
    event.preventDefault()
    console.log(event.target.searchText.value)
  }

  const handleSaveNewJOB = () => {
    setMessage(jid)
    setAddJob(!addJob)
    setStatus("Success")
  }
  const ViewDetailsLink = (id, rowdata) => {
    if(id === 0 && addJob){
      return (
      <SaveButton variant="contained" onClick={handleSaveNewJOB} style={{'backgroundColor': 'red !important'}} color="primary" disableElevation>
        Save
      </SaveButton>)
    } else {
      return <IconContainer onClick={()=>{}} icon={faTrashAlt} />
    }
  };

  const processAdminData = (data) => {
    if (!data || !Array.isArray(data)) return;
    return data.map((d,i) => {
      const temp = [];
      columns.forEach((c) => {
        if (c.id) {
          temp.push(d[c.id]);
        }
      });
      temp.push(ViewDetailsLink(i, data[i]));
      return temp;
    });
  };

  const processJobApplications = applications => {
    return applications.map(app => ({
      "value": app.applicationId,
      "label": app.applicationName
    }))
  }

  const fetchJobDataFromServer = async () => {
    setIsDataLoading(true);
    let data = await jobAPIs.fetchJobData();
    let jobApps = await jobAPIs.fetchJobApplications();
    data = data.jobNames || []
    jobApps = jobApps.applications || []
    console.log("******************************")
    console.log(jobApps)
    console.log(data)
    data = data && data.filter(obj=>obj.jobId.includes(searchText))
    console.log("******************************")
    console.log("addJob : ", addJob)
    if(addJob){
      data.unshift({
        jobId: event => setJid(event.target.value),
        jobName: event => setJname(event.target.value),
        jobsApplicationName: event => setJApplicationName(event.value),
      })
    }
    if(addJob === false && (jid || jname || japplicationName)){
      data.unshift({
        jobId: jid,
        jobName: jname,
        jobsApplicationName: japplicationName,
      })
    } 

    dispatch(updateJobData(processAdminData(data)));
    dispatch(updatejobApplications(processJobApplications(jobApps)));
    setTimeout(() => {
      setIsDataLoading(false);
    }, 600);
  };

  useEffect(() => {
    fetchJobDataFromServer()
  }, [searchText, addJob]);

  const handleErrorClose = () => {
    setStatus("failed")
  }

  const handleAddNewJob = () => {
    setAddJob(true)
  }

  console.log(data)
  const addFile = useSelector(selectAddFile);
  console.log(addFile)
  console.log(jobApplicationsOptions)

 return (
  <Box>
    <CustomErrorDialog open={status === "Success"} onClose={()=>handleErrorClose()} severity={status} message={"You successfully added "+ `${jid}.`}/>
    <ButtonContainer>
    <form onSubmit={onSearchSubmit}>
      <TextField id="searchText" variant="outlined" 
        placeholder="Search..."
        name="searchText"
        value={searchText}
        onChange={handleJobSearch}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton>
                <SearchIcon onSubmit={onSearchSubmit}/>
              </IconButton>
            </InputAdornment>
          )
        }}/>
      </form>
      <Button variant="contained" onClick={handleAddNewJob} color="primary" disableElevation>
        Add
      </Button>
    </ButtonContainer>
    <Table data={data} columns={columns} onEditRow={onEditRow} selectableRows={false} jobApplicationsOptions={jobApplicationsOptions}></Table>
  </Box>
);
}

export default AdminTool;
