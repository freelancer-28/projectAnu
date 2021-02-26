import react, {useEffect, useState} from 'react';
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
import Frequency from '../Frequency/Frequency'
import Select from '../Select'
import TextField from '../TextField'
import {
  updateProducer,
  updateProducerOptions,
  updateFileMask,
  submitFile,
  updateRoute,
  updateRouteOptions
} from "../../actions";
import filtersAPIs from "../../apis/FileObserver/filters";
import addFileAPIs from "../../apis/AdminTools/addFile";

import { selectProducer, selectProducerOptions } from "../../reducers/producer";
import { selectRoute, selectRouteOptions } from '../../reducers/route';

const useStyles = makeStyles((theme) => ({
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
    width: '70%'
  },
  right_contaner: {
    width: '30%',
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



function FileDetails(props) {

  const classes = useStyles();

  console.log(props)
  return (
    <div className={classes.container}>
      <div className={classes.left_contaner}></div>
      <div className={classes.right_contaner}>
        <div className={classes.header}>
          <span>File Details</span>
          <span>X</span>
        </div>
        <div className={classes.fileInfo}>
          <div className={classes.fileInfo_header}>FileInformation</div>
          <div className={classes.fileInfoContainer}>
            <div className={classes.fileInfo_box}>
              <div className={classes.fileInfo_box_header}>Producer</div>
              <div>Test</div>
            </div>
            <div className={classes.fileInfo_box}>
              <div className={classes.fileInfo_box_header}>SFT Account Name</div>
              <div>15884</div>
            </div>
            <div className={classes.fileInfo_box}>
              <div className={classes.fileInfo_box_header}>Direction</div>
              <div>Test</div>
            </div>
            <div className={classes.fileInfo_box}>
              <div className={classes.fileInfo_box_header}>File Mask</div>
              <div>Test</div>
            </div>
            <div className={classes.fileInfo_box}>
              <div className={classes.fileInfo_box_header}>Prefix</div>
              <div>15884</div>
            </div>
            <div className={classes.fileInfo_box}>
              <div className={classes.fileInfo_box_header}>Suffix</div>
              <div>Test</div>
            </div>
            <div className={classes.fileInfo_box}>
              <div className={classes.fileInfo_box_header}>Date Mask</div>
              <div>Test</div>
            </div>
            <div className={classes.fileInfo_box}>
              <div className={classes.fileInfo_box_header}>Date Time Mask</div>
              <div>15884</div>
            </div>
            <div className={classes.fileInfo_box}>
              <div className={classes.fileInfo_box_header}>Route</div>
              <div>PSP Route RBMS Route</div>
            </div>
          </div>
        </div>
        <div className={classes.fileInfo}>
          <div className={classes.fileInfo_header}>Frequency</div>
          <div className={classes.fileInfoContainer}>
            <div className={classes.fileInfo_box}>
              <div className={classes.fileInfo_box_header}>Occurance</div>
              <div>Test</div>
            </div>
            <div className={classes.fileInfo_box}>
              <div className={classes.fileInfo_box_header}>Hop ID</div>
              <div>Test</div>
            </div>
            <div className={classes.fileInfo_box}>
              <div className={classes.fileInfo_box_header}>File Count</div>
              <div>Test</div>
            </div>
          </div>
          <div className={classes.frequncies}>
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
            
          </div>
          
          <div className={classes.frequncies}>
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
            
          </div>

        </div>
      </div>
    </div>
  );
}

export default FileDetails;
