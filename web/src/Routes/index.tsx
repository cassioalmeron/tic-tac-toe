import { Routes as RoutesDom, Route } from 'react-router-dom';
import About from '../pages/About';
import Home from '../pages/Home';

export default function Routes() {
  return (
    <RoutesDom>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </RoutesDom>
  );
}
