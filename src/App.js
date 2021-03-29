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

// import ReduxDemo from './Demo/Redux';
import ReduxDemo2 from './Demo/Redux2';





const pages = [
  {
    path: "/",
    component: ToDo
  },
  {
    path: "/contact",
    component: Contact
  },
  {
    path: "/about",
    component: About
  },
  {
    path: "/task/:id",
    component: SingleTask
  },
  {
    path: "/404",
    component: NotFound
  },


]

class App extends Component {
  state = {
    isHooksPage: true
  }
  render() {
    const pageRoutes = pages.map((page, index) => {
      if (page.path === "/contact") {
        return <Route
          path={page.path}
          exact
          key={index}
          render={(props) => {
            return (
              <ContactContextProvider>
                {<page.component {...props} />}
              </ContactContextProvider>
            );
          }}
        />
      }

      return <Route
        key={index}
        path={page.path}
        component={page.component}
        exact
      />
    });



    return (
      <div className="App">
        {/* <Navbar />
        <Switch>
          {pageRoutes}
          <Redirect to="/404" />
        </Switch> */}

        <ReduxDemo2 />
      </div>
    )
  }
}





export default App;
