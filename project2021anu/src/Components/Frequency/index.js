import { makeStyles } from '@material-ui/core/styles';	
import Button from '@material-ui/core/Button';	
import React, {useEffect, useState} from 'react';	
import { useRouteMatch }from "react-router-dom";
// import TextField from '@material-ui/core/TextField';	
import Grid from '@material-ui/core/Grid';	
import TextField from '../../Components/TextField';	
// import { faClock, faTrashAlt } from "fa5-pro-light";		
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

// let diff = require('object-diff');

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
  // console.log('in child', props.data)
  const updateTimeInMinutes = (type, val, id) => {
    let nonNegative = val > 0 || val === ''
    let value = val === "" ? "" : Number(val)
    if(nonNegative && !Number.isNaN(value)){
      props.updateFrqStartTime(type, value, id)
    } else {
      props.updateFrqStartTime(type, "", id)      
    }
  }

  const {id, startTime, startTimeWarning, startTimeTextWarning, sla, slaWarning, 
    endTime, endTimeWarning, days, daysWarning, addEmailAlert, emailRecipientWarning, frequencyWarning, frequencySpecifierIds, emailIndicator, emailRecipients } = props.data

  const [tempFrequencySpecifierIds, setTempFrequencySpecifierIds] = useState([]);
  const weekdays = [ 'S', 'M', 'T', 'W', 'T', 'F','S'];
  const [editEmailAlert, setEditEmailAlert] = useState(emailIndicator)
  const classes = useStyles();
  const [emailRecipient, setEmailRecipient] = React.useState([]);
  const [editPageER, setEditPageER] = React.useState([]);
  const [showERSuggestions, setShowERSuggestions] = React.useState(false);
  const addPage = useRouteMatch("/addfile")?.path === "/addfile"; //check editpage or addpage
  
  useEffect(() => {
   if(frequencySpecifierIds && frequencySpecifierIds.length){
    const tempArr = frequencySpecifierIds.map((element) => {
      return (
        {
          id: element.id,
          isDeleted: element.isDeleted,
          isSelected: element.isDeleted === 'N' ? true : false,
          frequencySpecifierId: element.frequencySpecifierId,
        }
      );
    })
    setTempFrequencySpecifierIds(tempArr)
   }
  }, [frequencySpecifierIds])

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
      temp.push({action: "ADD", recipient_Id: value ,recipient_Name: label})
    }
    setEmailRecipient([...temp]);
     props.updateFrqStartTime("emailRecipient", [...temp] , id)
  };

  // handleEditPageChange of email checkbox 
  const handleEPChange = (event, value, label, id) => {
    // here (e,v,l,i) = (checked?, person_Id, name, fid) values from names call
    // console.log("add file emails", editPageER)
    if(event.target.checked){   //checked
      if(emailRecipients.find(r=> r.recipient_Id === value)){ 
        setEditPageER((prev) => [...(prev.filter((el) => el.recipient_Id !== value)), {action: "NO_UPDATE", recipient_Id: value ,recipient_Name: label}]);  
      } else {
        setEditPageER((prev) => [...prev, {action: "ADD", recipient_Id: value ,recipient_Name: label}]);
      }
    } else {          //unchecked
      if(emailRecipients.find(r=> r.recipient_Id === value)){ 
        setEditPageER((prev) => [...(prev.filter((el) => el.recipient_Id !== value)), {action: "DELETE", recipient_Id: value ,recipient_Name: label}]);  
      } else {
        setEditPageER((prev) => [...(prev.filter((el) => el.recipient_Id !== value))]);
      }
    }
  } 

  useEffect(() => {
    // console.log("editPageER",editPageER)
    props.updateFrqStartTime("emailRecipient", [...editPageER], id)
  }, [editPageER])

  // const compareObj = (a,b) =>{
  //   b = b.filter((el) => el.action !== 'NO_UPDATE');
  //   return diff(a,b);
  // }
    
  return (
    <div>
      <div className={classes.frequency_box}>
      <div className={classes.frequency_header}>
        <div>Frequency#{id}</div>
        {/* checks if locattion is /addfile */}
        {/* and checks if the producer file has one frequncy set */}
        {addPage ?  <div onClick={()=>props.deleteFrequency(id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                    </div> : (props.frequncyArray.length !== 1) 
                    ? <div onClick={()=>props.deleteFrequency(id)}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                      </div> 
                    : <></>}
      </div>
      <div className={classes.frequency_subbox}>
        <div className={classes.flexrow}>
          {addPage &&
          <FormControl variant="outlined"  error={daysWarning}>
          <div className={classes.frequency_header1}>Day(s)</div>
          <div>
            {[0,1,2,3,4,5,6].map((day, i) =>
              <Button className={days.includes(day) ? classes.weekdays_btn : classes.weekdays_unselected_btn} variant="contained" color="primary"
              onClick={()=>props.updateFrequencyDay(id, day, 'weekly')}>
              {weekdays[i]}
            </Button>
            )}
          </div>
          {daysWarning && <FormHelperText>Min one day has to be selected. Max seven days</FormHelperText>}
          </FormControl>}
          {!addPage && 
          <FormControl variant="outlined"  error={daysWarning}>
          <div className={classes.frequency_header1}>Day(s)</div>
          <div>
            {tempFrequencySpecifierIds.map((day, i) =>
              <Button className={day.isSelected ? classes.weekdays_btn : classes.weekdays_unselected_btn} variant="contained" color="primary"
              onClick={()=>{
                setTempFrequencySpecifierIds((prev) => {
                  const index = (prev.findIndex((el) => el?.frequencySpecifierId === day.frequencySpecifierId))
                    prev[index] = {
                      id: day.id,
                      isSelected: day.isSelected ? !day.isSelected : true,
                      isDeleted: !day.isSelected ? 'N' : 'Y',
                      frequencySpecifierId: day.frequencySpecifierId
                    }
                  return [...prev]
                })
                props.updateFrequencyDay(id, tempFrequencySpecifierIds, 'weekly')
              }}>
              {weekdays[day.frequencySpecifierId]}
            </Button>
            )}
          </div>
          {daysWarning && <FormHelperText>Min one day has to be selected. Max seven days</FormHelperText>}
          </FormControl>}
        </div>
        <div className={classes.divider}></div>
        <div>
      <Grid container>
          <div className={classes.flex}>
                <span className={classes.label}>Start Time</span>
                <FormControl variant="outlined"  error={startTimeTextWarning}>
                <TextField type="time" className={classes.root} value={startTime} label="" variant="outlined" 
                error={startTimeWarning}
                helperText={startTimeWarning && "its a required Field"}
                onChange={(event)=>props.updateFrqStartTime("startTime", event.target.value, id)}/>
                {startTimeTextWarning && <FormHelperText>Start Time should not overlap with previous frequency</FormHelperText>}
                </FormControl>
              </div>
              <div className={classes.flex}>
                <span className={classes.label}>SLA</span>
                <TextField className={classes.root} value={sla} label="" variant="outlined"
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
                {addPage && <FormControlLabel
                  value={emailIndicator ? "Yes" : "No"}
                  control={
                    <Switch
                    checked={emailIndicator}
                    // style={{color: 'green'}}
                    onChange={event => props.updateFrqStartTime("emailIndicator", event.target.checked, id)}
                    color="primary"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />}
                  label={emailIndicator ? "Yes" : "No"}
                  labelPlacement="start"
                /> }
                {!addPage && <FormControlLabel
                  value={editEmailAlert ? "Yes" : "No"}
                  control={
                    <Switch
                    checked={editEmailAlert}
                    // style={{color: 'green'}}
                    onChange={event => {
                      setEditEmailAlert(event.target.checked)
                      props.updateFrqStartTime("emailIndicator", event.target.checked, id)}
                    }
                    color="primary"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />}
                  label={emailIndicator ? "Yes" : "No"}
                  labelPlacement="start"
                />}
              </div>
        </Grid>
        {(addPage && emailIndicator) && 
          <Grid container>
            <div className={classes.flex}>
              <span className={classes.label}>Email Recipient</span>
                <FormControl variant="outlined"  error={emailRecipientWarning}>
                <TextField className={classes.root} 
                value={emailRecipient.map(er=>er.recipient_Name).toString()} label="" variant="outlined"
                disable={true}
                onClick={()=>setShowERSuggestions(!showERSuggestions)}
                />  
                {showERSuggestions && 
                  <div className={classes.multiOptions}>
                  {props.emailRecipientOptions.map((opt) => (
                    <div onClick={()=>handleChange(opt.recipient_Id, opt.recipient_Name, id)} className={classes.optiondIV} key={opt}>
                      <Checkbox color="primary" 
                      checked = {emailRecipient && emailRecipient.find(ero => ero.recipient_Id === opt.recipient_Id)}
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
        {(!addPage && emailIndicator) &&
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
    </div>
      <div className={classes.divider_alt}></div>
    </div>
  );
}

export default Frequency;
