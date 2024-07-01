"use client";
import { decrement, increment } from "@/lib/countSlice";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function Home() {
  const dispatch = useAppDispatch();
  const counter = useAppSelector((state) => state.count.count);
  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        This is a persisted counter
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
        >
          <button
            onClick={handleDecrement}
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
            }}
          >
            -
          </button>
          <p style={{ margin: "0 2rem", color: "black" }}>{counter}</p>
          <button
            onClick={handleIncrement}
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
