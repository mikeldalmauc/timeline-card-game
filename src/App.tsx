import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CardView from "./pages/CardView";
import { LanguageProvider } from "./lib/languageContext";

export default function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/card/:id" element={<CardView />} />
          <Route path="/card/eu/:id" element={<CardView />} />
        </Routes>
      </HashRouter>
    </LanguageProvider>
  );
}
