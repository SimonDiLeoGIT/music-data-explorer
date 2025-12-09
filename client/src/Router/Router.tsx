import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Album from '../pages/Album/Album';
import Navbar from '../components/global/Navbar';
import Playlist from '../pages/Playlist/Playlist';

const Router = () => {
  return (
    <>
      <header className="h-20">
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/albums/:id" element={<Album />} />
        <Route path="/playlists/:id" element={<Playlist />} />
      </Routes>
    </>
  );
}

export default Router;