import React, { useEffect } from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";

import LoginPage from "../LoginPage/LoginPage";
import ListView from "../ListView/ListView";
import MapView from "../MapView/MapView";
import OptionsPage from "../OptionsPage/OptionsPage";
import OrgInfo from "../OrgInfo/OrgInfo";
import AddOrgPage from "../AddOrgPage/AddOrgPage";

import "./App.css";
import OrgInfoEdit from "../OrgInfo/OrgInfoEdit";

import AdminPage from "../AdminPage/AdminPage";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (user.id) {
      dispatch({ type: "FETCH_ORGANIZATIONS" });
      dispatch({ type: "FETCH_LOSSES" });
      dispatch({ type: "FETCH_SERVICES" });
    } else {
      dispatch({ type: "FETCH_USER" });
    }
  }, [dispatch, user]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from="/" to="/home" />
          {/* Visiting localhost:5173/about will show the about page. */}
          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /home page
              <AboutPage />
            ) : (
              // Otherwise, show the Login page
              <LoginPage />
            )}
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}

          {/* Route for MapView */}
          <ProtectedRoute exact path="/map">
            <MapView />
          </ProtectedRoute>
          {/* Route for ListView */}
          <ProtectedRoute exact path="/list">
            <ListView />
          </ProtectedRoute>
          {/* Route for AddOrg */}
          <ProtectedRoute exact path="/addorg">
            <AddOrgPage />
          </ProtectedRoute>
          {/* Route for OptionsPage */}
          <ProtectedRoute exact path="/options">
            <OptionsPage />
          </ProtectedRoute>
          {/* Route for OrgInfo */}
          <ProtectedRoute exact path="/org/:id">
            <OrgInfo />
          </ProtectedRoute>
          {/* Route for Editing OrgInfo */}
          <ProtectedRoute exact path="/orgedit/:id">
            <OrgInfoEdit />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/admin"
          >
            {user.is_admin && <AdminPage />}
          </ProtectedRoute>
          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/home" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
