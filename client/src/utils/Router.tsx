import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Album from '../pages/Album/Album';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/albums/:id" element={<Album />} />
    </Routes>
  );
}

export default Router;