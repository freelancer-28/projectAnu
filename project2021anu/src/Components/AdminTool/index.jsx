import React, { useState, useEffect, useRef } from "react";
import Container from "@material-ui/core/Container";
import { useSelector, useDispatch } from "react-redux";
import { selectAdminFileData } from "../../reducers/adminFileData";
import { selectAdminRawData } from "../../reducers/adminRawData";
import { selectAddFile } from "../../reducers/addFile";
import { LinkContainer, Box, Button, ButtonContainer } from "./styles";
import Table from "../../Components/Table";
import fileAPIs from "../../apis/AdminTool";
import {updateProducerOptions,  updateFrequencyIdsOptions, updateRouteOptions, updateAdminFileData, updateFileData, submitFile, updateAdminRawData } from "../../actions";
import AddFile from "../AddFile";
import EditFile from "../EditFile";
import CustomErrorDialog from '../CustomErrorDialog/index'
import filtersAPIs from "../../apis/FileObserver/filters";
import Drawer from '@material-ui/core/Drawer';
import FileDetailsDrawer from '../FileDetails/FileDetailsDrawer'
// const ViewDetailsLink = <LinkContainer href="/filedetails">View Details</LinkContainer>;

const getColumnWidth = (i) => {
  if (i == 1) return 10;
  else return 8;
}

const columns = [
{ name: "Producer", id: "producerName", sort: true, width:"7em"},
  { name: "File Mask", id: "fileMask", sort: true, width:"30em" },
  { name: "Steward", id: "steward", sort: true, width:"7em"},
  { name: "SLA Time", id: "slaTime", sort: true, width:"7em"},
  { name: "Active", id: "active", sort: true, width:"7em"},
  { name: "", id: "", width:"7em"}
]

const AdminTool = (props) => {
  const [rowID, setRowID] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const toggleDrawer = () => {
    setShowDetails(!showDetails)
  }
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isAddFile, setIsAddFile] = useState(false);
 
  const dispatch = useDispatch();
  const data = useSelector(selectAdminFileData);
  const rawData = useSelector(selectAdminRawData)

  const onEditRow = (rowIndex) => {
    dispatch(updateFileData(rawData[rowIndex]));
    props.history.push('/editfile')
    console.log(rowIndex)
  }

  const handleAddFile = () => {
    // dispatch(updateFileData());
    props.history.push('/addfile')
    // console.log(rowIndex)
  }

  const ViewDetailsLink = (id, rowdata) => {
    console.log(rowdata)
    const viewDetails = () => {
      console.log("view details -------------------")
      setRowID(rowdata.producerFileId)
      setShowDetails(true)
      // props.history.push(`/filedetails/${rowdata.producerFileId}`)
    }
    // href={`/filedetails/${rowdata.producerFileId}`}
   return <LinkContainer key={id} onClick={viewDetails} >View Details{id}</LinkContainer>
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

  const fetchAdminDataFromServer = async () => {
    setIsDataLoading(true);
    const data = await fileAPIs.fetchData();
    // console.log(processAdminData(data.fileconfigurations));
    dispatch(updateAdminRawData(data.fileAdminConfigurationRequests));
    dispatch(updateAdminFileData(processAdminData(data.fileAdminConfigurationRequests)));
    setTimeout(() => {
      setIsDataLoading(false);
    }, 600);
  };

  const fetchProducerFiltersFromServer = async () => {
    dispatch(updateProducerOptions([]))
    dispatch(updateRouteOptions([]));
    const data = await filtersAPIs.fetchProducerOptions();
    ///////////////////////
    // collect frequency id
    let freqIds = {}
    data.frequencySpecifierNames.forEach(obj => {
      if(obj.frequency === "DayOfWeekAndTime"){
        freqIds["weekly_FrequencyId"] = obj.frequencyId
      }
      if(obj.frequency === "Monthly"){
        freqIds["monthly_FrequencyId"] = obj.frequencyId
        if(obj.frequencySpecifier === "Begin"){
          freqIds["begin_frequencySpecifier"] = obj.frequencySpecifierId
        }
        if(obj.frequencySpecifier === "End"){
          freqIds["end_frequencySpecifier"] = obj.frequencySpecifierId
        }
      }
    })
    
    ///////////////////////
    const producerOptions = data.producerNames.map(d=>({
        value: d.producerId,
        label: d.producerName,
        sftAccountName:  d.sftAccountName
      }))
    // console.log(producerOptions)
    let routeOptions = data.route.reduce((result,d) => {
      let updated = false;
        result.map(route => {
          if(route.value === d.routeId){
            route.hopId= [...route.hopId, d.hopId];
            route.hopName= [...route.hopName, d.hopName]
            updated = true;
          }
          return route
        })
        if(!updated){
          result.push({
            value: d.routeId,
            label: d.routeName,
            hopId: [d.hopId],
            hopName: [d.hopName]
          })
        }     
        return result
      }, [])

    dispatch(updateProducerOptions(producerOptions));
    dispatch(updateRouteOptions(routeOptions))
    dispatch(updateFrequencyIdsOptions(freqIds))
  };

  useEffect(() => {
    fetchAdminDataFromServer();
    fetchProducerFiltersFromServer()
  }, []);

  console.log(isAddFile);

  const toggleaddFile = () => {
    setIsAddFile(!isAddFile)
  }

  const editData = {
    producer: "NEB",
    sftAccountName: "TEST",
    direction: "In Bound",
    fileMask: "fm",
    prefix: "prefix",
    siffux: "suffix",
    dateMask: "dm",
    dateTimeMask: "dtm",
    route: "CIP",
    frequency: {
      occurence: null,
      hopId: null,
      fileCount: null,
      frequencies: [
        {
          id: 1,
          days: [1,2,3,4,5],
          startTime: "ff",
          sla: "asda",
          endTime: "ddddd"
        }
      ]

    }
  }

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
    {!isAddFile && 
    <ButtonContainer>
      <Button variant="contained" color="primary" disableElevation>
        Delete
      </Button>
      <Button variant="contained" onClick={()=>handleAddFile()} color="primary" disableElevation>
        Add File
      </Button>
    </ButtonContainer>
    }
    {isAddFile ? 
    <EditFile toggleaddFile = {toggleaddFile}/> : 
    // <AddFile toggleaddFile = {toggleaddFile}/> :
    <Table data={data} columns={columns} onEditRow={onEditRow}></Table>
    }
    <Drawer anchor="right" open={showDetails} onClose={toggleDrawer}>
      <FileDetailsDrawer rowID={rowID} setShowDetails={setShowDetails}/>
    </Drawer>
  </Box>
);
}

export default AdminTool;
