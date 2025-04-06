import {useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { AssetForm } from "./AssetForm";
import { removeAsset } from "../store/portfolioSlice";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import classNames from "classnames";
import "../styles/main.scss";
import "../styles/responsive.scss";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

export const PortfolioOverview = () => {
  const dispatch = useDispatch();
  const assets = useSelector((state: RootState) => state.portfolio.assets);

  const totalValue = useMemo(
    () => assets.reduce((sum, a) => sum + a.amount * a.currentPrice, 0),
    [assets]
  );

  const pieData = useMemo(
    () =>
      assets.map((asset) => ({
        name: asset.name,
        value: asset.amount * asset.currentPrice,
      })),
    [assets]
  );

  const Row = ({ index, style }: ListChildComponentProps) => {
    const asset = assets[index];
    const value = asset.amount * asset.currentPrice;
    const share = totalValue ? ((value / totalValue) * 100).toFixed(2) : "0";

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        style={style}
        className={classNames("asset-item")}
        onClick={() => dispatch(removeAsset(asset.id))}
        role="button"
        tabIndex={0}
        aria-label={`Удалить ${asset.name}`}
        onKeyDown={(e) => {
          if (e.key === "Enter") dispatch(removeAsset(asset.id));
        }}
      >
        <strong>{asset.name}</strong> — {asset.amount} × ${asset.currentPrice.toFixed(2)} = $
        {value.toFixed(2)} ({share}%)
      </motion.div>
    );
  };

  return (
    <div className="portfolio responsive-container">
      <h1>Обзор портфеля</h1>
      <AssetForm />

      <section aria-label="Список активов" className="asset-list-container">
        <List
          height={400}
          itemCount={assets.length}
          itemSize={60}
          width="100%"
        >
          {Row}
        </List>
      </section>

      <section className="portfolio-chart" aria-label="Доля активов в портфеле">
        <h2>Аналитика</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};