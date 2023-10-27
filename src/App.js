import List from "./components/List";
import Form from "./components/Form";
import Error from "./components/Error";
import NotFound from "./components/NotFound";
import AddCart from "./components/AddCart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartContextProvider from "./components/CartDetailsProvider";
import { ListCart } from "./components/ListCart";

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
        <Route path="/addCart" element={<CartContextProvider><AddCart/></CartContextProvider>} />
        <Route path="/listCart" element={<CartContextProvider><ListCart/></CartContextProvider>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
