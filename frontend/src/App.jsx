import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Hostels from "./pages/Hostels";
import Institutes from "./pages/Institutes";
import Hospitals from "./pages/Hospitals";
import Libraries from "./pages/Libraries";
import BookingForm from "./pages/BookingForm";
import MyBookings from "./pages/MyBookings";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/:city/home" element={<Home />} />   {/* ✅ add this */}
          <Route path="/login" element={<Login />} />
          <Route path="/:city/hostels" element={<Hostels />} />
          <Route path="/:city/institutes" element={<Institutes />} />
          <Route path="/:city/libraries" element={<Libraries />} />
          <Route path="/:city/hospitals" element={<Hospitals />} />
          <Route path="/book-hostel/:id" element={<BookingForm />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/mybookings" element={<MyBookings />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;




