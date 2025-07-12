import { Header } from "./Header";
import { Main } from "./Main";
import { BuyProvider } from "./BuyModal";
import { OrderButton } from "./BuyModal";
import { VineOrderModal } from "./VineOrderModal";
import { Footer } from "./Footer";
import { Routes, Route } from "react-router";
import { VineOrderPage } from "./VineOrderPage";
import { BlogPage } from "./BlogPage";
import { Shop } from "./Shop";
import { VineOrderFinalPage } from "./VineOrderFinalPage";


function App() {

  return (
    <div className="App">
      <BuyProvider>
        <Header />
        <OrderButton />
        <VineOrderModal />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Main />
              </>
            }
          />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:vineName" element={<VineOrderPage />} />
          <Route path="/shop/order" element={<VineOrderFinalPage />} />
          <Route path="/blog/:blogTitle" element={<BlogPage />} />
        </Routes>
        <Footer />
      </BuyProvider>
    </div>
  );
}

export default App;
