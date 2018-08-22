import glamorous from "glamorous";


export const Container = glamorous.div({
  display: "grid",
  grid: "auto / 18vw 18vw 18vw 18vw",
  gridGap: "4.5vw",
  justifyContent: "center"
});


export const Sorting = glamorous.div({
  display: "grid",
  gridTemplateRows: "8% 25% 10% 55%",
  justifyItems: "center"
});


export const Time = glamorous.div({
  fontFamily: "Orbitron",
  fontWeight: 600,
  fontSize: "3em",
  letterSpacing: "0.1em"
});


export const SortBy = glamorous.select({
  fontSize: "2em",
  width: "50%",
  padding: "2.5%"
});