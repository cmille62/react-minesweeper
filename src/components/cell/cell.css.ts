import { style } from "@vanilla-extract/css";

export const styles = style({
  padding: 10,
  margin: 1,
  backgroundColor: "#dddddd",
  width: 8,
  height: 8,
  userSelect: "none",
  cursor: "pointer",
  border: "1px solid #ddd",

  selectors: {
    "&:hover": {
      backgroundColor: "#eee"
    }
  }
});

export const uncovered = style({
  backgroundColor: "#fff",
});