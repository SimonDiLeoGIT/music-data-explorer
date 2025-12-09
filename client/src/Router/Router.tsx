import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/global/Navbar';
import Home from '../pages/Home/Home';
import Album from '../pages/Album/Album';
import Playlist from '../pages/Playlist/Playlist';
import Artist from '../pages/Artist/Artist';


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
        <Route path="/artists/:id/" element={<Artist />} />
      </Routes>
    </>
  );
}

export default Router;