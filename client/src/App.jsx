import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Course from './components/Course'
import Home from './pages/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Course />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
