import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Heroes from "./pages/Heroes";
import Nominate from "./pages/NominationForm";
import ViewCard from "./pages/ViewCard";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuthStatus } from "./store/slices/AuthSlice";
import {  fetchUserThanks } from './store/slices/heroesSlice';
import UserProfile from "./components/Auth/UserProfile";


const App = () => {
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
    dispatch(fetchUserThanks())
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
  
          <Routes>


            <Route 
              path="/" 
            element={
          
                <Heroes/>
          } 
            />

            {/* Public routes (only for guests) */}
            <Route
             path="/login" 
             element={
              <ProtectedRoute requireAuth={false}> 
               <Login />
             </ProtectedRoute>

             } />
            <Route
             path="/register"
              element={
                <ProtectedRoute requireAuth={false}> 
                 <Register />
              </ProtectedRoute>
              } />


          {/* only log in routtes */}
            <Route
             path="/profile" 
             element={
              <ProtectedRoute requireAuth={true}> 
             <UserProfile />
             </ProtectedRoute>
             } />
         
            <Route
             path="/nominate"
              element={
              <ProtectedRoute requireAuth={true}> 
              <Nominate/>
              </ProtectedRoute>
              } />

            <Route 
            path="/hero/:id" 
            element=
            {
            <ProtectedRoute requireAuth={true}> 
            <ViewCard/>
            </ProtectedRoute>

            } />
          </Routes>
      </main>
      {/* <Footer /> */}
      <Footer />
    </div>
  );
};

export default App;