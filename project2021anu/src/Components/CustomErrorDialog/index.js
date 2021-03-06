import React, { useState, useEffect, useRef } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomErrorDialog = (props) => {

 return (
    <Snackbar open={props.open}
              onClose={props.onClose}
              autoHideDuration={6000}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}

                >
        <Alert severity={props.severity}
        action={
            <React.Fragment>
              <IconButton
                aria-label="close"
                color="inherit"
              //   className={classes.close}
                onClick={props.onClose}
              >
                <CloseIcon />
              </IconButton>
            </React.Fragment>
          }>
            {props.message}
        </Alert>
    </Snackbar>
);
}

export default CustomErrorDialog;



// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Snackbar from '@material-ui/core/Snackbar';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';

// const useStyles = makeStyles((theme) => ({
//   close: {
//     padding: theme.spacing(0.5),
//   },
// }));

// export default function CustomErrorDialog(props) {
//   const [snackPack, setSnackPack] = React.useState([]);
//   const [open, setOpen] = React.useState(false);
//   const [messageInfo, setMessageInfo] = React.useState(undefined);

//   React.useEffect(() => {
//     if (snackPack.length && !messageInfo) {
//       // Set a new snack when we don't have an active one
//       setMessageInfo({ ...snackPack[0] });
//       setSnackPack((prev) => prev.slice(1));
//       setOpen(true);
//     } else if (snackPack.length && messageInfo && open) {
//       // Close an active snack when a new one is added
//       setOpen(false);
//     }
//   }, [snackPack, messageInfo, open]);

//   const handleClick = (message) => () => {
//     setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
//   };

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpen(false);
//   };

//   const handleExited = () => {
//     setMessageInfo(undefined);
//   };

//   const classes = useStyles();
//   return (
//     <div>
//       <Button onClick={handleClick('Message A')}>Show message A</Button>
//       <Button onClick={handleClick('Message B')}>Show message B</Button>
//       <Snackbar
//         onClose={props.onClose}
//         autoHideDuration={6000}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         key={messageInfo ? messageInfo.key : undefined}
//         open={props.open}
//         onClose={handleClose}
//         onExited={handleExited}
//         message={messageInfo ? messageInfo.message : undefined}
//         action={
//           <React.Fragment>
//             <Button color="secondary" size="small" onClick={handleClose}>
//               UNDO
//             </Button>
//             <IconButton
//               aria-label="close"
//               color="inherit"
//               className={classes.close}
//               onClick={handleClose}
//             >
//               <CloseIcon />
//             </IconButton>
//           </React.Fragment>
//         }
//       />
//     </div>
//   );
// }