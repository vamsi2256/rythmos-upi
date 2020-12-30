import {BrowserRouter,Route,Switch} from 'react-router-dom'
import LoginComponent from './components/LoginComponent'
import RegisterComponent from './components/RegisterComponent'
import MenuComponent1 from './components/MenuComponent'
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            <Route path="/" exact component={LoginComponent}/>
            <Route path="/Register" component={RegisterComponent}/>
            <Route path="/menu" component={MenuComponent1}/>
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
