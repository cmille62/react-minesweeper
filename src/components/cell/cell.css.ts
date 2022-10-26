import { globalStyle, style } from "@vanilla-extract/css";

export const styles = style({
  padding: 0,
  margin: 1,
  backgroundColor: "#dddddd",
  width: 24,
  height: 24,
  userSelect: "none",
  cursor: "pointer",
  border: "1px solid #ddd",

  selectors: {
    "&:hover": {
      backgroundColor: "#eee"
    }
  },
});

export const uncovered = style({
  backgroundColor: "#fff",
});

globalStyle(`${styles} > span`, {
  lineHeight: 1.6,
  marginLeft: 8,
});

globalStyle(`${styles} > svg`, {
  marginTop: 4,
  marginLeft: 4,
});