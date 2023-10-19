import List from "./components/List";
import Form from "./components/Form";
import Error from "./components/Error";
import NotFound from "./components/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/list" element={<List />} />
        <Route path="/addData" element={<Form />} />
        <Route path="/addData/:id" element={<Form />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
