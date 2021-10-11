import React, {useEffect, useState} from 'react';	
import { useSelector, useDispatch } from "react-redux";	
import { makeStyles } from '@material-ui/core/styles';	
import Button from '@material-ui/core/Button';	
// import TextField from '@material-ui/core/TextField';	
import Grid from '@material-ui/core/Grid';	
import Radio from '@material-ui/core/Radio';	
import RadioGroup from '@material-ui/core/RadioGroup';	
import FormControlLabel from '@material-ui/core/FormControlLabel';	
import FormControl from '@material-ui/core/FormControl';	
import FormLabel from '@material-ui/core/FormLabel';	
import Frequency from '../Frequency';	
import EditFrequency from '../EditFrequency';	
import Select from '../../Components/Select';   	
import TextField from '../../Components/TextField';	
import {	
  updateProducer,	
  updateProducerOptions,
  updateFrequencyIdsOptions,	
  updateFileMask,	
  submitFile,	
  updateRoute,	
  updateRouteOptions	
} from "../../actions";	
import filtersAPIs from "../../apis/FileObserver/filters";	
import addFileAPIs from "../../apis/AdminTool/addFile";	
import { selectProducer, selectProducerOptions, selectFrequencyIdsOptions } from "../../reducers/producer";	
import { selectRoute, selectRouteOptions } from '../../reducers/route';	
// import { faFileExport } from "fa5-pro-light"; 	
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import AlertDialog from "../AlertDialog/index"
//import Snackbar from '@material-ui/core/Snackbar';
//import MuiAlert from '@material-ui/lab/Alert';
import CustomErrorDialog from '../CustomErrorDialog';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const useStyles = makeStyles((theme) => ({
  displayBlock:{
    display: "block"
  },
  displayFlex: {
    display: "flex"
  },
  switch_style: {
    width: '262px',
    alignItems: 'start',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 16px 16px 0px',
    color: '#3E474D'
  },
  container: {
    padding: '40px 16px',
    background: '#F4F5F6'
  },
  allign: {
    textAlign: 'left',
    padding: '24px',
    background: '#FFFFFF'
  },
  header: {
    textAlign: 'left',
    font: 'normal normal bold 20px/25px Arial',
    letterSpacing: '0px',
    color: '#3E474D',
    opacity: 1,
    paddingBottom: '24px'
  },
  content: {
    padding: '24px 0px',
    borderTop: '2px solid lightgray',
    borderBottom: '2px solid lightgray'
  },
  subcontent: {
    padding: '24px 0px'
  },
  subheader: {
    textAlign: 'left',
    font: 'normal normal bold 18px/25px Arial',
    letterSpacing: '0px',
    color: '#3E474D',
    opacity: 1,
    paddingBottom: '24px'
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
  display: {
    display: 'flex',
    flexDirection: 'column'
  },
  padding: {
    padding: '16px 16px 16px 0px'
  },
  container: {
    padding: '16px 40px',
    background: '#F4F5F6'
  },
  formaddfile: {
    background: '#FFFFFF',
    display: 'flex',
    padding: '10px 20px',
    justifyContent: 'flex-end'
  },
  form_btn_space: {
    marginRight: '20px'
  },
  read_textFileds: {
      width: 'auto',
      minWidth: "262px",
    // border: '1px solid #D1D5D9',
    height: '36px',
    background: '#EFF0F1 0% 0% no-repeat padding-box',
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: '#687681'
  },
  readValue: {
    paddingLeft: '10px'
  }
}));

const directionOptions = [
  {
    "value": "InBound",
    "label": "InBound"
  },
  {
    "value": "OutBound",
    "label": "OutBound"
  }
]

const fqc = {
  id: 1,
  emailIndicator: false,
  emailRecipient: null,
  emailRecipientWarning: null,
  days: [1,2,3,4,5],
  mdays: [1,2,3,4,5],
  startTime: null,
  sla: null,
  endTime: null,
  hopId: null,
  hopName: null,
  fileCount: null,
  frequencyId: null,
  daysWarning: false,
  startTimeWarning: null,
  startTimeTextWarning: null,
  slaWarning: null,
  endTimeWarning: null,
  monthlyOnWarning: null,
  sfrequencyIdWarning: null,
  exceptionDayWarning: null
}

function AddFile(props) {
  const [ warning, setWarning ] = useState(false)
  const [ timeWarning, setTimeWarning ] = useState(false)
  const [ fileTicketOrgGroups, setFileTicketOrgGroups ] = useState([])
  const [ emailRecipientOptions, setEmailRecipientOptions ] = useState([])
  const [ validationWarnings, setValidationWarnings ] = useState([])
  const [addFileData, setAddFileData] = useState({
    addIncident: false,
    thirdrow: null,
    validationFlag: false,
    validationMessage: "",
    errorDialog: true,
    producerId: null,
    occurence: null,
    hopId: null,
    hopName: null,
    fileCount: null,
    fileMonitoring: false,
    ediRejectMonitoring: false,
    fileInfoWarning: {
      ackSuffixWarning: null,
      ackSlaTimeWarning: null,
      ackEndTimeWarning: null,
      asoWarning: null,
      agroupWarning: null,
      producerIdWarning: null, // select
      sftAccountNameWarning: null,
      // directionWarning: null, // select
      // fileMaskWarning: null, // read
      filePrefixWarning: null,
      //fileSuffixWarning: null,
      dateMaskWarning: null,
      dateTimeMaskWarning: null,
      routeIdWarning: null, // select
      occurenceWarning: null, // radio
      hopNameWarning: null, // select
      fileCountWarning: null,
    },
    fileInformation: {
      ackSuffix: null,
      ackSlaTime: null,
      ackEndTime: null,
      aso: null,
      agroup: null,
      dateMask: null,
      dateTimeMask: null,
      fileMask: null,
      filePrefix: null,
      fileSuffix: null,
      routeId: null,
      sftAccountName: null,
      direction: directionOptions[0]
    },
    frequency:[]
  })

  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    fetchProducerFiltersFromServer();
    return () => { console.log('useEffectProps', props) }
  }, []);

  const fetchProducerFiltersFromServer = async () => {
    dispatch(updateProducerOptions([]))
    dispatch(updateRouteOptions([]));
    const data = await filtersAPIs.fetchProducerOptions();
    ///////////////////////
    // collect frequency id
    let freqIds = {}
    data.frequencySpecifierNames.forEach(obj => {
      if(obj.frequency === "DayOfWeekAndTime"){
        freqIds["weekly_FrequencyId"] = obj.frequencyId
      }
      if(obj.frequency === "Monthly"){
        freqIds["monthly_FrequencyId"] = obj.frequencyId
        if(obj.frequencySpecifier === "Begin"){
          freqIds["begin_frequencySpecifier"] = obj.frequencySpecifierId
        }
        if(obj.frequencySpecifier === "End"){
          freqIds["end_frequencySpecifier"] = obj.frequencySpecifierId
        }
      }
    })
    
    ///////////////////////
    const producerOptions = data.producerNames.map(d=>({
        value: d.producerId,
        label: d.producerName,
        sftAccountName:  d.sftAccountName
      }))
    // console.log(producerOptions)
    let routeOptions = data.route.reduce((result,d) => {
      let updated = false;
        result.map(route => {
          if(route.value === d.routeId){
            route.hopId= [...route.hopId, d.hopId];
            route.hopName= [...route.hopName, d.hopName]
            updated = true;
          }
          return route
        })
        if(!updated){
          result.push({
            value: d.routeId,
            label: d.routeName,
            hopId: [d.hopId],
            hopName: [d.hopName]
          })
        }     
        return result
      }, [])
      // console.log(routeOptions)
      
    // const routeOptions = data.route.map(d=>({
    //   value: d.routeId,
    //   label: d.routeName,
    //   hopId: d.hopId,
    //   hopName: d.hopName
    // }))
    // console.log(routeOptions)

    dispatch(updateProducerOptions(producerOptions));
    dispatch(updateRouteOptions(routeOptions));
    dispatch(updateFrequencyIdsOptions(freqIds))

    setFileTicketOrgGroups(data.fileTicketOrgGroups)
    setEmailRecipientOptions(data.recipients)
  };

  // const producer = useSelector(selectProducer);
  const producerOptions = useSelector(selectProducerOptions);
  const routeOptions = useSelector(selectRouteOptions);
  const frequencyOptions = useSelector(selectFrequencyIdsOptions);
  const selectedRoute = routeOptions.length ? routeOptions.filter(r=> r.value === addFileData.fileInformation.routeId)[0] : null; // useSelector(selectRoute);
  const hopNameOptions = selectedRoute ? selectedRoute.hopName.map((name, i) => ({ "value": selectedRoute.hopId[i], "label": name })) : []
  // const hopIdsOptions =  selectedRoute ? selectedRoute.hopId.map(id => ({ "value": id, "label": id })) : null
  // const { tittle, edit } = props

  const handleProducerChange = (data) => {
    // setProducer(data);
    // dispatch(updateProducer(data));
    // dispatch(updateFileMask(''));
    setAddFileData({
      ...addFileData,
      producerId: data.value,
      fileInformation: {
        ...addFileData.fileInformation,
        sftAccountName: data.sftAccountName
      },
      fileInfoWarning: {
        ...addFileData.fileInfoWarning,
        producerIdWarning: false,
        sftAccountNameWarning: false
      }
    })
  };

  const handleInputAckChange = (name, value) => {
    let tempAFD = {
      ...addFileData
    }
    if(["ackSlaTime", "ackEndTime"].includes(name)){
      
      if(name === "ackSlaTime" && (value <= addFileData.fileInformation.ackEndTime) && value !== ""){
        tempAFD.fileInfoWarning[`${name}Warning`] = false
        tempAFD.fileInfoWarning.ackEndTimeWarning = false
      }else if(name === "ackSlaTime"){
        tempAFD.fileInfoWarning[`${name}Warning`] = true
        tempAFD.fileInfoWarning.ackEndTimeWarning = true
      }
      if(name === "ackEndTime" && addFileData.fileInformation.ackSlaTime && (value >= addFileData.fileInformation.ackSlaTime)){
        tempAFD.fileInfoWarning[`${name}Warning`] = false
        tempAFD.fileInfoWarning.ackSlaTimeWarning = false
      }else if(name === "ackEndTime"){
        tempAFD.fileInfoWarning[`${name}Warning`] = true
        tempAFD.fileInfoWarning.ackSlaTimeWarning = true
      }
    }
    setAddFileData({
      ...addFileData,
      fileInformation: {
        ...addFileData.fileInformation,
        [name]: value
      },
      fileInfoWarning: {
        ...addFileData.fileInfoWarning,
        ...tempAFD.fileInfoWarning
      }
    })
  }

  const handleInputChange = event => {
    const {name, value} =  event.target
    let fileMask = null
    if(["filePrefix", "fileSuffix", "dateTimeMask"].includes(name)){
        fileMask =  (name === "filePrefix" ? value : addFileData.fileInformation.filePrefix||"" ) + 
                    (name === "dateTimeMask" ? value : addFileData.fileInformation.dateTimeMask||"") +
                    (name === "fileSuffix" ? value : addFileData.fileInformation.fileSuffix||"")
                    if(name === "fileSuffix"){
                      setAddFileData({
                        ...addFileData,
                        fileInformation: {
                          ...addFileData.fileInformation,
                          [name]: value,
                          fileMask: fileMask
                        },
                        fileInfoWarning: {
                          ...addFileData.fileInfoWarning,
                        }
                      })
                      return;
                    }
                    setAddFileData({
                      ...addFileData,
                      fileInformation: {
                        ...addFileData.fileInformation,
                        [name]: value,
                        fileMask: fileMask
                      },
                      fileInfoWarning: {
                        ...addFileData.fileInfoWarning,
                        [`${name}Warning`]: !Boolean(value)
                      }
                    })
    } else {
      setAddFileData({
        ...addFileData,
        fileInformation: {
          ...addFileData.fileInformation,
          [name]: value
        },
        fileInfoWarning: {
          ...addFileData.fileInfoWarning,
          [`${name}Warning`]: !Boolean(value)
        }
      })
    }
  }

  const handleDirectionChange = data => {
    setAddFileData({
      ...addFileData,
      fileInformation: {
        ...addFileData.fileInformation,
        direction: { value: data.value, label: data.label }
      }      
    })
  }

  const handleRouteChange = data => {
    // dispatch(updateRoute(data));
    // const hopeIdOptions = data.hopId.map(id => ({ "value": id, "label": id }))
    setAddFileData({
      ...addFileData,
      fileInformation: {
        ...addFileData.fileInformation,
        routeId: data.value
      },
      fileInfoWarning: {
        ...addFileData.fileInfoWarning,
        routeIdWarning: false
      }
    })
  }

  const handleASOChange = data => {
    // dispatch(updateRoute(data));
    // const hopeIdOptions = data.hopId.map(id => ({ "value": id, "label": id }))
    setAddFileData({
      ...addFileData,
      fileInformation: {
        ...addFileData.fileInformation,
        aso: data.value
      },
      fileInfoWarning: {
        ...addFileData.fileInfoWarning,
        asoWarning: false
      }
    })
  }

  const handleAGroupChange = data => {
    setAddFileData({
      ...addFileData,
      fileInformation: {
        ...addFileData.fileInformation,
        agroup: data.value
      },
      fileInfoWarning: {
        ...addFileData.fileInfoWarning,
        agroupWarning: false
      }
    })
  }

  const handleHopNameChange = data => {
    setAddFileData({
      ...addFileData,
      hopName: data.label, // { value: data.value, label: data.value }
      hopId: data.value,
      fileInfoWarning: {
        ...addFileData.fileInfoWarning,
        hopNameWarning: false
      }
    })
  }
  const handleOccuranceChange = event => {
    let firstFrequency = {...fqc}
    if(event.target.value === "DayOfWeekAndTime") {
      delete firstFrequency.mdays;
      firstFrequency.frequencyId= frequencyOptions.weekly_FrequencyId;
      firstFrequency.monthlyOnWarning = false;
      firstFrequency.sfrequencyIdWarning= false;
      firstFrequency.exceptionDayWarning= false;
    } else {
      firstFrequency.days = [ 2,3,4,5,6]
      firstFrequency.frequencyId= frequencyOptions.monthly_FrequencyId;
      firstFrequency.monthlyOn= null;
      firstFrequency.exceptionDayWarning= true;
    }
    setAddFileData({
      ...addFileData,
      occurence: event.target.value,
      fileInfoWarning: {
        ...addFileData.fileInfoWarning,
        occurenceWarning: false
      },
      frequency:[
        // ...addFileData.frequency, if we change from 2 weekly to monthly then we have to clean the weekly
        firstFrequency
      ]
    })
  }

  const handleFileCountChange = event => {
    const {name, value} =  event.target
    let nonNegative = value > 0 || value === ''
    if(nonNegative && !value.includes(".")){
      setAddFileData({
        ...addFileData,
        fileCount: event.target.value,
        fileInfoWarning: {
          ...addFileData.fileInfoWarning,
          fileCountWarning: false
        }
      })
    }
  }

  const handleHopIdChange = data => {
    setAddFileData({
      ...addFileData,
      frequency: {
        ...addFileData.frequency,
        hopId: { value: data.value, label: data.value }
      }
    })
  }

  const onSubmitFrequencyBloackValidation = () => {
    let validationsErrors = false;
    let updatedFreqs = addFileData.frequency.map(fre => {
      if(fre.monthlyOnWarning === null || fre.monthlyOnWarning){
        fre.monthlyOnWarning = true;
      }
      if(fre.sfrequencyIdWarning === null || fre.sfrequencyIdWarning){
        fre.sfrequencyIdWarning = true;
      }
      if(fre.daysWarning === null || fre.daysWarning){
        fre.daysWarning = true;
      }
      if(fre.startTimeWarning === null || fre.startTimeWarning){
        fre.startTimeWarning = true;
      }
      if(fre.emailIndicator && (fre.emailRecipientWarning === null || fre.emailRecipientWarning)){
        fre.emailRecipientWarning = true;
      }
      // if(fre.startTimeTextWarning === null || fre.startTimeTextWarning){
        if(fre.id !== 1) {
          let frequencies  = {frequency : addFileData.frequency }
          let flag = undefined
          if(addFileData.occurence === "Monthly"){
            flag = checkOverlapMonthly(frequencies);
          } else {
            flag = checkOverlap(frequencies);
          }
          console.log("overlapflag",flag)
          fre.startTimeTextWarning = flag != "Success";
        }
      // }
      if(fre.slaWarning === null || fre.slaWarning){
        fre.slaWarning = true;
      }
      if(fre.endTimeWarning === null || fre.endTimeWarning){
        fre.endTimeWarning = true;
      }
      if((fre.exceptionDayWarning === null && fre.thirdrow === true) || fre.exceptionDayWarning){
        fre.exceptionDayWarning = true;
      }
      return fre
    })
    setAddFileData({
      ...addFileData,
      frequency:[
        ...updatedFreqs
      ]
    })
    let index = updatedFreqs.findIndex(fre => {
      //console.log(fre)
      return (fre.daysWarning || fre.startTimeWarning || fre.startTimeTextWarning || fre.slaWarning || fre.endTimeWarning || fre.monthlyOnWarning || fre.sfrequencyIdWarning || fre.exceptionDayWarning || fre.emailRecipientWarning)
    })
    validationsErrors = index !== -1
    return validationsErrors
  }
  const checkOverlapMonthly = (frequencies) => {
    let temp = []

    for (var i = 0; i < frequencies.frequency.length; i++) {
      // for (var j = 0; j < frequencies.frequency[i].days.length; j++) {
        temp.push(frequencies.frequency[i].monthlyOn +""+frequencies.frequency[i].sfrequencyId)
      // }
    }
    console.log(temp)
    console.log("-----------------------------------------")
    let set = new Set(temp);
    let flag = set.size === temp.length ? "Success" : "Failure"
    return flag
  }

  const checkOverlap = (frequencies) => {
    var resFrequencies = { frequency: [] }
 
    for (var i = 0; i < frequencies.frequency.length; i++) {
        for (var j = 0; j < frequencies.frequency[i].days.length; j++) {
            var start = frequencies.frequency[i].startTime.split(':')
            resFrequencies.frequency.push({
                frequencyid: frequencies.frequency[i].frequencyid,
                days: frequencies.frequency[i].days[j],
                startTimeinMin: parseInt(start[0]) * 60 + parseInt(start[1]),
                startTime: frequencies.frequency[i].startTime,
                endTime: frequencies.frequency[i].endTime
            })
        }
 
    }
 
    const sortFrequencies = resFrequencies.frequency.sort(
 
        function (a, b) {
            if (a.days < b.days) return -1
            else if (a.days > b.days) return 1
            else {
                if (a.startTime < b.startTime) return -1
                else if (a.startTime > b.startTime) return 1
                else return 0
            }
        }



    )
    for (i = 0; i < sortFrequencies.length; i++) {
        if (i >= 1) {
            start = sortFrequencies[i].startTime.split(':')
            var daysFactor = (parseInt(sortFrequencies[i].days) - parseInt(sortFrequencies[i - 1].days)) * 24 * 60
            var gap = daysFactor + parseInt(sortFrequencies[i].startTimeinMin) - (parseInt(sortFrequencies[i - 1].startTimeinMin) + parseInt(sortFrequencies[i - 1].endTime))
            if (gap > 0) continue
            return 'Failure'
 
        }
 
    }
    return 'Success'
    //  console.log(sortFrequencies)
 
}
  
  const onAddFileSubmit = async () => {
    // let validationsErrors = false;
    //  if(addFileData.occurence === "Weekly"){
    //     validationsErrors = timeWarning
    //  } else if (addFileData.occurence === "Monthly"){
    //     validationsErrors = warning || timeWarning
    //  }
    // dispatch(submitFile(addFileData));
    // for the request for createFileConfiguration
    // if(true){
    let tempfileTicketOrgGroups = fileTicketOrgGroups.filter(a=> a.supportOrg === addFileData.fileInformation.aso && a.supportGroup === addFileData.fileInformation.agroup)
    let tempfileTicketOrgGroupId = tempfileTicketOrgGroups && tempfileTicketOrgGroups.length ? tempfileTicketOrgGroups[0].fileTicketOrgGroupId : undefined
      if(validateTheForm()){
      let request = {
        producerId: addFileData.producerId,
        fileInformation: {
          ...addFileData.fileInformation,
          ackFileMontoring: addFileData.fileMonitoring ? "Y" : "N",
          fileTicketOrgGroupId: tempfileTicketOrgGroupId,
          enableSmartITTicket: addFileData.addIncident ? "Y" : "N",
          // direction: addFileData.fileInformation.direction && addFileData.fileInformation.direction.toUpperCase()
          direction: addFileData.fileInformation.direction.value.toUpperCase()
        },
        frequency: [
          ...addFileData.frequency.map(f => {
            const tempfrequencySpecifierIds = f.days.map(day => day === 0 ? 7 : day) // before submit covert 0 to 7
            if(addFileData.occurence === "DayOfWeekAndTime"){
              return {
                startTime: f.startTime,
                sla: +f.sla,
                endTime: f.endTime,
                hopId: addFileData.hopId,
                hopName: addFileData.hopName,
                fileCount: +addFileData.fileCount,
                frequencyId: +f.frequencyId,
                //frequency: "DayOfWeekAndTime",
                monthlyFrequencySpecifierId: null,
                frequencySpecifierId: [...tempfrequencySpecifierIds],
                monthlyOn: null,
                exceptionDay: null,
                emailIndicator: f.emailIndicator,
                recipients: f.emailRecipient
                // indicator: "W"
                  }
            } else if (addFileData.occurence === "Monthly"){
                return {
                  startTime: f.startTime,
                  sla: +f.sla,
                  endTime: f.endTime,
                  hopId: addFileData.hopId,
                  hopName: addFileData.hopName,
                  fileCount: +addFileData.fileCount,
                  frequencyId: +f.frequencyId,
                  //frequency: "Monthly",
                  frequencySpecifierId: [...tempfrequencySpecifierIds],
                  monthlyFrequencySpecifierId: f.sfrequencyId,
                  monthlyOn: f.monthlyOn,
                  exceptionDay: f.exceptionDay === null ? f.exceptionDay : ""+f.exceptionDay,
                  emailIndicator: f.emailIndicator,
                  recipients: f.emailRecipient
                  //exceptionDay: ""+f.exceptionDay,"old null issue"
                  // indicator: "M"
                }
              }
          })
        ]
      }

      // checkOverlap(request)
      // console.log("1234567", checkOverlap(request));

      // delte direction key from request
      // delete request.fileInformation.direction
      const createFileConfigurationResponse = await addFileAPIs.addFile(request)
      // verify the response and then redirect to fileObserverAdmin page
      console.log("createFileConfigurationResponse",createFileConfigurationResponse)
      if (createFileConfigurationResponse.status === "Success") {
        dispatch(submitFile(createFileConfigurationResponse));
        props.history.push('/fileObserverAdmin')
      } else {
        setAddFileData({
          ...addFileData,
          validationFlag: true,
          validationMessage: createFileConfigurationResponse.error
          //validationMessage: "After submition failed: The file cannot be added because it has not yet been identified"
        })
      }

    }
    
  }

  function fieldWarning(tempAddFileData, warningType, type) {
    let fieldValue = warningType === undefined ? tempAddFileData[type] : warningType
    if(type === "aso" || type === "agroup") {
      fieldValue = tempAddFileData.addIncident? warningType : true
    }
    if(type === "ackSlaTime" || type === "ackSuffix" || type === "ackEndTime") {
      fieldValue = tempAddFileData.fileMonitoring? warningType : true
    }
    if(fieldValue){
      tempAddFileData.fileInfoWarning[`${type}Warning`] = false;
    } else {
      tempAddFileData.fileInfoWarning[`${type}Warning`] = true;
    }
  }

  const validateTheForm = () => {
    let frequencyValidation_error = onSubmitFrequencyBloackValidation()

    const { sftAccountNameWarning, filePrefixWarning, fileSuffixWarning, dateMaskWarning, dateTimeMaskWarning, routeIdWarning, hopNameWarning, fileCountWarning, asoWarning, agroupWarning } = addFileData.fileInfoWarning
    let validation_error = false;
    const { producerId, fileCount, occurence, hopName, hopId, addIncident, fileMonitoring } = addFileData
    const { sftAccountName, direction, fileMask, filePrefix, fileSuffix, dateMask, dateTimeMask, routeId, aso, agroup, ackSlaTime, ackSuffix, ackEndTime } = addFileData.fileInformation
    let tempAddFileData = { ...addFileData, fileInformation: {...addFileData.fileInformation}, fileInfoWarning: {...addFileData.fileInfoWarning}, frequency: [...addFileData.frequency]}
    let fields = ['sftAccountName', 'filePrefix', 'dateMask', 'dateTimeMask', 'routeId', 'hopName', 'fileCount', 'producerId', 'routeId', 'hopName', 'occurence', 'aso', 'agroup', 'ackSlaTime', 'ackSuffix', 'ackEndTime']
    fields.forEach(field => fieldWarning(tempAddFileData, addFileData.fileInformation[field], field))
    let addIncidentFieldsValidation = addIncident ? (aso && agroup) : true
    let addFileMonitoringvalidation = fileMonitoring ? (ackSuffix && ackSlaTime && ackEndTime) : true
    validation_error = producerId && fileCount && occurence && hopName && hopId && sftAccountName  && fileMask && filePrefix && dateMask && dateTimeMask && routeId && addIncidentFieldsValidation && addFileMonitoringvalidation;

    let checkIFOverlapToShowErrorMessage = false;
    addFileData.frequency.forEach(fre => {
      checkIFOverlapToShowErrorMessage = fre.startTimeTextWarning
      return !fre.startTimeTextWarning
    })
    console.log("checkIFOverlapToShowErrorMessage",checkIFOverlapToShowErrorMessage)

    setAddFileData({
      ...tempAddFileData,
      validationFlag: !Boolean(validation_error && !frequencyValidation_error),
      validationMessage: checkIFOverlapToShowErrorMessage ? "File cannot be added because of incorrect frequency information." : "Validation failed: The file cannot be added due to incomplete or incorrect information."
    })
    return validation_error && !frequencyValidation_error
  }

  const onCancelAddFile = () => {
    // dispatch(updateFileData(null));
    props.history.push('/fileObserverAdmin')
    dispatch(submitFile({status: '', message: ''}));
    // console.log('fileObserverAdmin')
  }

  const addFrequency = () => {
    let addFquency = {...fqc}
    if(addFileData.occurence === "DayOfWeekAndTime") {
      delete addFquency.mdays;
      addFquency.frequencyId= frequencyOptions.weekly_FrequencyId;
      addFquency.id= addFileData.frequency.length+1
      addFquency.monthlyOnWarning = false;
      addFquency.sfrequencyIdWarning= false;
      addFquency.exceptionDayWarning= false;
    } else {
      addFquency.days = [ 2,3,4,5,6]
      addFquency.frequencyId= frequencyOptions.monthly_FrequencyId;
      addFquency.monthlyOn= null;
      addFquency.exceptionDayWarning= true;
      addFquency.id= addFileData.frequency.length+1
    }
    setAddFileData({
      ...addFileData,
      frequency:[
        ...addFileData.frequency,
        addFquency
      ]
    })
  }

  const deleteFrequency = (id) => {
    let freqs = addFileData.frequency.filter(fre => fre.id !== id)
    setAddFileData({
      ...addFileData,
      frequency:[
        ...freqs
      ]
    })
  }
  
  // const handleMonthlyOnField = () => {

  // }

  const updateFrqStartTime  = (type, value, id) => {
    let freqs = addFileData.frequency.map(fre => {
      if(fre.id === id){
        fre[`${type}`] = value;
        if(type === "startTime"){
          fre[`${type}Warning`] = !Boolean(value)
          if(id > 1){
            let parentFre = addFileData.frequency.filter(f => f.id === id-1)[0]
            // let parentFreSpecifierDays =  parentFre.days
            // let currentFreSpecifierDays =  fre.days
            // let daysIntersection = currentFreSpecifierDays.filter(day => parentFreSpecifierDays.includes(day)).length
            let splitTime = parentFre.startTime.split(":")
            let parentTimeinMin = Number(splitTime[0] * 60) + Number(splitTime[1]) + Number(parentFre.endTime || 0 )
            // =====================
            let currentSplitTime = value.split(":")
            let currentTime = Number(currentSplitTime[0] * 60) + Number(currentSplitTime[1])
            // =====================
            // if(currentTime > parentTimeinMin){
              fre[`${type}TextWarning`] = false
            // } else {
            //   fre[`${type}TextWarning`] = true
            // }
          } else {
            fre[`${type}TextWarning`] = false
          }
        } else if(fre.emailIndicator && type === "emailRecipient"){
          fre[`${type}Warning`] = !Boolean(value && value.length)
        } else if(type === "monthlyOn"){
          fre[`${type}Warning`] = !Boolean(value)
        } else if(type === "sfrequencyId"){
          fre[`${type}Warning`] = !Boolean(value)
        } else {
          if(type === "sla" && (value <= fre.endTime) && value !== ""){
            fre[`${type}Warning`] = false
            fre.endTimeWarning = false
          }else if(type === "sla"){
            fre[`${type}Warning`] = true
            fre.endTimeWarning = true
          }
          if(type === "endTime" && fre.sla && (value >= fre.sla)){
            fre[`${type}Warning`] = false
            fre.slaWarning = false
          }else if(type === "endTime"){
            fre[`${type}Warning`] = true
            fre.slaWarning = true
          }
          if(type === "exceptionDay"){
            fre[`${type}Warning`] = false
          }
        }
        
      }
      return fre;
    })

    setAddFileData({
      ...addFileData,
      frequency:[
        ...freqs
      ]
    })
  }

  const updateFrequencyDay = (id, day, type) => {
    let freqs = addFileData.frequency.map(fre => {
      if(fre.id === id){
        let days = [...fre.days]
        if(days.includes(day)){
          days = days.filter(d=> d!==day)
        } else {
          days.push(day)
        }
        fre.days = days
        fre.thirdrow = days.length !== 7
        fre.exceptionDay= days.length === 7 ?  null : fre.exceptionDay
        fre.daysWarning =  days.length === 0
        if(type !== "weekly") {
          fre.exceptionDayWarning = !(fre.thirdrow === false && fre.exceptionDay === null)
        }
      }
      return fre;
    })
    setAddFileData({
      ...addFileData,
      frequency:[
        ...freqs
      ]
    })
  }
  
  const updateFrequencyMDay = (id, day) => {
    let freqs = addFileData.frequency.map(fre => {
      if(fre.id === id){
        let days = [...fre.mdays]
        if(days.includes(day)){
          days = days.filter(d=> d!==day)
        } else {
          days.push(day)
        }
        fre.mdays = days
      }
      return fre;
    })
    setAddFileData({
      ...addFileData,
      frequency:[
        ...freqs
      ]
    })
  }

  const handleErrorDialog = () => {
    setAddFileData({
      ...addFileData,
      errorDialog: false
    })
  }

  const closeValidationError = () => {
    setAddFileData({
      ...addFileData,
      validationFlag: false,
      validationMessage: ""
    })
  }

  const handleIncedientChange = (event) => {
    setAddFileData({
      ...addFileData,
      addIncident: event.target.checked
    })
  }

  const handleEdiRejectingMonitoringChange = (event) => {
    setAddFileData({
      ...addFileData,
      ediRejectMonitoring: event.target.checked
    })
  }

  const handleFileMonitoringChange = (event) => {
    setAddFileData({
      ...addFileData,
      fileMonitoring: event.target.checked
    })
  }

  const updateTimeInMinutes = (event) => {
    const {name, value} =  event.target
    let nonNegative = value >= 0 || value === ''
    let valuetemp = Number(value)
    if(nonNegative && !Number.isNaN(valuetemp)){
      handleInputAckChange(name, valuetemp)
      // props.updateFrqStartTime(type, value, id)
    } else {
      handleInputAckChange(name, "")
      // props.updateFrqStartTime(type, "", id)      
    }
    
  }
  
  console.log("addFileData from AddFile/index",addFileData)
  console.log(fileTicketOrgGroups)
  let asoOptions = []
  fileTicketOrgGroups.map(fog => {
    if (asoOptions.find(o => o.value === fog.supportOrg)) {
      console.log("ALREADY PRESENT")
    } else {
      let tempFog = {
        value: fog.supportOrg,
        label: fog.supportOrg,
        agroup: []
      }
      fileTicketOrgGroups.forEach(f => {
        if (f.supportOrg === tempFog.value) {
          tempFog.agroup.push(f.supportGroup)
        }
      })
      asoOptions.push(tempFog)
    }
  })
  console.log(asoOptions)
    // mock assigned support organization options
    // const asoOptions = [
    //   {value: 'aso1', label: 'aso1', agroup: [ "aso1group1", "aso1group2", "aso1group3"]},
    //   {value: 'aso2', label: 'aso2', agroup: [ "aso2group1", "aso2group2", "aso2group3"]},
    //   {value: 'aso3', label: 'aso3', agroup: [ "aso3group1", "aso3group2", "aso3group3"]}
    // ]
    let agroupOptions = []
    asoOptions.forEach(r=> {
      if(r.value === addFileData.fileInformation.aso){
        agroupOptions = r.agroup.map(ag=> ({value: ag, label: ag}))
      }
    }) 
    console.log("agroupOptions", agroupOptions)
  // console.log(routeOptions)
  console.log("add file props",props)
  return (
    <div className={classes.container}>
      <div className={classes.container}>
        <div className={classes.allign}>
          <div className={classes.header}>Add File</div>
          <div className={classes.content}>
            <div className={classes.subheader}>File Information</div>
            <div className={classes.display}>
              <Grid container>
              <div className={classes.flex}>
                  <span className={classes.label}>Producer</span>
                  <FormControl variant="outlined"  error={addFileData.fileInfoWarning.producerIdWarning}>
                  <Select 
                    // error={true}
                    value={producerOptions.filter(r=> r.value === addFileData.producerId)}
                    options={producerOptions}
                    onChange={handleProducerChange}
                    isLoading={!(producerOptions && producerOptions.length)}
                    placeholder="Producer"
                  />
                  {addFileData.fileInfoWarning.producerIdWarning && <FormHelperText>its a required Field</FormHelperText>}
                  </FormControl>
                </div>
                <div className={classes.flex}>
                  <span className={classes.label}>SFT Account Name</span>
                  <TextField name="sftAccountName" 
                    onChange={handleInputChange} 
                    disabled={true}
                    value={addFileData.fileInformation.sftAccountName}
                    error={addFileData.fileInfoWarning.sftAccountNameWarning}
                    helperText={addFileData.fileInfoWarning.sftAccountNameWarning && "its a required Field"} />
                </div>
                <div className={classes.flex}>
                  <span className={classes.label}>Direction</span>
                  <FormControl>
                  <Select
                   value={addFileData.fileInformation.direction}
                   options={directionOptions}
                   onChange={handleDirectionChange}
                   isLoading={!(directionOptions && directionOptions.length)}
                   placeholder="Direction"
                  />
                  </FormControl>
                </div>
                {/* <div className={classes.flex}>
                  <span className={classes.label}>File Mask</span>
                  <TextField name="fileMask" onChange={handleInputChange} value={addFileData.fileInformation.fileMask} />
                </div> */}
                <div className={classes.flex}>
                  <span className={classes.label}>File Mask</span>
                  <div className={classes.read_textFileds}>
                    <span className={classes.readValue}>{addFileData.fileInformation.fileMask}</span>
                  </div>
                  </div>
              </Grid>
              <Grid container>
              <div className={classes.flex}>
                  <span className={classes.label}>Prefix</span>
                  <TextField name="filePrefix" onChange={handleInputChange} value={addFileData.fileInformation.filePrefix}
                  error={addFileData.fileInfoWarning.filePrefixWarning}
                  helperText={addFileData.fileInfoWarning.filePrefixWarning && "its a required Field"} />
                </div>
                <div className={classes.flex}>
                  <span className={classes.label}>Suffix</span>
                  <TextField name="fileSuffix" onChange={handleInputChange} value={addFileData.fileInformation.fileSuffix}
                  error={addFileData.fileInfoWarning.fileSuffixWarning}
                  helperText={addFileData.fileInfoWarning.fileSuffixWarning && "its a required Field"} />
                </div>
                <div className={classes.flex}>
                  <span className={classes.label}>Date Mask</span>
                  <TextField name="dateMask" onChange={handleInputChange} value={addFileData.fileInformation.dateMask}
                  error={addFileData.fileInfoWarning.dateMaskWarning}
                  helperText={addFileData.fileInfoWarning.dateMaskWarning && "its a required Field"} />
                </div>
                <div className={classes.flex}>
                  <span className={classes.label}>Date Time Mask</span>
                  <TextField name="dateTimeMask" onChange={handleInputChange} value={addFileData.fileInformation.dateTimeMask}
                  error={addFileData.fileInfoWarning.dateTimeMaskWarning}
                  helperText={addFileData.fileInfoWarning.dateTimeMaskWarning && "its a required Field"} />
                </div>
              </Grid>
              <Grid container>
                <div className={classes.flex}>
                  <span className={classes.label}>Route</span>
                  <FormControl variant="outlined"  error={addFileData.fileInfoWarning.routeIdWarning}>
                  <Select
                   name="route"
                   value={routeOptions.filter(r=> r.value === addFileData.fileInformation.routeId)}
                   options={routeOptions}
                   onChange={handleRouteChange}
                   isLoading={!(routeOptions && routeOptions.length)}
                   placeholder="Route"
                  />
                  {addFileData.fileInfoWarning.routeIdWarning && <FormHelperText>its a required Field</FormHelperText>}
                  </FormControl>
                </div>
                <div className={classes.switch_style}>
                  <div className={classes.displayFlex}>
                    <span className={classes.label}>Add Incident Ticket ?</span>
                    <Tooltip placement="top" 
                      title={<div style={{padding: "10px", width: "251px", fontSize: '12px'}}>This allows the user to configure a smart IT incident ticket to create when the file misses SLA.</div>} arrow>
                      <InfoOutlinedIcon color="primary" style={{'padding-left' : "10px"}} fontSize="small"/>
                    </Tooltip>
                  </div>
                  <FormControl variant="outlined"  error={addFileData.fileInfoWarning.routeIdWarning}>
                  <FormControlLabel
                   style={{width: 'fit-content'}}
                    value={addFileData.addIncident ? "Yes" : "No"}
                    control={
                        <Switch
                        checked={addFileData.addIncident}
                        // style={{width: '40px'}}
                        onChange={handleIncedientChange}
                        color="primary"
                        name="checkedB"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />}
                    label={addFileData.addIncident ? "Yes" : "No"}
                    labelPlacement="start"
                  />
                  {/* {addFileData.fileInfoWarning.routeIdWarning && <FormHelperText>its a required Field</FormHelperText>} */}
                  </FormControl>
                </div>
                {addFileData.addIncident && 
                <>
                <div className={classes.flex}>
                  <span className={classes.label}>Assigned Support Organization</span>
                  <FormControl variant="outlined"  error={addFileData.fileInfoWarning.asoWarning}>
                  <Select
                   name="aso"
                   value={asoOptions.filter(r=> r.value === addFileData.fileInformation.aso)}
                   options={asoOptions}
                   onChange={handleASOChange}
                   isLoading={!(asoOptions && asoOptions.length)}
                  //  placeholder="Assigned Support Organization"
                  />
                  {addFileData.fileInfoWarning.asoWarning && <FormHelperText>its a required Field</FormHelperText>}
                  </FormControl>
                </div>
                <div className={classes.flex}>
                  <span className={classes.label}>Assignment Group</span>
                  <FormControl variant="outlined"  error={addFileData.fileInfoWarning.agroupWarning}>
                  <Select
                   name="agroup"
                   value={agroupOptions.filter(h=> h.label === addFileData.fileInformation.agroup)}
                   options={agroupOptions}
                   onChange={handleAGroupChange}
                   isLoading={!(agroupOptions && agroupOptions.length)}
                  //  placeholder="HopName"
                  />
                  {addFileData.fileInfoWarning.agroupWarning && <FormHelperText>its a required Field</FormHelperText>}
                  </FormControl>
                </div>
                </>}
              </Grid>
              <Grid container>
                <div className={classes.switch_style}>
                  <div className={classes.displayFlex}>
                    <span className={classes.label}>Track EDI Gateway Rejection ?</span>
                  </div>
                  <div className={classes.displayBlock}>
                  <FormControl variant="outlined"  error={false}>
                  <FormControlLabel
                    value={addFileData.ediRejectMonitoring ? "Yes" : "No"}
                    control={
                        <Switch
                        checked={addFileData.ediRejectMonitoring}
                        // style={{color: 'green'}}
                        onChange={handleEdiRejectingMonitoringChange}
                        color="primary"
                        name="checkedB"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />}
                    label={addFileData.ediRejectMonitoring ? "Yes" : "No"}
                    labelPlacement="start"
                  />
                  {/* {addFileData.fileInfoWarning.routeIdWarning && <FormHelperText>its a required Field</FormHelperText>} */}
                  </FormControl>
                  </div>
                </div>
              </Grid>
            </div>
          </div>
          <div className={classes.content}>
            <div className={classes.subheader}>Acknowledgment File</div>
            <div className={classes.display}>
              <Grid container>
                <div className={classes.switch_style}>
                  <div className={classes.displayFlex}>
                    <span className={classes.label}>File Monitoring ?</span>
                  </div>
                  <div className={classes.displayBlock}>
                  <FormControl variant="outlined" error={addFileData.fileInfoWarning.routeIdWarning}>
                    <FormControlLabel
                      value={addFileData.fileMonitoring ? "Yes" : "No"}
                      control={
                        <Switch
                          checked={addFileData.fileMonitoring}
                          // style={{color: 'green'}}
                          onChange={handleFileMonitoringChange}
                          color="primary"
                          name="checkedB"
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />}
                      label={addFileData.fileMonitoring ? "Yes" : "No"}
                      labelPlacement="start"
                    />
                    {/* {addFileData.fileInfoWarning.routeIdWarning && <FormHelperText>its a required Field</FormHelperText>} */}
                  </FormControl>
                  </div>
                </div>
                {addFileData.fileMonitoring && <>
                <div className={classes.flex}>
                  <span className={classes.label}>Suffix</span>
                  <TextField name="ackSuffix" 
                    onChange={handleInputChange} 
                    // disabled={true}
                    value={addFileData.fileInformation.ackSuffix}
                    error={addFileData.fileInfoWarning.ackSuffixWarning}
                    helperText={addFileData.fileInfoWarning.ackSuffixWarning && "its a required Field"} 
                    />
                </div>
                <div className={classes.flex}>
                  <span className={classes.label}>SLA</span>
                  <FormControl>
                  <TextField name="ackSlaTime" 
                    onChange={updateTimeInMinutes} 
                    // disabled={true}
                    value={addFileData.fileInformation.ackSlaTime}
                    error={addFileData.fileInfoWarning.ackSlaTimeWarning}
                    helperText={addFileData.fileInfoWarning.ackSlaTimeWarning && "SLA <= End time"} 
                    />
                  </FormControl>
                </div>
                <div className={classes.flex}>
                  <span className={classes.label}>End Time</span>
                  <FormControl>
                  <TextField name="ackEndTime" 
                    onChange={updateTimeInMinutes} 
                    // disabled={true}
                    value={addFileData.fileInformation.ackEndTime}
                    error={addFileData.fileInfoWarning.ackEndTimeWarning}
                    helperText={addFileData.fileInfoWarning.ackEndTimeWarning && "End time >= SLA"} 
                    />
                  </FormControl>
                </div>
                </>}
              </Grid>
            </div>
          </div>

          <div className={classes.subcontent}>
            <div className={classes.header}>Frequency</div>
            <div>
              <Grid container>
              <div className={classes.padding}>
                <FormControl variant="outlined"  error={addFileData.fileInfoWarning.occurenceWarning}>
                  <FormLabel classes={{ root: classes.label }} component="legend">Occurence</FormLabel>
                  <RadioGroup row aria-label="position" name="position" defaultValue="top" onChange={handleOccuranceChange} value={addFileData.occurence}>
                    <FormControlLabel classes={{ root: classes.label }} value="DayOfWeekAndTime" control={<Radio color="primary" />} label="Weekly" />
                    <FormControlLabel classes={{ root: classes.label }} value="Monthly" control={<Radio color="primary" />} label="Monthly" />
                  </RadioGroup>
                  {addFileData.fileInfoWarning.occurenceWarning && <FormHelperText>its a required Field</FormHelperText>}
                  </FormControl>
                </div>
                <div className={classes.flex}>
                  <span className={classes.label}>HopName</span>
                  <FormControl variant="outlined"  error={addFileData.fileInfoWarning.hopNameWarning}>
                  <Select
                   value={hopNameOptions.filter(h=> h.label === addFileData.hopName)}
                   options={hopNameOptions}
                   onChange={handleHopNameChange}
                   isLoading={!(hopNameOptions && hopNameOptions.length)}
                   placeholder="HopName"
                  />
                  {addFileData.fileInfoWarning.hopNameWarning && <FormHelperText>its a required Field</FormHelperText>}
                  </FormControl>
                  {/* <TextField value={addFileData.hopId}/> */}
                </div>
                <div className={classes.flex}>
                  <span className={classes.label}>File count</span>
                  {/* <TextField type="number"/> */}
                  {/* <TextField type="number" name="fileCount" onChange={handleFileCountChange} value={addFileData.fileCount}/> */}
                  <TextField name="fileCount" onChange={handleFileCountChange} value={addFileData.fileCount}
                  error={addFileData.fileInfoWarning.fileCountWarning}
                  helperText={addFileData.fileInfoWarning.fileCountWarning && "its a required Field"} />
                </div>
              </Grid>
            </div>
            {addFileData.occurence === "DayOfWeekAndTime" && 
              addFileData.frequency.map((freq,i) => <Frequency data={freq} deleteFrequency={deleteFrequency}
              updateFrqStartTime={updateFrqStartTime}
              updateFrequencyDay={updateFrequencyDay}
              updateFrequencyMDay={updateFrequencyMDay}
              setWarning={setWarning}
              setTimeWarning={setTimeWarning}
              warning={warning}
              timeWarning={timeWarning}
              setValidationWarnings={setValidationWarnings}
              validationWarnings={validationWarnings}
              emailRecipientOptions={emailRecipientOptions}
              />)
            }
            {addFileData.occurence === "Monthly" && 
              addFileData.frequency.map((freq,i) => <EditFrequency data={freq} deleteFrequency={deleteFrequency}
              updateFrqStartTime={updateFrqStartTime}
              updateFrequencyDay={updateFrequencyDay}
              updateFrequencyMDay={updateFrequencyMDay}
              setWarning={setWarning}
              setTimeWarning={setTimeWarning}
              warning={warning}
              timeWarning={timeWarning}
              setValidationWarnings={setValidationWarnings}
              validationWarnings={validationWarnings}
              frequencyOptions={frequencyOptions}
              emailRecipientOptions={emailRecipientOptions}
              />)
            }
            {addFileData.occurence && <Button className={classes.form_btn_space} variant="outlined" onClick={addFrequency}>+ Add Frequency</Button>}
          </div>
        </div>
      </div>
      <div className={classes.formaddfile}>
        <Button onClick={() => onCancelAddFile()} className={classes.form_btn_space} variant="outlined" color="primary">
          Cancel
      </Button>
        <Button onClick={onAddFileSubmit} variant="contained">Submit</Button>
      </div>
      <CustomErrorDialog open={addFileData.validationFlag} onClose={closeValidationError} severity="error" message={addFileData.validationMessage}/>
      {/* <AlertDialog open={addFileData.errorDialog} handleClose={handleErrorDialog}/> 
      <Snackbar open={true} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert severity="success">
          The File was added Sucessfully!
        </Alert>
      </Snackbar>
      <Snackbar open={true} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
         <Alert severity="error">
          The File was updated Sucessfully!
        </Alert>
      </Snackbar>
      <Snackbar open={true} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert severity="error">
          The file cannot be added because it has not yet been intiated.
        </Alert>
      </Snackbar> 
      <Snackbar open={addFileData.validationFlag} onClose={closeValidationError} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert severity="error">
          The file cannot be added due to incomplete or incorrect information.
        </Alert>
      </Snackbar>*/}
    </div>
  );
}

export default AddFile;