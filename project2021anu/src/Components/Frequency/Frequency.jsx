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
import ListItemText from '@material-ui/core/ListItemText';
// import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';

const CustomSwitch = withStyles({
  switchBase: {
    color: '#CAD6BB',
    '&$checked': {
      color: '#618535',
    },
    '&$checked + $track': {
      backgroundColor: '#618535',
    },
  },
  checked: {},
  track: {},
})(Switch);

const GreenCheckbox = withStyles({
  root: {
    color: '#008392',
    '&$checked': {
      color: '#008392',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  optiondIV: {
    display: 'flex',
    borderBottom: '1px solid #D1D5D9',
    alignItems: 'center'
  },
  multiOptions: {
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    zIndex: 999,
    position: 'absolute',
    width: '258px',
    top: '41px',
    border: '1px solid #D1D5D9',
    height: '110px',
    overflowY: 'auto'
  },
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

  const {id, startTime, startTimeWarning, startTimeTextWarning, sla, slaWarning, endTime, endTimeWarning, days, daysWarning, emailIndicator, emailRecipientsWarning} = props.data
  const weekdays = [ 'S','M', 'T', 'W', 'T', 'F','S'];
  console.log(days)
  const classes = useStyles();
  // MOCK emailRecipientsOptions 
  // const emailRecipientsOptions = [{value: "email1", label: 'email1'}, {value: "email2", label: 'email2'}]
  // const emailRecipientsOptions = ["email1", "email2", "email3", "email4", "email5", "email6"]
  const eRecipients = props.data.emailRecipients ? props.data.emailRecipients : []
  const [emailRecipients, setEmailRecipients] = React.useState([...eRecipients]);
  const [showERSuggestions, setShowERSuggestions] = React.useState(false);

  const handleChange = (value, label, id) => {
    let temp = [...emailRecipients]
    if(temp.find(r=> r.recipient_Id === value)){
      temp = temp.map(t=>{
        if(t.recipient_Id === value){
          t.action = "delete"
        }
        return t
      })
      // temp = temp.filter(t=> t.recipient_Id!==value)
    }else {
      temp.push({ recipient_Id: value ,recipient_Name: label, action: 'add'})
    }
    setEmailRecipients([...temp]);
     props.updateFrqStartTime("emailRecipients", [...temp] , id)
  };
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
                    value={emailIndicator ? "Yes" : "No"}
                    control={
                        <CustomSwitch
                        checked={emailIndicator}
                        onChange={event => props.updateFrqStartTime("emailIndicator", event.target.checked, id)}
                        name="checkedB"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />}
                    label={emailIndicator ? "Yes" : "No"}
                    labelPlacement="start"
                  /> 
              </div>
        </Grid>
            {emailIndicator && <Grid container>
              <div className={classes.flex}>
                <span className={classes.label}>Email Recipient</span>
                <FormControl variant="outlined"  error={emailRecipientsWarning}>
                <TextField className={classes.root} value={emailRecipients.map(er=> (er.action === null || er.action === "add" ) ? er.recipient_Name : '').toString().replace(",", "")} label="" variant="outlined"
                  // onBlur={(event)=>handleTimerValidation("endTime", event.target.value, id)}
                  // onChange={(event)=>updateTimeInMinutes("endTime", event.target.value, id)}
                  // error={endTimeWarning}
                  // helperText={endTimeWarning && "End time >= SLA"}
                  disable={true}
                  onClick={()=>setShowERSuggestions(!showERSuggestions)}
                  />  
                  {showERSuggestions && 
                  <div className={classes.multiOptions}>
                    {props.emailRecipientsOptions.map((opt) => (
                      <div onClick={()=>handleChange(opt.recipient_Id, opt.recipient_Name, id)} className={classes.optiondIV} key={opt}>
                        <GreenCheckbox color="primary"
                        checked = {emailRecipients && emailRecipients.find(ero => ((ero.recipient_Id === opt.recipient_Id) && (ero.action === null || ero.action === "add" )))}
                        // checked={emailRecipients.indexOf(opt) > -1} 
                        />
                        <ListItemText primary={opt.recipient_Name} />
                      </div>
                    ))}
                  </div>}
                  {/* <Select
                   isMulti= "true"
                   name="emailRecipients"
                  //  value={emailRecipientsOptions.filter(r=> r.value === emailRecipients)}
                  value={emailRecipients.toString()}
                   options={emailRecipientsOptions}
                  //  onChange={event => props.updateFrqStartTime("emailRecipients", event.target.checked, id)}
                    onChange={handleChange}
                   isLoading={!(emailRecipientsOptions && emailRecipientsOptions.length)}
                   placeholder="Email Recipient"
                  /> */}
                  {emailRecipientsWarning && <FormHelperText>its a required Field</FormHelperText>}
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
