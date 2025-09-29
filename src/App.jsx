import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
// import Register from "./pages/Register";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Heroes from "./pages/Heroes";
import Nominate from "./pages/Nominate";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
  
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Register />} /> */}

            <Route path="/heroes" element={<Heroes/>} />
            <Route path="/nominate" element={<Nominate/>} />
          </Routes>
      </main>
      {/* <Footer /> */}
      <Footer />
    </div>
  );
};

export default App;