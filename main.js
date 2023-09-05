const macyInstance = new Macy({
  container: ".noteContainer",
  trueOrder: true,
  columns: 5,
  margin: {
    x: 45,
    y: 15,
  },
  breakAt: {
    1201: 4,
    1025: 3,
    769: 2,
    481: 1,
  },
});

window.onload = () => {
  macyInstance.reInit();
  console.log("loaded");
};
a