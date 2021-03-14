import React from "react";
import { Route, Switch } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
//import GroupInventory from "./containers/GroupInventory/index";
//import ConsumerInventory from "./containers/ConsumerInventory/index";
// import Login from './containers/Login/index';
// import InventoryMenu from './containers/Inventory/index';
// import { RouterRounded } from "@material-ui/icons";
import HomeMenu from './Components/HomeMenu';
// import FileObserver from './Components/FileObserver'
import AdminTool from './Components/AdminTool'
import EditFile from './Components/EditFile/EditFile'
import AddFile from './Components/AddFile/AddFile'

const Main = () => {
  return (
    <Typography variant="h6" component="div" style={{ padding: 8 * 3, textAlign: 'left' }}>
    </Typography>
  )
}


const ComingSoon = () => (
    <h1 style={{ textAlign: 'center', color: 'darkcyan' }}>Coming soon!!</h1>
  );
  const Routes = () => {
    return (
      <Switch>
        <Route exact path="/" component={HomeMenu} />
        {/* <Route path="/home" component={HomeMenu} /> */}
        {/* <Route path="/reconFramework" component={ComingSoon} /> */}
        {/* <Route path="/fileObserver" component={FileObserver} /> */}
        <Route  path="/fileObserverAdmin" component={AdminTool} />
        <Route path="/editfile" component={EditFile} />
        <Route path="/addfile" component={AddFile} />
      </Switch>
    );
  };
  
  export default Routes;
  