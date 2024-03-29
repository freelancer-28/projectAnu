import React, {useEffect, useState} from 'react';
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
import { red } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

const GreenCheckbox = withStyles({
  root: {
    color: '#008392',
    '&$checked': {
      color: '#008392',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

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

const useStyles = makeStyles((theme) => ({
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
  optiondIV: {
    display: 'flex',
    borderBottom: '1px solid #D1D5D9',
    alignItems: 'center'
  },
  marginWarningLeft: {
    marginLeft: '210px'
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

const getDaysInMonth = () => {
  let daysInMonthOptions = []
    for(let i=1; i< 29; i++){
      daysInMonthOptions.push({ value: i, label: i })
    }
    return daysInMonthOptions
}

function Frequency(props) {

  const updateTimeInMinutes = (type, val, id) => {
    let nonNegative = val > 0 || val === ''
    let value = val === "" ? "" : Number(val)
    if(nonNegative && !Number.isNaN(value)){
      props.updateFrqStartTime(type, value, id)
    } else {
      props.updateFrqStartTime(type, "", id)      
    }
    
  }

  const handleExceptionDaySelection = (i, id) => {
    console.log(`days => ${days}`)
    console.log(i)
    console.log(days.includes(i))
    if(days.includes(i)){
      props.setWarning(false)
      props.updateFrqStartTime("exceptionDay", i, id)
    } else {
      props.setWarning(true)
    }
    // ()=>props.updateFrqStartTime("exceptionDay", i, id)
  }

  const handleMonthlyOn = (data) => {
    console.log(data)
    props.updateFrqStartTime("monthlyOn", data.value, id)
  }
  const handleFrequencyId = (event) => {
    props.updateFrqStartTime("sfrequencyId", event.target.value, id)
  }
  const {id, startTime, startTimeWarning, startTimeTextWarning, sla, slaWarning,  endTime, endTimeWarning, days, daysWarning, mdays, monthlyOn, monthlyOnWarning, sfrequencyId, sfrequencyIdWarning, exceptionDay, exceptionDayWarning, thirdrow, emailIndicator, emailRecipientsWarning} = props.data
  // console.log("sfrequencyIdsfrequencyIdsfrequencyIdsfrequencyId", sfrequencyId)
  // const weekdays = [ 'S','M', 'T', 'W', 'T', 'F','S'];
  const weekdays = { 1 : 'S', 2 : 'M', 3 : 'T', 4 : 'W', 5 : 'T', 6 : 'F', 7 : 'S' }
  console.log(days)
  console.log("thirdrow====================",thirdrow)
  const classes = useStyles();
  const editDysFrequency =  getDaysInMonth()
  const exceptionDayRadio = sfrequencyId == props.frequencyOptions.begin_frequencySpecifier ? "next" : (sfrequencyId == props.frequencyOptions.end_frequencySpecifier ? "previous" : null)

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
                <FormControl variant="outlined"  error={monthlyOnWarning || startTimeTextWarning}>
                    <Select
                    value={{ value: monthlyOn, label: monthlyOn }}
                    options={editDysFrequency}
                     onChange={handleMonthlyOn}
                    isLoading={!(editDysFrequency && editDysFrequency.length)}
                    placeholder=""
                    />
                    {monthlyOnWarning && <FormHelperText>its a required Field</FormHelperText>}
                    {startTimeTextWarning && <FormHelperText>Start Time should not overlap with previous frequency</FormHelperText>}
                </FormControl>
                <FormControl variant="outlined"  error={sfrequencyIdWarning}>
                  <div className={classes.paddingLeft50px}>
                    <RadioGroup row aria-label="position" name="position" defaultValue="top" onChange={handleFrequencyId} value={sfrequencyId}>
                      <FormControlLabel classes={{ root: classes.label }} value={props.frequencyOptions.begin_frequencySpecifier.toString()} control={<Radio color="primary" />} label="Beginning of the month" />
                      <FormControlLabel classes={{ root: classes.label }} value={props.frequencyOptions.end_frequencySpecifier.toString()} control={<Radio color="primary" />} label="End of month" />
                    </RadioGroup>
                  </div>
                  {sfrequencyIdWarning && <FormHelperText>its a required Field</FormHelperText>}
                </FormControl>
            </div>
            <div className={classes.edit_fre_days_secondtxt}><span>____</span><span>and its in selected day(s):</span></div>
            <FormControl variant="outlined"  error={daysWarning}>
            <div className={classes.edit_fre_days_second}>
            {/* <Button className={classes.weekdays_unselected_btn} variant="contained" color="primary">
                S
            </Button> */}
              {[1,2,3,4,5,6,7].map((day, i) =>
                <Button className={days.includes(day) ? classes.weekdays_btn : classes.weekdays_unselected_btn} variant="contained" color="primary"
                onClick={()=>props.updateFrequencyDay(id, day)}>
                {weekdays[day]}
              </Button>
              )}
            {/* <Button className={classes.weekdays_unselected_btn} variant="contained" color="primary">
                S
            </Button> */}
            </div>
            {daysWarning && <div className={classes.marginWarningLeft}><FormHelperText>Min one day has to be selected. Max seven days</FormHelperText></div>}
            </FormControl>
            {(thirdrow === undefined || thirdrow === true) && 
            <>
            <div className={classes.edit_fre_days_thirdtxt}><span>__________</span><span>When the {monthlyOn} day of the month falls on Saturday or Sunday. Choose the day of the week for the system to monitor below:</span></div>
            <div className={classes.edit_fre_days_third}>
                  {/* <Button className={classes.weekdays_unselected_btn} variant="contained" color="primary">
                      S
                  </Button> */}
                    {[1,2,3,4,5,6,7].map((day, i) =>
                      <Button className={[exceptionDay].includes(day) ? classes.weekdays_btn : classes.weekdays_unselected_btn} variant="contained" color="primary"
                      onClick={()=>handleExceptionDaySelection(day, id)}>
                      {weekdays[day]}
                    </Button>
                    )}
                  {/* <Button className={classes.weekdays_unselected_btn} variant="contained" color="primary">
                    S
                  </Button> */}
                  <div className={classes.paddingLeft50px}>
                    <RadioGroup row aria-label="position" name="position" defaultValue="top" value={exceptionDayRadio}>
                      <FormControlLabel classes={{ root: classes.label }} value="previous" control={<Radio color="primary" />} label="previous" />
                      <FormControlLabel classes={{ root: classes.label }} value="next" control={<Radio color="primary" />} label="next" />
                    </RadioGroup>
                  </div>
            </div>
            {exceptionDayWarning && <span className={classes.warningclass}>Exception day need to be selected if all the days are not selected</span>}
                  {props.warning && <span className={classes.warningclass}>Exception day must be subset of selected days selecition</span>}
            </>}
          </div>
        </div>
        <div className={classes.divider}></div>
        <div>
        <Grid container>
              <div className={classes.flex}>
                <span className={classes.label}>Start Time</span>
                <FormControl variant="outlined"  error={startTimeTextWarning}>
                <TextField type="time" className={classes.root} value={startTime} label="" variant="outlined" // icon={faTrashAlt} 
                error={startTimeWarning}
                helperText={startTimeWarning && "its a required Field"}
                onChange={(event)=>props.updateFrqStartTime("startTime", event.target.value, id)}/>
                {/* {startTimeTextWarning && <FormHelperText>Start Time should not overlap with previous frequency</FormHelperText>} */}
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
                        // checked = {props.emailRecipientsOptions.find(ero => ero.recipient_Id === emailRecipients.recipient_Id)}
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
