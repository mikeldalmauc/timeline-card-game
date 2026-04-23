import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CardView from "./pages/CardView";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card/:id" element={<CardView />} />
      </Routes>
    </BrowserRouter>
  );
}
