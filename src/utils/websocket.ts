import { store } from "../store";
import { updatePrice } from "../store/portfolioSlice";

const symbols = ["btcusdt", "ethusdt"]; // можно динамически

const socket = new WebSocket(
  `wss://stream.binance.com:9443/stream?streams=${symbols
    .map((s) => `${s}@miniTicker`)
    .join("/")}`
);

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  const data = message.data;
  const symbol = data.s.toLowerCase();
  const price = parseFloat(data.c);

  store.dispatch(updatePrice({ symbol, price }));
};
