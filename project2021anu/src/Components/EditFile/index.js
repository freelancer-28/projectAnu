//Vendors
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Switch, Tooltip, FormHelperText } from '@material-ui/core/';
// import TextField from '@material-ui/core/TextField';
// components, utils
import Frequency from '../Frequency';
import EditFrequency from '../EditFrequency';
import Select from '../../Components/Select';
import TextField from '../../Components/TextField';
import { submitFile } from "../../actions";
import filtersAPIs from "../../apis/FileObserver/filters";
import addFileAPIs from "../../apis/AdminTool/addFile";
import CustomErrorDialog from '../CustomErrorDialog/index';
import updateFileAPIs from "../../apis/AdminTool/updateFile";
// Actions, Selectors, Reducers
import { selectFrequencyIdsOptions } from "../../reducers/producer";
// import { selectRoute, selectRouteOptions } from '../../reducers/route';
import { selectFileData } from "../../reducers/fileData";
// styles
// import { faFileExport } from "fa5-pro-light"; 
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
const useStyles = makeStyles((theme) => ({
  displayBlock: {
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
  // container: {
  //   padding: '40px 16px',
  //   background: '#F4F5F6'
  // },
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
  action: null,
  emailIndicator: false,
  emailRecipient: null,
  emailRecipientWarning: null,
  days: [1, 2, 3, 4, 5],
  mdays: [1, 2, 3, 4, 5],
  startTime: null,
  sla: null,
  endTime: null,
  hopId: null,
  hopName: null,
  fileCount: null,
  frequencyId: null,
  daysWarning: false,
  emailRecipients: [],
  startTimeWarning: null,
  startTimeTextWarning: null,
  slaWarning: null,
  endTimeWarning: null,
  frequencyWarning: false,
  monthlyOnWarning: null,
  sfrequencyIdWarning: null,
  exceptionDayWarning: null,
}

function EditFile(props) {
  const frequencyOptions = useSelector(selectFrequencyIdsOptions);
  const [warning, setWarning] = useState(false)
  const [timeWarning, setTimeWarning] = useState(false)
  // const [tempFSDays, setTempFSDays] = useState([]);
  const [fileTicketOrgGroups, setFileTicketOrgGroups] = useState([])
  const [emailRecipientOptions, setEmailRecipientOptions] = useState([])
  const [addFileData, setAddFileData] = useState(
    {
      addIncident: false,
      producerFileId: null,
      thirdrow: null,
      validationFlag: false,
      validationMessage: "",
      errorDialog: true,
      producerId: null,
      producerName: null,
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
        fileSuffixWarning: null,
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
        isDeleted: null,
        routeId: null,
        sftAccountName: null,
        direction: directionOptions[0].value
      },
      frequency: [{
        action: "NO_UPDATE",
        frequencySpecifierIds: [],
        emailRecipients: [],
        // emailIndicator: false
      }]
    })

  const dispatch = useDispatch();
  const classes = useStyles();
  const editData = useSelector(selectFileData);
  useEffect(() => {
    const {
      // code so that, no need of multipleFrequencyDetails 
      multipleFrequencyDetails,
      frequencyId,
      endTime,
      startTime,
      monthlyOn,
      monthlyFrequencySpecierId,
      frequencySpecifierIds,
      // frequencySpecifierId, <---
      exceptionDay,
      producerId,
      producerName,
      hopName,
      hopId,
      fileCount,
      ackFileMontoring, ackSuffix, ackSlaTime, ackEndTime, ediRejectMonitoring,
      producerFileId } = editData
    var { slaTime: sla } = editData;
    const {
      dateMask,
      dateTimeMask,
      fileMask,
      filePrefix,
      fileSuffix,
      isDeleted,
      routeId,
      sftAccountName,
      direction,
      fileTicketOrgGroupId,
      supportOrg,
      supportGroup
    } = editData
    // // console.log("frequencyId from EditFile", frequencyId)
    const occurence = multipleFrequencyDetails[0].frequencyId == frequencyOptions.weekly_FrequencyId ? 'DayOfWeekAndTime' : 'Monthly'
    let multiFrequency = multipleFrequencyDetails.map((q, i) => {
      let firstFrequency = { ...fqc }
      if (occurence === "DayOfWeekAndTime") {
        firstFrequency.id = i + 1;
        delete firstFrequency.mdays;
        firstFrequency.action = "NO_UPDATE";
        firstFrequency.frequencyWarning = q.frequencyWarning ? false : true;
        firstFrequency.frequencyId = q.frequencyId;
        firstFrequency.endTime = q.endTime;
        firstFrequency.endTimeWarning = q.endTime ? false : true
        firstFrequency.startTime = q.startTime;
        firstFrequency.startTimeWarning = q.startTime ? false : true
        firstFrequency.sla = q.sla;
        firstFrequency.slaWarning = q.sla ? false : true;
        const tempfrequencySpecifierIds = q.producerFileFrequencySpecifierIds.map(day =>
          new Object({
            frequencySpecifierId: day.frequencySpecifierId,
            id: day.id,
            isDeleted: "N"
          }));
          /* const tempfrequencySpecifierIds = 
          q.producerFileFrequencySpecifierIds.map(day =>{ 
              const tempArr = [];
              // days = 1,2,3,4,5,6,7 sunday=7
              for (let d = 1; d < 8; d++) {
                const dayPrsnt = producerFileFrequencySpecifierIds.find((el) => 
                el.id && 
                ((el.frequencySpecifierId === 7 ? 0 : el.frequencySpecifierId ) === day))
                if (dayPrsnt) {
                  tempArr.push({
                    id: dayPrsnt.id,
                    isDeleted: 'N',
                    isSelected: true,
                    frequencySpecifierId: dayPrsnt.frequencySpecifierId === 7 ? 0 : dayPrsnt.frequencySpecifierId,
                  })
                } else {
                  tempArr.push({
                    id: null,
                    isDeleted: 'Y',
                    isSelected: false,
                    frequencySpecifierId: d,
                  })
                }
             }
             producerFileFrequencySpecifierIds = [...tempArr];
             console.log("tempArr", tempArr)
            }
            ); */
        firstFrequency.frequencySpecifierIds = [...tempfrequencySpecifierIds];
        const daysFromIds = tempfrequencySpecifierIds.map(day => day.frequencySpecifierId)
        const tempRecipients = q.emailRecipients ? q.emailRecipients.map(person =>
          new Object({
            action: "NO_UPDATE",
            recipient_Id: person.recipient_Id,
            recipient_Name: person.recipient_Name
          })) : [];
        firstFrequency.emailRecipients = [...tempRecipients];
        firstFrequency.emailIndicator = q.emailIndicator;
        // firstFrequency.emailIndicator= q.emailIndicator;
        firstFrequency.days = [...daysFromIds];
        firstFrequency.monthlyOnWarning = false;
        firstFrequency.sfrequencyIdWarning = false;
        firstFrequency.exceptionDayWarning = false;
      } else {
        firstFrequency.id = i + 1;
        firstFrequency.action = "NO_UPDATE";
        firstFrequency.frequencyWarning = q.frequencyWarning ? false : true;;
        firstFrequency.frequencyId = q.frequencyId;
        firstFrequency.monthlyOn = q.monthlyOn;
        firstFrequency.monthlyOnWarning = q.monthlyOn ? false : true
        firstFrequency.sfrequencyId = "" + q.producerFileFrequencySpecifierIds[0].frequencySpecifierId;
        firstFrequency.sfrequencyIdWarning = q.producerFileFrequencySpecifierIds[0].frequencySpecifierId ? false : true
        firstFrequency.endTime = q.endTime;
        firstFrequency.endTimeWarning = q.endTime ? false : true
        firstFrequency.startTime = q.startTime;
        firstFrequency.startTimeWarning = q.startTime ? false : true
        firstFrequency.sla = q.sla;
        firstFrequency.slaWarning = q.sla ? false : true
        // const tempfrequencySpecifierIds = frequencySpecifierIds.map(day => day === 7 ? 0 : day)
        const tempfrequencySpecifierIds = q.producerFileFrequencySpecifierIds.map(day =>
          new Object({
            frequencySpecifierId: day.frequencySpecifierId,
            id: day.id,
            isDeleted: "N"
          }));
        firstFrequency.frequencySpecifierIds = [...tempfrequencySpecifierIds];
        const tempRecipients = q.emailRecipients ? q.emailRecipients.map(person =>
          new Object({
            action: "NO_UPDATE",
            recipient_Id: person.recipient_Id,
            recipient_Name: person.recipient_Name
          })) : [];
        firstFrequency.emailRecipients = [...tempRecipients];
        firstFrequency.emailIndicator = q.emailIndicator;
        // firstFrequency.emailIndicator= q.emailIndicator;
        // change monthlyAllowedDays to just allowedDays array for monthyly
        firstFrequency.days = [...q.monthlyAllowedDays];
        firstFrequency.exceptionDay = +q.exceptionDay || null;
        let thirdRowTemp = (q.exceptionDay === null && q.monthlyAllowedDays.length  === 7) ? false : true
        firstFrequency.thirdrow = thirdRowTemp
        firstFrequency.exceptionDayWarning = thirdRowTemp === true && q.exceptionDay === null
      }
      return firstFrequency;
      // frequencySetDayObject.map((el) =>)
    })

    if((occurence === "DayOfWeekAndTime")){
      for (let j = 0; j < multiFrequency.length; j++) {
      const tempArr = [];
      // days = 0,1,2,3,4,5,6, sunday=0
      for (let day = 0; day < 7; day++) {
        const dayPrsnt = multiFrequency[j].frequencySpecifierIds.find((el) => el.id && (
          (el.frequencySpecifierId === 7 ? 0 : el.frequencySpecifierId ) === day))
        if (dayPrsnt) {
          tempArr.push({
            id: dayPrsnt.id,
            isDeleted: 'N',
            isSelected: true,
            frequencySpecifierId: dayPrsnt.frequencySpecifierId === 7 ? 0 : dayPrsnt.frequencySpecifierId,
          })
        } else {
          tempArr.push({
            id: null,
            isDeleted: 'Y',
            isSelected: false,
            frequencySpecifierId: day,
          })
        }
      }
      multiFrequency[j].frequencySpecifierIds = [...tempArr];
      console.log("tempFrequencySpecifierIds aaa tempArr", tempArr);
    }}

    setAddFileData({
      ...addFileData,
      producerFileId,
      producerId,
      producerName,
      hopName,
      hopId,
      occurence,
      fileCount,
      fileMonitoring: ackFileMontoring === "Y" ? true : false,
      addIncident: fileTicketOrgGroupId ? true : false,
      ediRejectMonitoring: ediRejectMonitoring === "Y" ? true : false,
      fileInformation: {
        aso: supportOrg,
        agroup: supportGroup,
        ackSuffix,
        ackSlaTime,
        ackEndTime,
        dateMask,
        dateTimeMask,
        fileMask,
        filePrefix,
        fileSuffix,
        isDeleted,
        routeId,
        sftAccountName,
        direction
      },
      frequency: [
        ...multiFrequency
      ]
    })
    // console.log("&&&__ran useEffect in EditFile___&&&")
    // console.log("multiFrequency from useEffect", multiFrequency)
    fetchProducerFiltersFromServer(); //???? why here ????//
    return () => { // console.log('useEffectProps from edit file', props) 
    }
  }, []);

  const fetchProducerFiltersFromServer = async () => {
    const data = await filtersAPIs.fetchProducerOptions();
    setFileTicketOrgGroups(data.fileTicketOrgGroups)
    setEmailRecipientOptions(data.recipients) //this gets data from names api call
  }

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
      }
    })
  };

  const handleRouteChange = data => {
    // dispatch(updateRoute(data));
    // const hopeIdOptions = data.hopId.map(id => ({ "value": id, "label": id }))
    setAddFileData({
      ...addFileData,
      fileInformation: {
        ...addFileData.fileInformation,
        routeId: data.value
      }
    })
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


  const handleInputAckChange = (name, value) => {
    let tempAFD = {
      ...addFileData
    }
    if (["ackSlaTime", "ackEndTime"].includes(name)) {

      if (name === "ackSlaTime" && (value <= addFileData.fileInformation.ackEndTime) && value !== "") {
        tempAFD.fileInfoWarning[`${name}Warning`] = false
        tempAFD.fileInfoWarning.ackEndTimeWarning = false
      } else if (name === "ackSlaTime") {
        tempAFD.fileInfoWarning[`${name}Warning`] = true
        tempAFD.fileInfoWarning.ackEndTimeWarning = true
      }
      if (name === "ackEndTime" && addFileData.fileInformation.ackSlaTime && (value >= addFileData.fileInformation.ackSlaTime)) {
        tempAFD.fileInfoWarning[`${name}Warning`] = false
        tempAFD.fileInfoWarning.ackSlaTimeWarning = false
      } else if (name === "ackEndTime") {
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
    const { name, value } = event.target
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

  const handleDirectionChange = data => {
    setAddFileData({
      ...addFileData,
      fileInformation: {
        ...addFileData.fileInformation,
        direction: { value: data.value, label: data.label }
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
    let firstFrequency = { ...fqc }
    if (event.target.value === "DayOfWeekAndTime") {
      delete firstFrequency.mdays;
      firstFrequency.frequencyId = frequencyOptions.weekly_FrequencyId;
      firstFrequency.monthlyOnWarning = false;
      firstFrequency.sfrequencyIdWarning = false;
      firstFrequency.exceptionDayWarning = false;
    } else {
      firstFrequency.frequencyId = frequencyOptions.monthly_FrequencyId;
      firstFrequency.monthlyOn = null;
    }
    setAddFileData({
      ...addFileData,
      occurence: event.target.value,
      fileInfoWarning: {
        ...addFileData.fileInfoWarning,
        occurenceWarning: false
      },
      frequency: [
        // ...addFileData.frequency, if we change from 2 weekly to monthly then we have to clean the weekly
        firstFrequency
      ]
    })
  }

  const handleFileCountChange = event => {
    const { name, value } = event.target
    let nonNegative = value > 0 || value === ''
    if (nonNegative && !value.includes(".")) {
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

  const onSubmitFrequencyBloackValidation = () => {
    let validationsErrors = false;
    let updatedFreqs = addFileData.frequency.map(fre => {
      if (fre.monthlyOnWarning === null || fre.monthlyOnWarning) {
        fre.monthlyOnWarning = true;
      }
      if (fre.sfrequencyIdWarning === null || fre.sfrequencyIdWarning) {
        fre.sfrequencyIdWarning = true;
      }
      if (fre.daysWarning === null || fre.daysWarning) {
        fre.daysWarning = true;
      }
      if (fre.startTimeWarning === null || fre.startTimeWarning) {
        fre.startTimeWarning = true;
      }
      if (fre.emailIndicator && (fre.emailRecipientWarning === null || fre.emailRecipientWarning)) {
        fre.emailRecipientWarning = true;
      }
      // For editPage empty email recipients list when the indicator is open/true/yes
      // if(fre.emailIndicator && (fre.emailRecipientWarning === null || fre.emailRecipientWarning)){
      //   fre.emailRecipientWarning = true;
      // }
      // if(fre.startTimeTextWarning === null || fre.startTimeTextWarning){
      if (fre.id !== 1) {
        let frequencies = { frequency: addFileData.frequency }
        let flag = undefined
        if (addFileData.occurence === "Monthly") {
          flag = checkOverlapMonthly(frequencies);
        } else {
          flag = checkOverlap(frequencies);
        }
        // console.log("overlap flag", flag)
        fre.startTimeTextWarning = flag != "Success";
      }
      if (fre.slaWarning === null || fre.slaWarning) {
        fre.slaWarning = true;
      }
      if (fre.endTimeWarning === null || fre.endTimeWarning) {
        fre.endTimeWarning = true;
      }
      if ((fre.exceptionDayWarning === null && fre.thirdrow === true) || fre.exceptionDayWarning) {
        fre.exceptionDayWarning = true;
      }
      if (fre.frequencyWarning === null || fre.frequencyWarning) {
        fre.frequencyWarning = true;
      }
      return fre
    })
    setAddFileData({
      ...addFileData,
      frequency: [
        ...updatedFreqs
      ]
    })
    let index = updatedFreqs.findIndex(fre => (fre.daysWarning || fre.startTimeWarning || fre.startTimeTextWarning || fre.slaWarning || fre.endTimeWarning || fre.monthlyOnWarning || fre.sfrequencyIdWarning || fre.exceptionDayWarning || fre.emailRecipientWarning))
    validationsErrors = index !== -1
    return validationsErrors
  }



  const checkOverlapMonthly = (frequencies) => {
    let temp = []

    for (var i = 0; i < frequencies.frequency.length; i++) {
      // for (var j = 0; j < frequencies.frequency[i].days.length; j++) {
      temp.push(frequencies.frequency[i].monthlyOn + "" + frequencies.frequency[i].sfrequencyId)
      // }
    }
    // console.log("temp data", temp)
    // console.log("-----------------------------------------")
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
    //  // console.log(sortFrequencies)
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
    let tempfileTicketOrgGroups = fileTicketOrgGroups.filter(a => a.supportOrg === addFileData.fileInformation.aso && a.supportGroup === addFileData.fileInformation.agroup)
    let tempfileTicketOrgGroupId = tempfileTicketOrgGroups && tempfileTicketOrgGroups.length ? tempfileTicketOrgGroups[0].fileTicketOrgGroupId : undefined
    if (validateTheForm()) {
      let request = {
        producerFileId: addFileData.producerFileId,
        producerId: addFileData.producerId,
        //producerName: addFileData.producerName,
        fileInformation: {
          ...addFileData.fileInformation,
          ackFileMontoring: addFileData.fileMonitoring ? "Y" : "N",
          fileTicketOrgGroupId: tempfileTicketOrgGroupId,
          enableSmartITTicket: addFileData.addIncident ? "Y" : "N",
        },
        frequency: [
          ...addFileData.frequency.map(f => {
            if (addFileData.occurence === "DayOfWeekAndTime") {
              return {
                startTime: f.startTime,
                sla: +f.sla,
                endTime: f.endTime,
                hopId: addFileData.hopId,
                hopName: addFileData.hopName,
                fileCount: +addFileData.fileCount,
                frequencyId: +f.frequencyId,
                frequencySpecifierIds: f.frequencySpecifierIds
                  .map((el1) => {
                    if (el1.isSelected) delete el1.isSelected
                    return (el1.frequencySpecifierId === 0 ? { ...el1, frequencySpecifierId: 7 } : { ...el1 })
                  })
                  .filter((el) => !(!el.id && el.isDeleted === 'Y')),
                monthlyFrequencySpecifierId: null, //???? nned it ???
                monthlyOn: null,
                exceptionDay: null,
                emailIndicator: f.emailIndicator,
                recipients: f.emailIndicator ? f.emailRecipient.filter((el) => el.action !== "NO_UPDATE") : [],
                action: f.action,
                //indicator: "W"
              }
            } else if (addFileData.occurence === "Monthly") {
              const tempAllowedDays = f.days.map(
                day => day === 0 ? 7 : day) // before submit covert 0 to 7  ?????should this be not mday????
              return {
                startTime: f.startTime,
                sla: +f.sla,
                endTime: f.endTime,
                hopId: addFileData.hopId,
                hopName: addFileData.hopName, ///???need hopName??????
                fileCount: +addFileData.fileCount,
                frequencyId: +f.frequencyId,
                allowedDays: [...tempAllowedDays],
                // frequencySpecifierIds: f.frequencySpecifierIds,
                frequencySpecifierIds: f.frequencySpecifierIds.filter((el) => !(!el.id && el.isDeleted === 'Y')),
                monthlyFrequencySpecifierId: f.sfrequencyId,
                monthlyOn: f.monthlyOn,
                //indicator: "M",
                exceptionDay: f.exceptionDay === null ? f.exceptionDay : "" + f.exceptionDay,
                emailIndicator: f.emailIndicator,
                recipients: f.emailIndicator ? f.emailRecipient.filter((el) => el.action !== "NO_UPDATE") : [],
                action: f.action,
                //exceptionDay: ""+f.exceptionDay === "0" ? '7' : ""+f.exceptionDay // this is the change                         
              }
            }
          })
        ]
      }
      // delte direction key from request
      // delete request?.fileInformation?.direction
      const createFileConfigurationResponse = await updateFileAPIs.updateFile(request)
      // console.log("update file request", request);
      // verify the response and then redirect to fileObserverAdmin page
      // currently any change including no change is submitted as success and 
      // the createFileConfigurationResponse is always "no update changes requested" POST API 
      // console.log("createFileConfigurationResponse", createFileConfigurationResponse)
      if (createFileConfigurationResponse.status === "Success") {
        dispatch(submitFile(createFileConfigurationResponse));
        props.history.push('/fileObserverAdmin');
      } else {
        setAddFileData({
          ...addFileData,
          validationFlag: true,
          validationMessage: "After submition failed: The file cannot be added because it has not yet been identified"
        })
      }
    }

  }

  function fieldWarning(tempAddFileData, warningType, type) {
    let fieldValue = warningType === undefined ? tempAddFileData[type] : warningType
    if (type === "aso" || type === "agroup") {
      fieldValue = tempAddFileData.addIncident ? warningType : true
    }
    if (type === "ackSlaTime" || type === "ackSuffix" || type === "ackEndTime") {
      fieldValue = tempAddFileData.fileMonitoring ? warningType : true
    }
    if (fieldValue) {
      tempAddFileData.fileInfoWarning[`${type}Warning`] = false;
    } else {
      tempAddFileData.fileInfoWarning[`${type}Warning`] = true;
    }
  }

  const validateTheForm = () => {
    let frequencyValidation_error = onSubmitFrequencyBloackValidation()

    const { sftAccountNameWarning,
      filePrefixWarning,
      fileSuffixWarning,
      dateMaskWarning,
      dateTimeMaskWarning,
      routeIdWarning,
      hopNameWarning,
      fileCountWarning,
      asoWarning,
      agroupWarning } = addFileData.fileInfoWarning
    let validation_error = false;
    const { producerId,
      fileCount,
      occurence,
      hopName,
      hopId,
      fileMonitoring,
      addIncident } = addFileData
    const { sftAccountName,
      direction,
      fileMask,
      filePrefix,
      fileSuffix,
      dateMask,
      dateTimeMask,
      isDeleted,
      routeId,
      aso,
      agroup, ackSlaTime, ackSuffix, ackEndTime } = addFileData.fileInformation
    let tempAddFileData = {
      ...addFileData,
      fileInformation:
        { ...addFileData.fileInformation },
      fileInfoWarning:
        { ...addFileData.fileInfoWarning },
      frequency:
        [...addFileData.frequency]
    }
    // let fields = ['sftAccountName', 'filePrefix', 'fileSuffix', 'dateMask', 'dateTimeMask', 'routeId', 'hopName', 'fileCount', 'producerId', 'routeId', 'hopName', 'occurence']
    // below changes are only for update
    let fields = ['hopName', 'fileCount', 'occurence', 'aso', 'agroup', 'ackSlaTime', 'ackSuffix', 'ackEndTime']
    fields.forEach(field => fieldWarning(tempAddFileData, addFileData.fileInformation[field], field))

    let addIncidentFieldsValidation = addIncident ? (aso && agroup) : true
    let addFileMonitoringvalidation = fileMonitoring ? (ackSuffix && ackSlaTime && ackEndTime) : true
    validation_error = fileCount && occurence && hopName && addIncidentFieldsValidation && addFileMonitoringvalidation

    let checkIFOverlapToShowErrorMessage = false;
    addFileData.frequency.forEach(fre => {
      checkIFOverlapToShowErrorMessage = fre.startTimeTextWarning
      return !fre.startTimeTextWarning
    })
    // console.log("checkIFOverlapToShowErrorMessage", checkIFOverlapToShowErrorMessage)

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
    dispatch(submitFile({ status: '', message: '' }));
    // // console.log('fileObserverAdmin')
  }

  const addFrequency = () => {
    let addFquency = { ...fqc }
    const tempArr = [];
        // days = 0,1,2,3,4,5,6, sunday=0
        for (let day = 0; day < 7; day++) {
          if((day=== 0 || day === 6))  {
            tempArr.push({
              id: null,
              isDeleted: 'Y',
              isSelected: false,
              frequencySpecifierId: day,
            })
          }else {
            tempArr.push({
              id: null,
              isDeleted: 'N',
              isSelected: true,
              frequencySpecifierId: day,
            })
          }
        }
    if (addFileData.occurence === "DayOfWeekAndTime") {
      delete addFquency.mdays;
      addFquency.frequencyId = frequencyOptions.weekly_FrequencyId;
      addFquency.id = addFileData.frequency.length + 1;
      addFquency.monthlyOnWarning = false;
      addFquency.sfrequencyIdWarning = false;
      addFquency.exceptionDayWarning = false;
      addFquency.action = "ADD";
      addFquency.frequencySpecifierIds= [...tempArr];
    } else {
      addFquency.frequencyId = frequencyOptions.monthly_FrequencyId;
      addFquency.monthlyOn = null;
      addFquency.exceptionDayWarning = true;
      addFquency.id = addFileData.frequency.length + 1
      addFquency.action = "ADD";
      // monthly days is not yet created
    }
    setAddFileData({
      ...addFileData,
      frequency: [
        ...addFileData.frequency,
        addFquency
      ]
    })
  }

  const deleteFrequency = (id) => {
    let freqs = addFileData.frequency.map(f => {
      if (f.id === id) {
        return { ...f, action: "DELETE" };
      }
      return { ...f };
    })
    setAddFileData({
      ...addFileData,
      frequency: [
        ...freqs
      ]
    })
  }

  const updateFrqStartTime = (type, value, id) => {
    let freqs = addFileData.frequency.map(fre => {
      if (fre.id === id) {
        fre[`${type}`] = value
        if (type === "startTime") {
          fre[`${type}Warning`] = !Boolean(value)
          if (id > 1) {
            let parentFre = addFileData.frequency.filter(f => f.id === id - 1)[0]
            // let parentFreSpecifierDays =  parentFre.days
            // let currentFreSpecifierDays =  fre.days
            // let daysIntersection = currentFreSpecifierDays.filter(day => parentFreSpecifierDays.includes(day)).length
            let splitTime = parentFre.startTime.split(":")
            let parentTimeinMin = Number(splitTime[0] * 60) + Number(splitTime[1]) + Number(parentFre.endTime || 0)
            // =====================
            let currentSplitTime = value.split(":")
            let currentTime = Number(currentSplitTime[0] * 60) + Number(currentSplitTime[1])
            // =====================
            // if(currentTime > parentTimeinMin && daysIntersection === 0){
            fre[`${type}TextWarning`] = false
            // } else {
            //   fre[`${type}TextWarning`] = true
            // }
          } else {
            fre[`${type}TextWarning`] = false
          }
        } else if (fre.emailIndicator && type === "emailRecipient") {
          fre[`${type}Warning`] = !Boolean(value && value.length)
          if(!(fre[`${type}Warning`])){
            fre = { ...fre, action: fre.action !== "ADD" ? "UPDATE" : "ADD" }
          }
        }
        else if (fre.emailIndicator && type === "emailIndicator") {
          fre[`${type}Warning`] = !Boolean(value && value.length)
          fre = { ...fre, action: fre.action !== "ADD" ? "UPDATE" : "ADD" }
        }
        else if (type === "monthlyOn") {
          fre[`${type}Warning`] = !Boolean(value)
          if(!(fre[`${type}Warning`])){
            fre = { ...fre, action: fre.action !== "ADD" ? "UPDATE" : "ADD" }
          }
        } else if (type === "sfrequencyId") {
          fre[`${type}Warning`] = !Boolean(value)
          fre = { ...fre, action: fre.action !== "ADD" ? "UPDATE" : "ADD" }
        } else {
          if (type === "sla" && (value <= fre.endTime) && value !== "") {
            fre[`${type}Warning`] = false
            fre.endTimeWarning = false
            fre = { ...fre, action: fre.action !== "ADD" ? "UPDATE" : "ADD" }
          } else if (type === "sla") {
            fre[`${type}Warning`] = true
            fre.endTimeWarning = true
            // fre = {...fre, action: fre.action !== "ADD" ? "UPDATE" : "ADD"} //<-- submit will be blocked so no need to add update
          }
          if (type === "endTime" && fre.sla && (value >= fre.sla)) {
            fre[`${type}Warning`] = false
            fre.slaWarning = false
            fre = { ...fre, action: fre.action !== "ADD" ? "UPDATE" : "ADD" }
          } else if (type === "endTime") {
            fre[`${type}Warning`] = true
            fre.slaWarning = true
            // fre = {...fre, action: fre.action !== "ADD" ? "UPDATE" : "ADD"} //<-- submit will be blocked so no need to add update
          }
          if (type === "exceptionDay") {
            fre[`${type}Warning`] = false
            fre = { ...fre, action: fre.action !== "ADD" ? "UPDATE" : "ADD" }
          }
        }
      }
      return fre;
    })

    setAddFileData({
      ...addFileData,
      frequency: [
        ...freqs
      ]
    })
  }
  const filterByValue = (freqObj, freqDay) => Object.fromEntries(
    Object.entries(freqObj).filter(([key], [value]) => value !== freqDay)
  )

  const updateFrequencyDay = (id, day, type) => {
    const tempfrequencySpecifierIds = JSON.parse(JSON.stringify(day))
    let freqs = addFileData.frequency.map(f => {
      if (f.id === id) {
        return { ...f, action: f.action !== "ADD" ? "UPDATE" : "ADD", frequencySpecifierIds: [...tempfrequencySpecifierIds] };
      }
      return { ...f };
    })
    // console.log(freqs)
    setAddFileData({
      ...addFileData,
      frequency: [
        ...freqs
      ]
    })
  }

  const updateFrequencyMDay = (id, day) => {
    let freqs = addFileData.frequency.map(fre => {
      if (fre.id === id) {
        let days = [...fre.mdays]
        if (days.includes(day)) {
          days = days.filter(d => d !== day)
        } else {
          days.push(day)
        }
        fre.mdays = days
      }
      return fre;
    })
    setAddFileData({
      ...addFileData,
      frequency: [
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

  // // console.log("editData from editFile/index", editData)
  const {
    producerName,
    sftAccountName,
    direction,
    fileMask,
    filePrefix,
    fileSuffix,
    dateMask,
    dateTimeMask,
    routeName,
    fileCount,
    hopName,
    relatedHopList } = editData // props.data;
  const hopNameOptions = relatedHopList.map((hop, i) => ({ "value": hop.hopId, "label": hop.hopName }))


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

  // console.log("add FileData from render component", addFileData);

  let asoOptions = []
  fileTicketOrgGroups.map(fog => {
    if (asoOptions.find(o => o.value === fog.supportOrg)) {
      // console.log("ALREADY PRESENT")
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
  // console.log(asoOptions)
  // const asoOptions = [
  //   {value: 'aso1', label: 'aso1', agroup: [ "aso1group1", "aso1group2", "aso1group3"]},
  //   {value: 'aso2', label: 'aso2', agroup: [ "aso2group1", "aso2group2", "aso2group3"]},
  //   {value: 'aso3', label: 'aso3', agroup: [ "aso3group1", "aso3group2", "aso3group3"]}
  // ]

  const handleFileMonitoringChange = (event) => {
    setAddFileData({
      ...addFileData,
      fileMonitoring: event.target.checked
    })
  }

  const updateTimeInMinutes = (event) => {
    const { name, value } = event.target
    let nonNegative = value >= 0 || value === ''
    let valuetemp = Number(value)
    if (nonNegative && !Number.isNaN(valuetemp)) {
      handleInputAckChange(name, valuetemp)
      // props.updateFrqStartTime(type, value, id)
    } else {
      handleInputAckChange(name, "")
      // props.updateFrqStartTime(type, "", id)      
    }

  }

  let agroupOptions = []
  asoOptions.forEach(r => {
    if (r.value === addFileData.fileInformation.aso) {
      agroupOptions = r.agroup.map(ag => ({ value: ag, label: ag }))
    }
  })
  /* console.log("agroupOptions from handle incident change", agroupOptions);
  const producer = useSelector(selectProducer);
  const producerOptions = useSelector(selectProducerOptions);
  const routeOptions = useSelector(selectRouteOptions);
  const selectedRoute = routeOptions.length ? routeOptions.filter(r=> r.value === addFileData.fileInformation.routeId)[0] : null; // useSelector(selectRoute);
  const hopNameOptions = selectedRoute ? selectedRoute.hopName.map((name, i) => ({ "value": selectedRoute.hopId[i], "label": name })) : []
  const hopIdsOptions =  selectedRoute ? selectedRoute.hopId.map(id => ({ "value": id, "label": id })) : null
  const { tittle, edit } = props

  console.log(props) */
  console.log(addFileData)
  return (
    <div className={classes.container}>
      <div className={classes.container}>
        <div className={classes.allign}>
          <div className={classes.header}>Edit File</div>
          <div className={classes.content}>
            <div className={classes.subheader}>File Information</div>
            <div className={classes.display}>
              <Grid container>
                <div className={classes.flex}>
                  <span className={classes.label}>Producer</span>
                  <div className={classes.read_textFileds}>
                    <span className={classes.readValue}>{producerName}</span>
                  </div>
                </div>
                <div className={classes.flex}>
                  <span className={classes.label}>SFT Account Name</span>
                  <div className={classes.read_textFileds}>
                    <span className={classes.readValue}>{sftAccountName}</span>
                  </div>
                </div>
                <div className={classes.flex}>
                  <span className={classes.label}>Direction</span>
                  <div className={classes.read_textFileds}>
                    {/* <span className={classes.readValue}>Inbound</span> */}
                    <span className={classes.readValue}>{direction ? direction : "Inbound"}</span>

                  </div>
                </div>
                <div className={classes.flex}>
                  <span className={classes.label}>File Mask</span>
                  <div className={classes.read_textFileds}>
                    <span className={classes.readValue}>{fileMask}</span>
                  </div>
                </div>
              </Grid>
              <Grid container>
                <div className={classes.flex}>
                  <span className={classes.label}>Prefix</span>
                  <div className={classes.read_textFileds}>
                    <span className={classes.readValue}>{filePrefix}</span>
                  </div>
                </div>
                <div className={classes.flex}>
                  <span className={classes.label}>Suffix</span>
                  <div className={classes.read_textFileds}>
                    <span className={classes.readValue}>{fileSuffix}</span>
                  </div>
                </div>
                <div className={classes.flex}>
                  <span className={classes.label}>Date Mask</span>
                  <div className={classes.read_textFileds}>
                    <span className={classes.readValue}>{dateMask}</span>
                  </div>
                </div>
                <div className={classes.flex}>
                  <span className={classes.label}>Date Time Mask</span>
                  <div className={classes.read_textFileds}>
                    <span className={classes.readValue}>{dateTimeMask}</span>
                  </div>
                </div>
              </Grid>
              <Grid container>
                <div className={classes.flex}>
                  <span className={classes.label}>Route</span>
                  <div className={classes.read_textFileds}>
                    <span className={classes.readValue}>{routeName}</span>
                  </div>
                </div>
                <div className={classes.switch_style}>
                  <div className={classes.displayFlex}>
                    <span className={classes.label}>Add Incident Ticket ?</span>
                    <Tooltip placement="top"
                      title={<div style={{ padding: "10px", width: "251px", fontSize: '12px' }}>This allows the user to configure a smart IT incident ticket to create when the file misses SLA.</div>} arrow>
                      <InfoOutlinedIcon color="primary" style={{ 'padding-left': "10px" }} fontSize="small" />
                    </Tooltip>
                  </div>
                  <FormControl variant="outlined" error={addFileData.fileInfoWarning.routeIdWarning}>
                    <FormControlLabel
                      style={{ width: 'fit-content' }}
                      value={addFileData.addIncident ? "Yes" : "No"}
                      control={
                        <Switch
                          checked={addFileData.addIncident}
                          // style={{color: 'green'}}
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
                      <FormControl variant="outlined" error={addFileData.fileInfoWarning.asoWarning}>
                        <Select
                          name="aso"
                          value={asoOptions.filter(r => r.value === addFileData.fileInformation.aso)}
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
                      <FormControl variant="outlined" error={addFileData.fileInfoWarning.agroupWarning}>
                        <Select
                          name="agroup"
                          value={agroupOptions.filter(h => h.label === addFileData.fileInformation.agroup)}
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
                    <FormControl variant="outlined" error={false}>
                      <FormControlLabel
                        style={{ display: 'inline-block' }}
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
                  <FormControl variant="outlined" error={addFileData.fileInfoWarning.occurenceWarning}>
                    <FormLabel classes={{ root: classes.label }} component="legend">Occurence</FormLabel>
                    <RadioGroup row aria-label="position" name="position" defaultValue="top" value={addFileData.occurence}
                    // onChange={handleOccuranceChange} //***temporaryly disabled***
                    >
                      <FormControlLabel classes={{ root: classes.label }} value="DayOfWeekAndTime" control={<Radio color="primary" />} label="Weekly" />
                      <FormControlLabel classes={{ root: classes.label }} value="Monthly" control={<Radio color="primary" />} label="Monthly" />
                    </RadioGroup>
                    {addFileData.fileInfoWarning.occurenceWarning && <FormHelperText>its a required Field</FormHelperText>}
                  </FormControl>
                </div>
                <div className={classes.flex}>
                  <FormControl variant="outlined" error={addFileData.fileInfoWarning.hopNameWarning}>
                    <span className={classes.label}>HopName</span>
                    <Select
                      value={hopNameOptions.filter(h => h.label === addFileData.hopName)}
                      options={hopNameOptions}
                      onChange={handleHopNameChange}
                      isLoading={!(hopNameOptions && hopNameOptions.length)}
                      placeholder="HopName"
                    />
                    {addFileData.fileInfoWarning.hopNameWarning && <FormHelperText>its a required Field</FormHelperText>}
                  </FormControl>
                </div>
                {/* <div className={classes.flex}>
                  <span className={classes.label}>HopName</span>
                  <div className={classes.read_textFileds}>
                    <span className={classes.readValue}>{hopName}</span>
                  </div>
                </div> */}
                <div className={classes.flex}>
                  <span className={classes.label}>File count</span>
                  {/* <TextField type="number"/> */}
                  {/* <TextField type="number" name="fileCount" onChange={handleFileCountChange} value={addFileData.fileCount}/> */}
                  <TextField name="fileCount" onChange={handleFileCountChange} value={addFileData.fileCount}
                    error={addFileData.fileInfoWarning.fileCountWarning}
                    helperText={addFileData.fileInfoWarning.fileCountWarning && "its a required Field"} />
                </div>
                {/* <div className={classes.flex}>
                  <span className={classes.label}>File count</span>
                  <div className={classes.read_textFileds}>
                    <span className={classes.readValue}>{fileCount}</span>
                  </div>
                </div> */}
              </Grid>
              {/* {JSON.stringify(addFileData.frequency)} */}
            </div>
            {addFileData.occurence === "DayOfWeekAndTime" &&
              addFileData.frequency.filter(ff => ff.action !== "DELETE").map((freq, index) => {
                // // console.log('coming fro parent', freq)
                  return <Frequency data={freq} deleteFrequency={deleteFrequency}
                    frequncyArray={addFileData.frequency}
                    updateFrqStartTime={updateFrqStartTime}
                    updateFrequencyDay={updateFrequencyDay}
                    updateFrequencyMDay={updateFrequencyMDay}
                    setWarning={setWarning}
                    setTimeWarning={setTimeWarning}
                    warning={warning}
                    index={index}
                    key={index}
                    timeWarning={timeWarning}
                    emailRecipientOptions={emailRecipientOptions}
                  // tempFSDays={tempFSDays}
                  // setTempFSDays={setTempFSDays}
                  />
                }
              )}
            {addFileData.occurence === "Monthly" &&
              addFileData.frequency.filter(ff => ff.action !== "DELETE").map((freq, index) => {
                  return <EditFrequency data={freq} deleteFrequency={deleteFrequency}
                    frequncyArray={addFileData.frequency}
                    updateFrqStartTime={updateFrqStartTime}
                    updateFrequencyDay={updateFrequencyDay}
                    updateFrequencyMDay={updateFrequencyMDay}
                    setWarning={setWarning}
                    setTimeWarning={setTimeWarning}
                    warning={warning}
                    index={index}
                    timeWarning={timeWarning}
                    frequencyOptions={frequencyOptions}
                    emailRecipientOptions={emailRecipientOptions}
                  />
                }
              )}
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
      <CustomErrorDialog open={addFileData.validationFlag} onClose={closeValidationError} severity="error" message={addFileData.validationMessage} />
    </div>
  );
}

export default EditFile;
