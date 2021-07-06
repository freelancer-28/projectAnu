import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import TextField from '../TextField';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
// import { faFileExport } from "fa5-pro-light";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Select from '../Select'

const useStyles = makeStyles((theme) => ({
  warningclass: {
    color: 'red',
    marginLeft: '410px'
  },
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

  const updateTimeInMinutes = (type, val, id) => {
    let nonNegative = val >= 0 || val === ''
    let value = Number(val)
    if(nonNegative && !Number.isNaN(value)){
      // if(type === "sla") {
      //   if(value > endTime){
      //     props.setTimeWarning(true)
      //   } else {
      //     props.setTimeWarning(false)
      //   }
      // } else if(type === "endTime"){
      //   if(value < sla){
      //     props.setTimeWarning(true)
      //   } else {
      //     props.setTimeWarning(false)
      //   }
      // }
      props.updateFrqStartTime(type, value, id)
    } else {
      props.updateFrqStartTime(type, "", id)      
    }
    
  }

  const {id, startTime, startTimeWarning, startTimeTextWarning, sla, slaWarning, endTime, endTimeWarning, days, daysWarning, addEmailAlert, emailRecipient, emailRecipientWarning} = props.data
  const weekdays = [ 'S','M', 'T', 'W', 'T', 'F','S'];
  console.log(days)
  const classes = useStyles();
  // MOCK emailRecipientOptions 
  const emailRecipientOptions = [{value: "email1", label: 'email1'}, {value: "email2", label: 'email2'}]

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
          <FormControl variant="outlined"  error={daysWarning}>
          <div className={classes.frequency_header1}>Day(s)</div>
          <div>
            {/* <Button className={classes.weekdays_unselected_btn} variant="contained" color="primary">
                S
            </Button> */}
            {[0,1,2,3,4,5,6].map((day, i) =>
              <Button className={days.includes(day) ? classes.weekdays_btn : classes.weekdays_unselected_btn} variant="contained" color="primary"
              onClick={()=>props.updateFrequencyDay(id, day, 'weekly')}>
              {weekdays[i]}
            </Button>
            )}
            {/* <Button className={classes.weekdays_unselected_btn} variant="contained" color="primary">
              S
          </Button> */}
          </div>
          {daysWarning && <FormHelperText>Min one day has to be selected. Max seven days</FormHelperText>}
          </FormControl>
        </div>
        <div className={classes.divider}></div>
        <div>
        <Grid container>
              <div className={classes.flex}>
                <span className={classes.label}>Start Time</span>
                <FormControl variant="outlined"  error={startTimeTextWarning}>
                  <TextField type="time" className={classes.root} value={startTime} label="" variant="outlined" // icon={faTrashAlt} 
                  error={startTimeWarning  || startTimeTextWarning}
                  helperText={startTimeWarning && "its a required Field"}
                  onChange={(event)=>props.updateFrqStartTime("startTime", event.target.value, id)}/>
                  {startTimeTextWarning && <FormHelperText>Start Time should not overlap with previous frequency</FormHelperText>}
                </FormControl>
              </div>
              <div className={classes.flex}>
                <span className={classes.label}>SLA</span>
                <TextField className={classes.root} value={sla} label="" variant="outlined"
                // onBlur={(event)=>handleTimerValidation("sla", event.target.value, id)}
                onChange={(event)=>updateTimeInMinutes("sla", event.target.value, id)}
                error={slaWarning}
                helperText={slaWarning && "SLA <= End time"}
                />
              </div>
              <div className={classes.flex}>
                <span className={classes.label}>End Time</span>
                <TextField className={classes.root} value={endTime} label="" variant="outlined"
                  // onBlur={(event)=>handleTimerValidation("endTime", event.target.value, id)}
                  onChange={(event)=>updateTimeInMinutes("endTime", event.target.value, id)}
                  error={endTimeWarning}
                  helperText={endTimeWarning && "End time >= SLA"}
                  />  
              </div>
              <div className={classes.flex}>
                <span className={classes.label}>Add Email Alert?</span>
                <FormControlLabel
                    value={addEmailAlert ? "Yes" : "no"}
                    control={
                        <Switch
                        checked={addEmailAlert}
                        // style={{color: 'green'}}
                        onChange={event => props.updateFrqStartTime("addEmailAlert", event.target.checked, id)}
                        color="primary"
                        name="checkedB"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />}
                    label={addEmailAlert ? "Yes" : "No"}
                    labelPlacement="start"
                  /> 
              </div>
        </Grid>
            {addEmailAlert && <Grid container>
              <div className={classes.flex}>
                <span className={classes.label}>Email Recipient</span>
                <FormControl variant="outlined"  error={emailRecipientWarning}>
                  <Select
                   multiple
                   name="emailRecipient"
                   value={emailRecipientOptions.filter(r=> r.value === emailRecipient)}
                   options={emailRecipientOptions}
                  //  onChange={handleASOChange}
                   isLoading={!(emailRecipientOptions && emailRecipientOptions.length)}
                   placeholder="Email Recipient"
                  />
                  {emailRecipientWarning && <FormHelperText>its a required Field</FormHelperText>}
                  </FormControl>
              </div>
            </Grid>}
            {/* {props.timeWarning && <span className={classes.warningclass}>END TIME GREATER THEN SLA TIME</span>} */}
        </div>
      </div>
    </div>
      <div className={classes.divider_alt}></div>
    </div>
  );
}

export default Frequency;
