import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Album from '../pages/Album/Album';
import Navbar from '../components/Navbar';

const Router = () => {
  return (
    <>
      <header className="h-20">
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/albums/:id" element={<Album />} />
      </Routes>
    </>
  );
}

export default Router;