import "./App.css";
import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";

// Import pages
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import Breakfast from "./pages/genre/Breakfast";
import Bread from "./pages/genre/Bread";
import Mains from './pages/genre/Mains';
import Sides from './pages/genre/Sides';
import Sweets from './pages/genre/Sweets';
import Login from './pages/Login';
import MyProfile from './pages/profile/MyProfile';
import Logout from './pages/Logout';
import Signup from './pages/Signup';

const httpLink = createHttpLink({
  uri: "http://localhost:5174/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/breakfast" element={<Breakfast />} />
            <Route path="/bread" element={<Bread />} />
            <Route path="/mains" element={<Mains />} />
            <Route path="/sides" element={<Sides />} />
            <Route path="/sweets" element={<Sweets />} />
            <Route path="/login" element={<Login />} />
            <Route path="/recipe/:recId" element={<Recipe />} />
            <Route path="/myprofile" element={ <MyProfile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
