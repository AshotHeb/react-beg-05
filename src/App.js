import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Route, Switch, Redirect } from 'react-router-dom';
//Pages
import ToDo from './Components/pages/ToDo/ToDo';
import Contact from './Components/pages/Contact/Contact';
import About from './Components/pages/About/About';
import NotFound from './Components/pages/NotFound/NotFound';
import SingleTask from './Components/pages/SingleTask/SingleTask';
import ContactContextProvider from './Context/ContactPageContext';



const pages = [
  {
    path: "/",
    Component: ToDo
  },
  {
    path: "/contact",
    Component: Contact,
    Provider: ContactContextProvider
  },
  {
    path: "/about",
    Component: About
  },
  {
    path: "/task/:id",
    Component: SingleTask
  },
  {
    path: "/404",
    Component: NotFound
  },


]

class App extends Component {
  state = {
    isHooksPage: true
  }
  render() {
    const pageRoutes = pages.map((page, index) => {
      const { Provider, Component } = page;
      return <Route
        key={index}
        path={page.path}
        render={(props) => {
          return (
            Provider ? <Provider>
              <Component {...props} />
            </Provider> :
              <Component {...props} />
          );
        }}
        exact
      />
    });


    return (
      <div className="App" >
        <Navbar />
        <Switch>
          {pageRoutes}
          <Redirect to="/404" />
        </Switch>
      </div>
    )
  }
}





export default App;
