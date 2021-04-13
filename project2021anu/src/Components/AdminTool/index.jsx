import React, { useState, useEffect, useRef } from "react";
import Container from "@material-ui/core/Container";
import { useSelector, useDispatch } from "react-redux";
import { selectAdminFileData } from "../../reducers/adminFileData";
import { selectAddFile } from "../../reducers/addFile";
import { LinkContainer, Box, Button, ButtonContainer } from "./styles";
import Table from "../../Components/Table";
import fileAPIs from "../../apis/AdminTools";
import { updateAdminFileData, updateFileData, submitFile } from "../../actions";
import AddFile from "../AddFile/AddFile";
import EditFile from "../EditFile/EditFile";
import CustomErrorDialog from '../CustomErrorDialog/index'

const ViewDetailsLink = <LinkContainer href="#">View Details</LinkContainer>;

const placeHolderData = [
  [
    "NASCO",
    "File1",
    "NEB",
    "12/22/2020 00:45:11",
    "Active",
    ViewDetailsLink,
  ],
  [
    "Edifecs",
    "File2",
    "NEB",
    "12/22/2020 01:45:31",
    "Active",
    ViewDetailsLink,
  ],
  ["PSP", "File3", "NEB", "12/21/2020 01:45:31", "Inactive", ViewDetailsLink],
  [
    "Producer1",
    "File4",
    "NEB",
    "12/22/2020 10:45:10",
    "Inactive",
    ViewDetailsLink,
  ],
  [
    "Producer2",
    "File5",
    "NEB",
    "12/21/2020 00:45:50",
    "Active",
    ViewDetailsLink,
  ],
  [
    "Producer3",
    "File6",
    "NEB",
    "12/18/2020 01:45:00",
    "Inactive",
    ViewDetailsLink,
  ],
  [
    "Producer4",
    "File7",
    "NEB",
    "12/22/2020 00:45:11",
    "Inactive",
    ViewDetailsLink,
  ],
  [
    "Producer5",
    "File8",
    "NEB",
    "12/21/2020 08:45:11",
    "Active",
    ViewDetailsLink,
  ],
  [
    "Producer6",
    "File9",
    "NEB",
    "12/21/2020 01:45:01",
    "Active",
    ViewDetailsLink,
  ],
  [
    "Producer6",
    "File9",
    "NEB",
    "12/21/2020 01:45:01",
    "Active",
    ViewDetailsLink,
  ],
  [
    "Producer6",
    "File9",
    "NEB",
    "12/21/2020 01:45:01",
    "Active",
    ViewDetailsLink,
  ],
  [
    "Producer6",
    "File9",
    "NEB",
    "12/21/2020 01:45:01",
    "Active",
    ViewDetailsLink,
  ],
];

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
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isAddFile, setIsAddFile] = useState(false);
  // const [validatationObj, setValidationObj] = useState({
  //   severity: null,
  //   validationFlag: false,
  //   validationMessage: ""
  // })

  const dispatch = useDispatch();
  const data = useSelector(selectAdminFileData);

  const onEditRow = (rowIndex) => {
    dispatch(updateFileData(rowIndex));
    props.history.push('/editfile')
    console.log(rowIndex)
  }

  const handleAddFile = () => {
    // dispatch(updateFileData());
    props.history.push('/addfile')
    // console.log(rowIndex)
  }

  const processAdminData = (data) => {
    if (!data || !Array.isArray(data)) return;
    return data.map((d) => {
      const temp = [];
      columns.forEach((c) => {
        if (c.id) {
          temp.push(d[c.id]);
        }
      });
      temp.push(ViewDetailsLink);
      return temp;
    });
  };

  const fetchAdminDataFromServer = async () => {
    setIsDataLoading(true);
    const data = await fileAPIs.fetchData();
    // console.log(processAdminData(data.fileconfigurations));
    dispatch(updateAdminFileData(processAdminData(data.fileconfigurations)));
    setTimeout(() => {
      setIsDataLoading(false);
    }, 600);
  };

  useEffect(() => {
    fetchAdminDataFromServer();
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
  </Box>
);
}

export default AdminTool;
