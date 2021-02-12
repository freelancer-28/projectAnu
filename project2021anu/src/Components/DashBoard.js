import { makeStyles } from '@material-ui/core/styles';
import AddFile from './AddFile/AddFile.jsx'
import Button from '@material-ui/core/Button';

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

  return (
    <div className="App">
      DashBoard
      {/* <div className={classes.container}> */}
        <AddFile/>
        {/* <div className={classes.formaddfile}>
          <Button className={classes.form_btn_space} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button variant="contained">Submit</Button>
        </div> */}
      {/* </div> */}
    </div>
  );
}

export default DashBoard;
