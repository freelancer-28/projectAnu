import { makeStyles } from '@material-ui/core/styles';	
import React, {useEffect, useState} from 'react';	
import Button from '@material-ui/core/Button';	
import { useRouteMatch }from "react-router-dom";
// import TextField from '@material-ui/core/TextField';	
import Grid from '@material-ui/core/Grid';	
import TextField from '../../Components/TextField';	
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";	
import { faClock, faTrashAlt } from '@fortawesome/free-solid-svg-icons'	
import Radio from '@material-ui/core/Radio';	
import RadioGroup from '@material-ui/core/RadioGroup';	
import FormControlLabel from '@material-ui/core/FormControlLabel';	
// import { faFileExport } from "fa5-pro-light";	
import Select from '../../Components/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
// let diff = require('object-diff');

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
    // console.log(`days => ${days}`)
    // console.log(i)
    // console.log(days.includes(i))
    if(days.includes(i)){
      props.setWarning(false)
      props.updateFrqStartTime("exceptionDay", i, id)
    } else {
      props.setWarning(true)
    }
    // ()=>props.updateFrqStartTime("exceptionDay", i, id)
  }

  const handleMonthlyOn = (data) => {
    // console.log(data)
    props.updateFrqStartTime("monthlyOn", data.value, id)
  }

  const handleFrequencyId = (event) => {
    props.updateFrqStartTime("sfrequencyId", event.target.value, id)
  }
  
  const {id, startTime, startTimeWarning, startTimeTextWarning, sla, slaWarning,  endTime, endTimeWarning, 
    days, daysWarning, mdays, monthlyOn, monthlyOnWarning, sfrequencyId, sfrequencyIdWarning, 
    exceptionDay, exceptionDayWarning, thirdrow, emailRecipientWarning, frequencyWarning, emailIndicator, emailRecipients } = props.data
  //const weekdays = [ 'S','M', 'T', 'W', 'T', 'F', 'S'];
  const weekdays = { 1 : 'S', 2 : 'M', 3 : 'T', 4 : 'W', 5 : 'T', 6 : 'F', 7 : 'S' }
  //// console.log(days)
  const classes = useStyles();
  const editDysFrequency =  getDaysInMonth()
  const exceptionDayRadio = sfrequencyId == props.frequencyOptions.begin_frequencySpecifier ? "next" : (sfrequencyId == props.frequencyOptions.end_frequencySpecifier ? "previous" : null)
  // const emailRecipientOptions = ["email1", "email2", "email3", "email4", "email5", "email6"]
  const [emailRecipient, setEmailRecipient] = React.useState([]);
  const [editPageER, setEditPageER] = React.useState([]);
  const [editEmailAlert, setEditEmailAlert] = useState(emailIndicator);
  const [showERSuggestions, setShowERSuggestions] = React.useState(false);
  const addPage = useRouteMatch("/addfile")?.path === "/addfile"; //check editpage or addpage

  useEffect(()=>{
    if(emailRecipients && emailRecipients.length){
      setEditPageER([...emailRecipients])
    }
  }, [emailRecipients])

  const handleChange = (value, label, id) => {
    let temp = [...emailRecipient]
    if(temp.find(r=> r.recipient_Id === value)){
      temp = temp.filter(t=> t.recipient_Id!==value)
    }else {
      temp.push({ action: "ADD", recipient_Id: value ,recipient_Name: label})
    }
    setEmailRecipient([...temp]);
     props.updateFrqStartTime("emailRecipient", [...temp] , id)
  };

// handleEditPageChange of email checkbox 
const handleEPChange = (event, value, label, id) => {
  // here (e,v,l,i) = (checked?, person_Id, name, fid) values from names call
  // console.log("add file emails", editPageER)
  // let temp = [...editPageER]
  if(event.target.checked){   //checked means to add
    if(editPageER.find(r=> r.recipient_Id === value)){ 
      setEditPageER((prev) => [...(prev.filter((el) => el.recipient_Id !== value)), {action: "NO_UPDATE", recipient_Id: value ,recipient_Name: label}]);  
    } else{
      setEditPageER((prev) => [...prev, {action: "ADD", recipient_Id: value ,recipient_Name: label}]);
    }
  } else {          //unchecked
    setEditPageER((prev) => [...(prev.filter((el) => el.recipient_Id !== value)), {action: "DELETE", recipient_Id: value ,recipient_Name: label}]);  
  }
} 
useEffect(() => {
  // // console.log(editPageER)
  // // console.log( compareObj(emailRecipients, editPageER))
  props.updateFrqStartTime("emailRecipient", [...editPageER] , id)
}, [editPageER])

// const compareObj = (a,b) =>{
//   // console.log("diff",diff(a,b))
// }
  
  return (
    <div>
      <div className={classes.frequency_box}>
        <div className={classes.frequency_header}>
          <div>Frequency#{props.index+1}</div>
          {/* checks if locattion is /addfile */}
          {/* and checks if the producer file has one frequncy set */}
          {addPage ? <div onClick={()=>props.deleteFrequency(id)}>
                     <FontAwesomeIcon icon={faTrashAlt} />
                     </div> : (props.frequncyArray.filter(f => f.action !== "DELETE").length !== 1) 
                      ? <div onClick={()=>props.deleteFrequency(id)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                        </div> 
                      : <></>}
        </div>
        <div className={classes.frequency_subbox}>
          <div className={classes.flexrow}>
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
                {startTimeTextWarning && <FormHelperText>Overlap with previous frequency</FormHelperText>}
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
                  {[1,2,3,4,5,6,7].map((day, i) =>
                    <Button className={days.includes(day) 
                      ? classes.weekdays_btn 
                      : classes.weekdays_unselected_btn} variant="contained" color="primary"
                    onClick={()=>props.updateFrequencyDay(id, day)}>
                      {/* shouldnt it be updateFrequencyMDay */}
                    {weekdays[day]}
                  </Button>
                  )}
                </div>
                {daysWarning && <div className={classes.marginWarningLeft}><FormHelperText>Min one day has to be selected. Max seven days</FormHelperText></div>}
              </FormControl>
              { (thirdrow === undefined || thirdrow === true) &&
              <>
                <div className={classes.edit_fre_days_thirdtxt}><span>__________</span><span> If {monthlyOn} day of the month does not fall on the above selected days.</span></div>
                  <div className={classes.edit_fre_days_third}>
                    {[1,2,3,4,5,6,7].map((day, i) =>
                      <Button className={[exceptionDay].includes(day) 
                        ? classes.weekdays_btn 
                        : classes.weekdays_unselected_btn} 
                        variant="contained" 
                        color="primary" 
                        onClick={()=>handleExceptionDaySelection(day, id)}>
                        {weekdays[day]}
                    </Button>
                    )}
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
            {addPage  && <FormControlLabel
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
            />} 
            {!addPage  && <FormControlLabel
                value={editEmailAlert ? "Yes" : "No"}
                control={
                    <CustomSwitch
                    checked={editEmailAlert}
                    onChange={event => {
                      setEditEmailAlert(event.target.checked)
                      props.updateFrqStartTime("emailIndicator", event.target.checked, id)}}
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />}
                label={editEmailAlert ? "Yes" : "No"}
                labelPlacement="start"
            />} 
        </div>
      </Grid>
      {(addPage && emailIndicator) && 
      <Grid container>
        <div className={classes.flex}>
          <span className={classes.label}>Email Recipient</span>
            <FormControl variant="outlined" error={emailRecipientWarning}>
            <TextField className={classes.root} value={emailRecipient.map(er=>er.recipient_Name).toString()} label="" variant="outlined" disable={true}
            onClick={() => setShowERSuggestions(!showERSuggestions)}
            />
            {showERSuggestions &&
              <div className={classes.multiOptions}>
                {props.emailRecipientOptions.map((opt) => (
                <div onClick={()=>handleChange(opt.recipient_Id, opt.recipient_Name, id)} className={classes.optiondIV} key={opt}>
                  <GreenCheckbox color="primary" checked = {emailRecipient && emailRecipient.find(ero => ero.recipient_Id === opt.recipient_Id)}
                  // checked={emailRecipient.indexOf(opt) > -1} 
                  />
                  <ListItemText primary={opt.recipient_Name} />
                </div>
                ))}
              </div>}
              {emailRecipientWarning && <FormHelperText>its a required Field</FormHelperText>}
            </FormControl>
        </div>
      </Grid>}
      {(!addPage && editEmailAlert) &&
          <Grid container >
            <div className={classes.flex}>
              <span className={classes.label}>Email Recipient</span>
                <FormControl variant="outlined"  error={emailRecipientWarning}>
                  <TextField 
                    className={classes.root} 
                    value={editPageER.filter((el) => el.action!=='DELETE').map(er=> er.recipient_Name)} 
                    label="" variant="outlined"
                    disable={true}
                    onClick={()=>setShowERSuggestions(!showERSuggestions)}
                  />  
                  {showERSuggestions && 
                    <div className={classes.multiOptions}>
                    {props.emailRecipientOptions.map((opt, index) => (
                      <div className={classes.optiondIV} key={opt}>
                      {/* {// console.log(index, editPageER)}
                      {// console.log((editPageER.findIndex((el) => el.recipient_Id === opt.recipient_Id)))} */}
                        <Checkbox color="primary" 
                          checked = {editPageER &&
                            editPageER[(editPageER.findIndex((el) => el.recipient_Id === opt.recipient_Id))] && 
                            editPageER[(editPageER.findIndex((el) => el.recipient_Id === opt.recipient_Id))].action && 
                            editPageER[(editPageER.findIndex((el) => el.recipient_Id === opt.recipient_Id))].action !== 'DELETE' }
                          onChange={(event)=>handleEPChange(event, opt.recipient_Id, opt.recipient_Name, id)}
                          />
                            <ListItemText primary={opt.recipient_Name} />
                      </div>
                      ))}
                    </div>
                  }
                  {emailRecipientWarning && <FormHelperText>its a required Field</FormHelperText>}
                </FormControl>
                </div>
          </Grid>}
      </div>
    </div>
    <div className={classes.divider_alt}></div>
  </div>
  );
}

export default Frequency;