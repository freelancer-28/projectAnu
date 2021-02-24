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
  }
}));

const directionOptions = [
  {
    "value": "LEFT",
    "label": "LEFT"
  },
  {
    "value": "RIGHT",
    "label": "RIGHT"
  }
]
// const routeOptions= [
//   {
//     "value": "route1",
//     "label": "route1"
//   },
//   {
//     "value": "route2",
//     "label": "route2"
//   }
// ]

function AddFile(props) {

  const [addFileData, setAddFileData] = useState({
    producer: null,
    sftAccountName: "",
    direction: null,
    fileMask: "",
    prefix: "",
    siffux: "",
    dateMask: "",
    dateTimeMask: "",
    route: null,
    frequency: {
      occurence: null,
      hopId: null,
      fileCount: null,
      frequencies: [
        {
          days: [],
          startTime: null,
          sla: null,
          endTime: null
        }
      ]

    }
  })

  const dispatch = useDispatch();
  const classes = useStyles();
  const producer = useSelector(selectProducer);
  const route = useSelector(selectRoute);
  const producerOptions = useSelector(selectProducerOptions);
  const routeOptions = useSelector(selectRouteOptions);

  useEffect(() => {
    fetchProducerFiltersFromServer();
    return () => { console.log('useEffectProps', props) }
  }, []);

  const handleProducerChange = (data) => {
    // setProducer(data);
    dispatch(updateProducer(data));
    dispatch(updateFileMask(''));
  };

  const fetchProducerFiltersFromServer = async () => {
    dispatch(updateProducerOptions([]))
    dispatch(updateRouteOptions([]));
    const data = await filtersAPIs.fetchProducerOptions();
    const producerOptions = data.name.map(d=>({
        value: d,
        label: d
      }))
    console.log(producerOptions)
    const routeOptions = data.route.map(d=>({
      value: d.routeId,
      label: d.displayName
    }))
    console.log(routeOptions)

    dispatch(updateProducerOptions(producerOptions));
    dispatch(updateRouteOptions(routeOptions))
  };

  const handleInputChange = event => {
    const {name, value} =  event.target
    setAddFileData({
      ...addFileData,
      [name]: value
    })
  }

  const handleDirectionChange = data => {
    setAddFileData({
      ...addFileData,
      direction: data.value
    })
  }

  const handleRouteChange = data => {
    dispatch(updateRoute(data));
    setAddFileData({
      ...addFileData,
      route: data.value
    })
  }
  
  const onAddFileSubmit = async () => {
    console.log("+++++++++++++++++++++++++++++++++++++")
    // dispatch(submitFile(addFileData));
    await addFileAPIs.addFile(addFileData)
  }

  // console.log(addFileData)
  console.log(props)
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
                  <Select 
                    value={producer}
                    options={producerOptions}
                    onChange={handleProducerChange}
                    isLoading={!(producerOptions && producerOptions.length)}
                    placeholder="Producer"
                  />
                </div>
                <div className={classes.flex}>
                  <span className={classes.label}>SFT Account Name</span>
                  <TextField name="sftAccountName" onChange={handleInputChange} value={addFileData.sftAccountName} />
                </div>
                <div className={classes.flex}>
                  <span className={classes.label}>Direction</span>
                  <Select
                   value={addFileData.direction}
                   options={directionOptions}
                   onChange={handleDirectionChange}
                   isLoading={!(directionOptions && directionOptions.length)}
                   placeholder="Direction"
                  />
                </div>
                <div className={classes.flex}>
                  <span className={classes.label}>File Mask</span>
                  <TextField name="fileMask" onChange={handleInputChange} value={addFileData.fileMask} />
                </div>
              </Grid>
              <Grid container>
                <div className={classes.flex}>
                  <span className={classes.label}>Prefix</span>
                  <TextField name="prefix" onChange={handleInputChange} value={addFileData.prefix}/>
                </div>
                <div className={classes.flex}>
                  <span className={classes.label}>Suffix</span>
                  <TextField name="suffix" onChange={handleInputChange} value={addFileData.suffix}/>
                </div>
                <div className={classes.flex}>
                  <span className={classes.label}>Date Mask</span>
                  <TextField name="dateMask" onChange={handleInputChange} value={addFileData.dateMask}/>
                </div>
                <div className={classes.flex}>
                  <span className={classes.label}>Date Time Mask</span>
                  <TextField name="dateTimeMask" onChange={handleInputChange} value={addFileData.dateTimeMask}/>
                </div>
              </Grid>
              <Grid container>
                <div className={classes.flex}>
                  <span className={classes.label}>Route</span>
                  <Select
                   name="route"
                   value={route}
                   options={routeOptions}
                   onChange={handleRouteChange}
                   isLoading={!(routeOptions && routeOptions.length)}
                   placeholder="Route"
                  />
                </div>
              </Grid>
            </div>
          </div>
          <div className={classes.subcontent}>
            <div className={classes.header}>Frequency</div>
            <div>
              <Grid container>
                <div className={classes.padding}>
                  <FormLabel classes={{ root: classes.label }} component="legend">Occurence</FormLabel>
                  <RadioGroup row aria-label="position" name="position" defaultValue="top">
                    <FormControlLabel classes={{ root: classes.label }} value="Weekly" control={<Radio color="primary" />} label="Weekly" />
                    <FormControlLabel classes={{ root: classes.label }} value="Monthly" control={<Radio color="primary" />} label="Monthly" />
                  </RadioGroup>
                </div>
                <div className={classes.flex}>
                  <span className={classes.label}>Hop ID</span>
                  <TextField />
                </div>
                <div className={classes.flex}>
                  <span className={classes.label}>File count</span>
                  <TextField />
                </div>
              </Grid>
            </div>
            <Frequency />
            <Frequency />
            <Button className={classes.form_btn_space} variant="outlined">+ Add Frequency</Button>
          </div>
        </div>
      </div>
      <div className={classes.formaddfile}>
        <Button className={classes.form_btn_space} variant="outlined" color="primary">
          Cancel
      </Button>
        <Button onClick={onAddFileSubmit} variant="contained">Submit</Button>
      </div>
    </div>
  );
}

export default AddFile;
