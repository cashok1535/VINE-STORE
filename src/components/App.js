import { Header } from "./Header";
import { Main } from "./Main";
import { BuyProvider } from "./BuyModal";
import { OrderButton } from "./BuyModal";
import { VineOrderModal } from "./VineOrderModal";
import { Footer } from "./Footer";

function App() {
  return (
    <div className="App">
      <BuyProvider>
        <OrderButton />
        <VineOrderModal />
        <Header />
        <Main />
        <Footer />
      </BuyProvider>
    </div>
  );
}

export default App;
