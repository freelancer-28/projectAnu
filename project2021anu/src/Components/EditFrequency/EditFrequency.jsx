import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import TextField from '../TextField';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import { faFileExport } from "fa5-pro-light";
import Select from '../Select'

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
  },
  edit_fre_days_first: {
    display: 'flex',
    background: '#F4F5F6',
    padding: '20px',
    borderLeft: '1px solid black'
  },
  edit_fre_days_second: {
    display: 'flex',
    background: '#F4F5F6',
    padding: '20px',
    paddingLeft: "40px",
    marginLeft: '30px',
    borderLeft: '1px solid black'
  },
  edit_fre_days_secondtxt: {
    marginBottom: '10px',
    paddingTop: '10px',
    borderLeft: '1px solid black'
  },
  edit_fre_days_third: {
    display: 'flex',
    background: '#F4F5F6',
    padding: '20px',
    paddingLeft: "100px",
    marginLeft: '70px'
  },
  edit_fre_days_thirdtxt: {
    marginLeft: '30px',
    marginBottom: '10px',
    paddingTop: '10px',
    borderLeft: '1px solid black'
  },
  paddingLeft50px: {
    paddingLeft: "50px"
  },
  lineStyleing: {
    borderTop: "1px solid",
    height: '1px',
    width: '100%',
    marginTop: '11px',
    marginLeft: '11px'
  },
  width100: {
    width: '100%'
  }
}));

const editDysFrequency= [
  {
    "value": "3",
    "label": "3"
  },
  {
    "value": "2",
    "label": "2"
  }
]

function Frequency(props) {

  const {id, startTime, sla, endTime, days, mdays} = props.data
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
          {/* <div className={classes.frequency_header1}>Day(s)</div> */}
          {/* <div>
            {[0,1,2,3,4,5,6].map((day, i) =>
              <Button className={days.includes(day) ? classes.weekdays_btn : classes.weekdays_unselected_btn} variant="contained" color="primary"
              onClick={()=>props.updateFrequencyDay(id, day)}>
              {weekdays[i]}
            </Button>
            )}
          </div> */}
          <div className={classes.width100}>
            <div className={classes.flexrow}>
              <div>On</div>
              <div className={classes.lineStyleing}></div>
            </div>
            <div className={classes.edit_fre_days_first}>
                    <Select
                    value={{ value: 3, label: 3 }}
                    options={editDysFrequency}
                    //  onChange={handleDirectionChange}
                    isLoading={!(editDysFrequency && editDysFrequency.length)}
                    placeholder=""
                    />
                  <div className={classes.paddingLeft50px}>
                    <RadioGroup row aria-label="position" name="position" defaultValue="top">
                      <FormControlLabel classes={{ root: classes.label }} value="start" control={<Radio color="primary" />} label="Beginning of the month" />
                      <FormControlLabel classes={{ root: classes.label }} value="end" control={<Radio color="primary" />} label="End of month" />
                    </RadioGroup>
                  </div>
            </div>
            <div className={classes.edit_fre_days_secondtxt}><span>____</span><span>and its in selected day(s):</span></div>
            <div className={classes.edit_fre_days_second}>
              {[0,1,2,3,4,5,6].map((day, i) =>
                <Button className={days.includes(day) ? classes.weekdays_btn : classes.weekdays_unselected_btn} variant="contained" color="primary"
                onClick={()=>props.updateFrequencyDay(id, day)}>
                {weekdays[i]}
              </Button>
              )}
            </div>
            <div className={classes.edit_fre_days_thirdtxt}><span>__________</span><span>When the 3rd day of the month falls on Saturday or Sunday. Choose the day of the week for the system to monitor below:</span></div>
            <div className={classes.edit_fre_days_third}>
              {[0,1,2,3,4,5,6].map((day, i) =>
                <Button className={mdays.includes(day) ? classes.weekdays_btn : classes.weekdays_unselected_btn} variant="contained" color="primary"
                onClick={()=>props.updateFrequencyMDay(id, day)}>
                {weekdays[i]}
              </Button>
              )}
                  <div className={classes.paddingLeft50px}>
                    <RadioGroup row aria-label="position" name="position" defaultValue="top">
                      <FormControlLabel classes={{ root: classes.label }} value="start" control={<Radio color="primary" />} label="previous" />
                      <FormControlLabel classes={{ root: classes.label }} value="end" control={<Radio color="primary" />} label="next" />
                    </RadioGroup>
                  </div>
            </div>
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