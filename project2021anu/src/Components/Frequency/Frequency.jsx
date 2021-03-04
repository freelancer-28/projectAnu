import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import TextField from '../TextField';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
// import { faFileExport } from "fa5-pro-light";

const useStyles = makeStyles((theme) => ({
  divider_alt: {
    margin: '10px 0px',
    borderBottomStyle: 'dashed',
    borderBottomWidth: '2px',
    borderBottomColor: 'lightgray'
  },
  container: {
    padding: '40px 16px',
    background: '#F4F5F6'
  },
  frequency_box : {
    background: '#F4F5F6',
    // width: '95%',
    // height: '200px',
    border: '1px solid lightgray',    
    marginBottom: '16px'
  },
  label: {
    textAlign: 'left',
    font: 'normal normal normal 14px/17px Arial !important',
    letterSpacing: '0px',
    color: '#3E474D',
    opacity: 1,
    paddingBottom: '8.5px'
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 16px 16px 0px'
  },
  flexrow: {
    display: 'flex',
    flexDirection: 'row',
    padding: '16px 16px 16px 0px'
  },
  divider: {
    borderTop: '1px solid lightgray'
  },
  frequency_subbox: {
    background: '#FFFFFF',
    padding: '16px',
  },
  frequency_header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px',
    textAlign: 'left',
    font: 'normal normal bold 16px/25px Arial',
    letterSpacing: '0px',
    color: '#3E474D',
    opacity: 1
  },
  root: {
    '& .MuiOutlinedInput-root': {
      // margin: theme.spacing(1),
      width: '262px',
      height: '36px'
    }
  },
  frequency_header1: {
    marginRight: '20px'
  },
  weekdays_btn: {
    marginRight: '4px',
    height: '36px',
    width: '36px',
    background: '#008392'
  },
  weekdays_unselected_btn: {
    marginRight: '4px',
    height: '36px',
    width: '36px',
    background: '#ffffff',
    color: '#3E474D'
  }
}));

function Frequency(props) {

  const {id, startTime, sla, endTime, days} = props.data
  const weekdays = [ 'S', 'M', 'T', 'W', 'T', 'F', 'S'];
  console.log(days)
  const classes = useStyles();
  return (
    <div>
      <div className={classes.frequency_box}>
      <div className={classes.frequency_header}>
        <div>Frequency#{id}</div>
        <div onClick={()=>props.deleteFrequency(id)}>
        <FontAwesomeIcon icon={faTrashAlt} />
          {/* <FontAwesomeIcon icon="fa-trash-o" /> */}
          {/* <i class="fa fa-trash-o" aria-hidden="true"></i> */}
        </div>
      </div>
      <div className={classes.frequency_subbox}>
        <div className={classes.flexrow}>
          <div className={classes.frequency_header1}>Day(s)</div>
          <div>
            {[0,1,2,3,4,5,6].map((day, i) =>
              <Button className={days.includes(day) ? classes.weekdays_btn : classes.weekdays_unselected_btn} variant="contained" color="primary"
              onClick={()=>props.updateFrequencyDay(id, day)}>
              {weekdays[i]}
            </Button>
            )}
          </div>
        </div>
        <div className={classes.divider}></div>
        <div>
        <Grid container>
              <div className={classes.flex}>
                <span className={classes.label}>Start Time</span>
                <TextField className={classes.root} value={startTime} label="" variant="outlined" icon={faTrashAlt} onChange={(event)=>props.updateFrqStartTime("startTime", event.target.value, id)}/>
              </div>
              <div className={classes.flex}>
                <span className={classes.label}>SLA</span>
                <TextField className={classes.root} value={sla} label="" variant="outlined" onChange={(event)=>props.updateFrqStartTime("sla", event.target.value, id)}/>
              </div>
              <div className={classes.flex}>
                <span className={classes.label}>End Time</span>
                <TextField className={classes.root} value={endTime} label="" variant="outlined" icon={faTrashAlt} onChange={(event)=>props.updateFrqStartTime("endTime", event.target.value, id)}/>
              </div>
            </Grid>
        </div>
      </div>
    </div>
      <div className={classes.divider_alt}></div>
    </div>
  );
}

export default Frequency;
