import { globalFontFace, style } from "@vanilla-extract/css";

globalFontFace("Oswald", {
  fontStyle: "normal",
  fontWeight: 200,
  src:
    "url(https://fonts.googleapis.com/css2?family=Oswald:wght@200&display=swap)"
});

globalFontFace("Oswald", {
  fontStyle: "normal",
  fontWeight: 600,
  src:
    "url(https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap)"
});

export const bold = style({
  fontFamily: "Oswald",
  fontWeight: 600
});

export const normal = style({
  fontFamily: "Oswald",
  fontWeight: 200
});