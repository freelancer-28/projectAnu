import React, { useState, useEffect, useRef } from "react";
import Container from "@material-ui/core/Container";
import { useSelector, useDispatch } from "react-redux";
import { selectAdminFileData } from "../../reducers/adminFileData";
import { selectJobData } from '../../reducers/jobData'
import { selectAdminRawData } from "../../reducers/adminRawData";
import { selectAddFile } from "../../reducers/addFile";
import { LinkContainer, Box, Button, ButtonContainer, TextField, IconContainer } from "./styles";
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

const getColumnWidth = (i) => {
  if (i == 1) return 10;
  else return 8;
}

const columns = [
{ name: "Job ID", id: "jobid", sort: true, width:"7em"},
  { name: "Job Name", id: "jobname", sort: true, width:"30em" },
  { name: "Application Name", id: "applicationname", sort: true, width:"7em"},
  { name: "", id: "", width:"7em"},
  // { name: "", id: "", width:"7em"}
]

const AdminTool = (props) => {

  const [searchText, setSearchText] = useState('')
  const [rowID, setRowID] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(false);
  // const [isAddFile, setIsAddFile] = useState(false);
 
  const dispatch = useDispatch();
  // const data = useSelector(selectAdminFileData);
  const data = useSelector(selectJobData);
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

  const ViewDetailsLink = (id, rowdata) => {
     return <IconContainer onClick={()=>{}} icon={faTrashAlt} />
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

  const fetchJobDataFromServer = async () => {
    setIsDataLoading(true);
    let data = await jobAPIs.fetchJobData();
    data = data.fileJobConfigurationRequests || []
    console.log("******************************")
    console.log(data)
    data = data && data.filter(obj=>obj.jobid.includes(searchText))
    console.log("******************************")
    dispatch(updateJobData(processAdminData(data)));
    setTimeout(() => {
      setIsDataLoading(false);
    }, 600);
  };

  useEffect(() => {
    fetchJobDataFromServer()
  }, [searchText]);

  const handleErrorClose = () => {
    dispatch(submitFile({message: '', status: ''}));
  }

  console.log(props)
  const addFile = useSelector(selectAddFile);
  console.log(addFile)
  const { status, message } = addFile || {}

 return (
  <Box>
    <CustomErrorDialog open={status === "Success"} onClose={()=>handleErrorClose()} severity={status} message={message}/>
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
      <Button variant="contained" onClick={()=>{}} color="primary" disableElevation>
        Add
      </Button>
    </ButtonContainer>
    <Table data={data} columns={columns} onEditRow={onEditRow} selectableRows={false}></Table>
  </Box>
);
}

export default AdminTool;
