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

function Frequency() {

  const classes = useStyles();
  return (
    <div>
      <div className={classes.frequency_box}>
      <div className={classes.frequency_header}>
        <div>Frequency#1</div>
        <div>
          D
          {/* <FontAwesomeIcon icon="fa-trash-o" /> */}
          {/* <i class="fa fa-trash-o" aria-hidden="true"></i> */}
        </div>
      </div>
      <div className={classes.frequency_subbox}>
        <div className={classes.flexrow}>
          <div className={classes.frequency_header1}>Day(s)</div>
          <div>
          <Button className={classes.weekdays_unselected_btn} variant="contained" color="primary">
            S
          </Button>
          <Button className={classes.weekdays_btn} variant="contained" color="primary">
            M
          </Button>
          <Button className={classes.weekdays_btn} variant="contained" color="primary">
            T
          </Button>
          <Button className={classes.weekdays_btn} variant="contained" color="primary">
            W
          </Button>
          <Button className={classes.weekdays_btn} variant="contained" color="primary">
            T
          </Button>
          <Button className={classes.weekdays_btn} variant="contained" color="primary">
            F
          </Button>
          <Button className={classes.weekdays_unselected_btn} variant="contained" color="primary">
            S
          </Button>
          </div>
        </div>
        <div className={classes.divider}></div>
        <div>
        <Grid container>
              <div className={classes.flex}>
                <span className={classes.label}>Start Time</span>
                <TextField className={classes.root} label="" variant="outlined" />
              </div>
              <div className={classes.flex}>
                <span className={classes.label}>SLA</span>
                <TextField className={classes.root} label="" variant="outlined" />
              </div>
              <div className={classes.flex}>
                <span className={classes.label}>End Time</span>
                <TextField className={classes.root} label="" variant="outlined" />
              </div>
            </Grid>
        </div>
      </div>
    </div>
      <div className={classes.divider_alt}></div>
    </div>
  );
}

export default Frequency;
