//DATA
let dataset = [
  { date: "01/01/2023", pizza: 10000 },
  { date: "01/02/2023", pizza: 30000 },
  { date: "01/03/2023", pizza: 20000 },
  { date: "01/04/2023", pizza: 50000 },
  { date: "01/05/2023", pizza: 90000 },
  { date: "01/06/2023", pizza: 25000 },
  { date: "01/07/2023", pizza: 15000 },
  { date: "01/08/2023", pizza: 40000 },
  { date: "01/09/2023", pizza: 40000 },
  { date: "01/10/2023", pizza: 82000 },
  { date: "01/11/2023", pizza: 90000 },
  { date: "01/12/2023", pizza: 10000 },
];



//DIMENSIONS - For the data visualization
let HEIGHT = 500, //USE WHAT WORKS FOR YOU
WIDTH = 720,
MARGIN = {top: 50, right: 50, bottom: 50, left: 60};


//CREATE SVG - THIS IS OUR CANVAS IN A WAY, WE'RE GONNA PAINT ON THE LINE
let svg = d3
  .select("#root")
  .append("svg")
  .attr("height", HEIGHT + MARGIN.top + MARGIN.bottom)
  .attr("width", WIDTH + MARGIN.left + MARGIN.right)
  .append("g")
  .attr("transform", `translate(${MARGIN.left}, ${MARGIN.top})`)


//PARSE TIME - SO BASICALLY PUTTING IT IN A FORMAT THAT JS CAN UNDERSTAND - ALSO YOU'LL USE THIS IN THE FEILD A LOT
let timeScale = d3.timeParse("%d/%m/%Y") //INSIDE YOU FEED IT THE FORMAT OF OUR DATES


//CREATE SCALES / AXES
let xScale = d3.scaleTime().range([0, WIDTH]);
let yScale = d3.scaleLinear().range([HEIGHT, 0]);
yScale.domain(d3.extent(dataset, (d) => d.pizza));
xScale.domain(d3.extent(dataset, (d) => timeScale(d.date))); //WORDS NOT NUMBERS - DATE, THEY'RE A STRING SO D3 DOES NOT UNDERSTAND

svg.append("g").call(d3.axisLeft(yScale).tickSizeOuter(0));
svg
  .append("g")
  .attr("transform", `translate(0, ${HEIGHT})`)
  .call(d3.axisBottom(xScale).tickSizeOuter(0).ticks(10));


//CREATE LINE - NEED MORE RESEARCH!
let line = d3.line()
.x((d) => xScale(timeScale(d.date)))
.y((d) => yScale(d.pizza));


svg.append("path")
.datum(dataset)
.attr("d", line)
.attr("stroke", "steelblue")
.attr("stroke-width", 2)
.attr("fill", "none");