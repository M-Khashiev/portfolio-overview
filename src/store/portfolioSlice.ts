import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Asset } from "../types";

interface PortfolioState {
  assets: Asset[];
}

const initialState: PortfolioState = {
  assets: JSON.parse(localStorage.getItem("assets") || "[]"),
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addAsset(state, action: PayloadAction<Asset>) {
      state.assets.push(action.payload);
      localStorage.setItem("assets", JSON.stringify(state.assets));
    },
    removeAsset(state, action: PayloadAction<string>) {
      state.assets = state.assets.filter((a) => a.id !== action.payload);
      localStorage.setItem("assets", JSON.stringify(state.assets));
    },
    updatePrice(state, action: PayloadAction<{ symbol: string; price: number }>) {
      state.assets = state.assets.map((a) =>
        a.symbol === action.payload.symbol ? { ...a, currentPrice: action.payload.price } : a
      );
    },
  },
});

export const { addAsset, removeAsset, updatePrice } = portfolioSlice.actions;
export default portfolioSlice.reducer;
