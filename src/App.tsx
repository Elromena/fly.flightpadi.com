import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.tsx';
import MainSearch from './pages/MainSearch.tsx';
import SearchResults from './pages/SearchResults.tsx';
import Booking from './pages/Booking.tsx';
import BookingSuccess from './pages/BookingSuccess.tsx';
import BookingFailure from './pages/BookingFailure.tsx';
import VerifyPayment from './pages/VerifyPayment.tsx';
import Footer from './components/Footer.tsx';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<MainSearch />} />
          <Route path="/results" element={<SearchResults />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/verify" element={<VerifyPayment />} />
          <Route path="/booking/success" element={<BookingSuccess />} />
          <Route path="/booking/failure" element={<BookingFailure />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App