import { Header } from "./Header";
import { Main } from "./Main";
import { BuyProvider } from "./BuyModal";
import { OrderButton } from "./BuyModal";
import { VineOrderModal } from "./VineOrderModal";
import { Footer } from "./Footer";
import { Routes, Route } from "react-router";
import { VineOrderPage } from "./VineOrderPage";

function App() {
  return (
    <div className="App">
      <BuyProvider>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <OrderButton />
                <VineOrderModal />
                <Main />
              </>
            }
          />
          <Route path="/shop/:vineName" element={<VineOrderPage />} />
        </Routes>
        <Footer />
      </BuyProvider>
    </div>
  );
}

export default App;
