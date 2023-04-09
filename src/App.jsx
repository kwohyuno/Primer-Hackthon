import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import LanguagePage from "./pages/LanguagePage"
import CityPage from './pages/CityPage';
import CategoryPage from './pages/CategoryPage';
import LoadingPage from './pages/LoadingPage';
import MainPage from './pages/MainPage';
import TalkPage from './pages/TalkPage';
import ResultPage from './pages/ResultPage';
import ReadyPage from './pages/ReadyPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/language" element={<LanguagePage />} />
          <Route path="/city" element={<CityPage />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/ready" element={<ReadyPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/talk" element={<TalkPage />} />
          <Route path="/result/:bool" element={<ResultPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
