import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addAsset } from "../store/portfolioSlice";

export const AssetForm = () => {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(
      addAsset({
        id: uuidv4(),
        symbol: symbol.toLowerCase(),
        name: symbol,
        amount,
        currentPrice: 0,
        change24h: 0,
      })
    );
    setAmount(0);
  };

  return (
    <div className="asset-form">
      <select value={symbol} onChange={(e) => setSymbol(e.target.value)}>
        <option value="BTCUSDT">Bitcoin</option>
        <option value="ETHUSDT">Ethereum</option>
      </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
      />
      <button onClick={handleAdd}>Добавить</button>
    </div>
  );
};
