import Home from "./components/Home";
import { Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";

import "./App.css";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
    </Switch>
  );
};

export default App;
