import { makeStyles } from '@material-ui/core/styles';
import AddFile from './AddFile'
import EditFile from './EditFile'
import Button from '@material-ui/core/Button';
import FileDetails from './FileDetails/FileDetails';
import AdminTool from '../Components/AdminTool'
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Route from '../../src/Route'

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

  // const [addFileFlag, setAddFileFlag] = useState(false)
  // const [editFileFlag, setEditFileFlag] = useState(false)

  

  return (
    <div className="App">
      DashBoard
      <BrowserRouter>
        <Route/>
      </BrowserRouter>
      {/* <AdminTool/> */}
      {/* <div className="App">
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
        {addFileFlag ? <AddFile/> : <EditFile data={editData}/>} */}
        {/* {editFileFlag && <AddFile edit={true} tittle={"Edit File"}/>} */}
       {/* <FileDetails/> */}
    </div>
  );
}

export default DashBoard;
