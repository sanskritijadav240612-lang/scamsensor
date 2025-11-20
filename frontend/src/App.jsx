import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TopicsPage from './pages/TopicsPage';
import SubtopicsPage from './pages/SubtopicsPage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/topics/:topicId" element={<SubtopicsPage />} />
        <Route path="/topics/:topicId/:subtopicId" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
