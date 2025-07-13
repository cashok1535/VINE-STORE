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
import { Not21 } from "./Not21";

function App() {
  return (
    <div className="App">
      <BuyProvider>
        <OrderButton />
        <VineOrderModal />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path="/shop"
            element={
              <>
                <Header />
                <Shop />
                <Footer />
              </>
            }
          />
          <Route
            path="/shop/:vineName"
            element={
              <>
                <Header />
                <VineOrderPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/shop/order"
            element={
              <>
                <Header />
                <VineOrderFinalPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/blog/:blogTitle"
            element={
              <>
                <Header />
                <BlogPage />
                <Footer />
              </>
            }
          />
          <Route path="/not-24" element={<Not21 />} />
        </Routes>
      </BuyProvider>
    </div>
  );
}

export default App;

// модалка is21 в sessionStorage
// изменять header в header useLocation
// FooterSlider в отдельный компонент
