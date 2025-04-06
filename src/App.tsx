import { PortfolioOverview } from "./components/PortfolioOverview";
import "./utils/websocket"; // подключаем WebSocket
import "./styles/main.scss";

export default function App() {
  return (
    <div className="app">
      <PortfolioOverview />
    </div>
  );
}
