import { useSelector, useDispatch } from "react-redux";
import { FixedSizeList as List } from "react-window";
import { RootState } from "../store";
import { removeAsset } from "../store/portfolioSlice";

export const AssetList = () => {
  const assets = useSelector((state: RootState) => state.portfolio.assets);
  const dispatch = useDispatch();
  const totalValue = assets.reduce((sum, a) => sum + a.currentPrice * a.amount, 0);

  return (
    <List
      height={500}
      width={"100%"}
      itemCount={assets.length}
      itemSize={60}
      itemData={{ assets, dispatch, totalValue }}
    >
      {({ index, style, data }) => {
        const asset = data.assets[index];
        const value = asset.amount * asset.currentPrice;
        const share = totalValue ? ((value / totalValue) * 100).toFixed(2) : "0";

        return (
          <div
            style={style}
            className="asset-item"
            onClick={() => data.dispatch(removeAsset(asset.id))}
          >
            <strong>{asset.name}</strong> – {asset.amount} × ${asset.currentPrice.toFixed(2)} = $
            {value.toFixed(2)} ({share}%)
          </div>
        );
      }}
    </List>
  );
};
