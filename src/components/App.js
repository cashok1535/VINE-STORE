import { Header } from "./Header";
import { Main } from "./Main";
import { BuyProvider } from "./BuyModal";
import { OrderButton } from "./BuyModal";
import { VineOrderModal } from "./VineOrderModal";

function App() {
  return (
    <div className="App">
      <BuyProvider>
        <OrderButton />
        <VineOrderModal />
        <Header />
        <Main />
      </BuyProvider>
    </div>
  );
}

export default App;
