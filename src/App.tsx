import React, { useState, createContext, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import AllGalleries from './pages/AllGalleries';
import Registration from './pages/Registration';
import Tests from './pages/Tests';
import Timeline from './pages/Timeline';
import Announcements from './pages/Announcements';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import About from './pages/About';
import Events from './pages/Events';
import FAQ from './pages/FAQ';
import type { User } from './types';

// Loading fallback component
const Loading: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-blue"></div>
  </div>
);

// User context for auth simulation
export const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({ user: null, setUser: () => {} });

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <div className="min-h-screen bg-white flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/all-galleries" element={<AllGalleries />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/tests" element={<Tests />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<Events />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;