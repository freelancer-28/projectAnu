import { makeStyles } from '@material-ui/core/styles';
import AddFile from './AddFile/AddFile.jsx'
import EditFile from './EditFile/EditFile.jsx'
import Button from '@material-ui/core/Button';
import FileDetails from './FileDetails/FileDetails';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  container : {
    padding: '40px 16px',
    background: '#F4F5F6'
  },
  formaddfile: {
    background: '#FFFFFF',
    display: 'flex',
    padding: '10px 20px',
    justifyContent: 'flex-end'
  },
  form_btn_space : {
    marginRight: '20px'
  }
}));

function DashBoard() {
  const classes = useStyles();

  const [addFileFlag, setAddFileFlag] = useState(false)
  const [editFileFlag, setEditFileFlag] = useState(false)

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

  return (
    <div className="App">
      DashBoard
      <div className="App">
      <Button onClick={()=>setAddFileFlag(!addFileFlag)} variant="outlined" color="primary">
          Add File
      </Button>
      <table lassName="App">
        <tr>
          <td>view1</td>
        </tr>
        <tr>
          <td>view2</td>
        </tr>
        <tr>
          <td>view3</td>
        </tr>
      </table>
      </div>
        {addFileFlag ? <AddFile/> : <EditFile data={editData}/>}
        {/* {editFileFlag && <AddFile edit={true} tittle={"Edit File"}/>} */}
       {/* <FileDetails/> */}
    </div>
  );
}

export default DashBoard;
