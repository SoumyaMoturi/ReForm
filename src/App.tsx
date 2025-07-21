// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { routesConfig } from './routes/routes';

function App() {
  return (
    <Routes>
      {routesConfig.map(({ path, element }, index) => (
        <Route key={index} path={path} element={element} />
      ))}
    </Routes>
  );
}

export default App;