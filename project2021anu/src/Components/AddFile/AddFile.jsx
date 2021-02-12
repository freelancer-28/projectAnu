import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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
    display: 'flex'
  },
  padding: {
    padding: '16px 16px 16px 0px'
  },
  root: {
    '& .MuiOutlinedInput-root': {
      // margin: theme.spacing(1),
      width: '262px',
      height: '36px'
    }
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
  form_btn_space : {
    marginRight: '20px'
  },
  frequency_box : {
    width: '95%',
    height: '200px',
    border: '1px solid lightgray',
    padding: '16px',
    marginBottom: '16px'
  }
}));

function AddFile() {

  const classes = useStyles();
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
                <TextField className={classes.root} label="" variant="outlined" />
              </div>
              <div className={classes.flex}>
                <span className={classes.label}>SFT Account Name</span>
                <TextField className={classes.root} label="" variant="outlined" />
              </div>
              <div className={classes.flex}>
                <span className={classes.label}>Direction</span>
                <TextField className={classes.root} label="" variant="outlined" />
              </div>
              <div className={classes.flex}>
                <span className={classes.label}>File Mask</span>
                <TextField className={classes.root} label="" variant="outlined" />
              </div>
              <div className={classes.flex}>
                <span className={classes.label}>Prefix</span>
                <TextField className={classes.root} label="" variant="outlined" />
              </div>
              <div className={classes.flex}>
                <span className={classes.label}>Suffix</span>
                <TextField className={classes.root} label="" variant="outlined" />
              </div>
              <div className={classes.flex}>
                <span className={classes.label}>Date Mask</span>
                <TextField className={classes.root} label="" variant="outlined" />
              </div>
              <div className={classes.flex}>
                <span className={classes.label}>Date Time Mask</span>
                <TextField className={classes.root} label="" variant="outlined" />
              </div>
              <div className={classes.flex}>
                <span className={classes.label}>Route</span>
                <TextField className={classes.root} label="" variant="outlined" />
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
                <TextField className={classes.root} label="" variant="outlined" />
              </div>
              <div className={classes.flex}>
                <span className={classes.label}>File count</span>
                <TextField className={classes.root} label="" variant="outlined" />
              </div>
            </Grid>
          </div>
          <div className={classes.frequency_box}>
            Frquency #1
           </div>
           <div className={classes.frequency_box}>
            Frquency #2
           </div>
        </div>
      </div>
    </div>
    <div className={classes.formaddfile}>
      <Button className={classes.form_btn_space} variant="outlined" color="primary">
        Cancel
      </Button>
      <Button variant="contained">Submit</Button>
    </div>
    </div>
  );
}

export default AddFile;
