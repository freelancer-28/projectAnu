import React, {useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import { selectAdminRawData } from "../../reducers/adminRawData";
import { makeStyles } from '@material-ui/core/styles';
import { selectProducer, selectProducerOptions, selectFrequencyIdsOptions } from "../../reducers/producer";

const useStyles = makeStyles((theme) => ({
  cursorpointer: {
    cursor: 'pointer'
  },
  fileInfoValue:{
    paddingRight: '20px',
    height: '30px',
    'overflow-wrap': 'break-word'
  },
  container: {
    padding: '40px 16px',
    background: '#FFFFFF',
    display: 'flex'
  },
  header: {
    padding: "18px 24px",
    borderBottom: '1px solid lightgray',
    textAlign: 'left',
    font: 'normal normal bold 16px/18px Arial',
    letterSpacing: '0.16px',
    color: '#3E474D',
    opacity: 1,
    display: 'flex',
    justifyContent: 'space-between'
  },
  left_contaner: {
    width: '50%'
  },
  right_contaner: {
    width: '50%',
    border: '1px solid lightgray',
    height: '100%'
  },
  fileInfo: {
    margin: '32px',
    borderBottom: '1px solid lightgray'
  },
  fileInfo_header: {
    textAlign: 'left',
    font: 'normal normal bold 18px/21px Arial',
    letterSpacing: '0.16px',
    color: '#3E474D',
    opacity: 1,
    display: 'flex',
    justifyContent: 'space-between'
  },
  fileInfo_box: {
    width: '33%',
    paddingTop: '24px',
    paddingBottom: '24px',
    textAlign: 'left',
    font: 'normal normal normal 14px/16px Arial',
    letterSpacing: '0.16px',
    color: '#263238',
    opacity: 1
  },
  fileInfo_box_header: {
    color: '#687681',
    marginBottom: '10px',
    font: 'normal normal bold 14px/16px Arial'
  },
  fileInfoContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  frequncies: {
    border: '1px solid #D1D5D9',
    marginTop: '20px'
  },
  frequnciesCount: {
    font: 'normal normal bold 14px/25px Arial',
    letterSpacing: '0px',
    color: '#3E474D',
    backgroundColor: '#D1D5D9',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px'
  },
  frequencyInfoContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '10px'
  },
}));



const FileDetails = (props) => {

  const frequencyOptions = useSelector(selectFrequencyIdsOptions);
  const [details, setDetails] = useState({})
  const days = { 1 : 'S',
                   2 : 'M', 
                    3 : 'T', 
                    4 : 'W', 
                    5 : 'T', 
                     6 : 'F', 
                      7 : 'S'}
  const data = useSelector(selectAdminRawData);
  useEffect(() => {
    let temp = window.location.pathname.split('/')
    const rowID = temp[temp.length-1]
    console.log(rowID)
    console.log(data)
    setDetails(data.filter(d => d.producerFileId == rowID)[0])
  }, [data])
  
  const classes = useStyles();

  const closeDetailsPage = () => {
    props.history.push('/fileObserverAdmin')
  }
  console.log(details)

  let daysToPrint = details && details.frequencySpecifierIds ? details.frequencySpecifierIds.map(day=> days[day]) : []
  console.log(daysToPrint)
  return (
    <div>
    { details ?
    <div className={classes.container}>
      <div className={classes.left_contaner}></div>
      <div className={classes.right_contaner}>
        <div className={classes.header}>
          <span>File Details</span>
          <span className={classes.cursorpointer} onClick={closeDetailsPage}>X</span>
        </div>
        <div className={classes.fileInfo}>
          <div className={classes.fileInfo_header}>FileInformation</div>
          <div className={classes.fileInfoContainer}>
            <div className={classes.fileInfo_box}>
              <div className={classes.fileInfo_box_header}>Producer</div>
              <div className={classes.fileInfoValue}>{details.producerName}</div>
            </div>
            <div className={classes.fileInfo_box}>
              <div className={classes.fileInfo_box_header}>SFT Account Name</div>
              <div className={classes.fileInfoValue}>{details.sftAccountName}</div>
            </div>
            <div className={classes.fileInfo_box}>
              <div className={classes.fileInfo_box_header}>Direction</div>
              <div className={classes.fileInfoValue}>{details.direction}</div>
            </div>
            <div className={classes.fileInfo_box}>
              <div className={classes.fileInfo_box_header}>File Mask</div>
              <div className={classes.fileInfoValue}>{details.fileMask}</div>
            </div>
            <div className={classes.fileInfo_box}>
              <div className={classes.fileInfo_box_header}>Prefix</div>
              <div className={classes.fileInfoValue}>{details.filePrefix}</div>
            </div>
            <div className={classes.fileInfo_box}>
              <div className={classes.fileInfo_box_header}>Suffix</div>
              <div className={classes.fileInfoValue}>{details.fileSuffix}</div>
            </div>
            <div className={classes.fileInfo_box}>
              <div className={classes.fileInfo_box_header}>Date Mask</div>
              <div className={classes.fileInfoValue}>{details.dateMask}</div>
            </div>
            <div className={classes.fileInfo_box}>
              <div className={classes.fileInfo_box_header}>Date Time Mask</div>
              <div className={classes.fileInfoValue}>{details.dateTimeMask}</div>
            </div>
            <div className={classes.fileInfo_box}>
              <div className={classes.fileInfo_box_header}>Route</div>
              <div className={classes.fileInfoValue}>{details.routeName}</div>
            </div>
          </div>
        </div>
        <div className={classes.fileInfo}>
          <div className={classes.fileInfo_header}>Frequency</div>
          <div className={classes.fileInfoContainer}>
            <div className={classes.fileInfo_box}>
              <div className={classes.fileInfo_box_header}>Occurance</div>
              <div>{details.frequencyId == frequencyOptions.weekly_FrequencyId ? "Weekly" : "Monthly"}</div>
            </div>
            <div className={classes.fileInfo_box}>
              <div className={classes.fileInfo_box_header}>Hop ID</div>
              <div>{details.hopId}</div>
            </div>
            <div className={classes.fileInfo_box}>
              <div className={classes.fileInfo_box_header}>File Count</div>
              <div>{details.fileCount}</div>
            </div>
          </div>
          <div className={classes.frequncies}>
            <div className={classes.frequnciesCount}>
              <div>Frquency # 1111</div>
              {/* <div>Days M, T, W, T, F</div> */}
              <div>Days {daysToPrint.toString()}</div>
            </div>
            <div className={classes.frequencyInfoContainer}>
              <div className={classes.fileInfo_box}>
                <div className={classes.fileInfo_box_header}>Start Time</div>
                <div>{details.startTime}</div>
              </div>
              <div className={classes.fileInfo_box}>
                <div className={classes.fileInfo_box_header}>SLA</div>
                <div>{details.slaTime}</div>
              </div>
              <div className={classes.fileInfo_box}>
                <div className={classes.fileInfo_box_header}>End Time</div>
                <div>{details.endTime}</div>
              </div>
            </div>
            
          </div>
          
          {/* <div className={classes.frequncies}>
            <div className={classes.frequnciesCount}>
              <div>Frquency # 2</div>
              <div>Days M, T, W, T, F</div>
            </div>
            <div className={classes.frequencyInfoContainer}>
              <div className={classes.fileInfo_box}>
                <div className={classes.fileInfo_box_header}>Start Time</div>
                <div>10:00 AM</div>
              </div>
              <div className={classes.fileInfo_box}>
                <div className={classes.fileInfo_box_header}>SLA</div>
                <div>10:00 AM</div>
              </div>
              <div className={classes.fileInfo_box}>
                <div className={classes.fileInfo_box_header}>End Time</div>
                <div>10:00 AM</div>
              </div>
            </div>
            
          </div> */}

        </div>
      </div>
    </div> :
    <div>no detrails</div>}
    </div>
  );
}

export default FileDetails;
