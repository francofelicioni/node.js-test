const fs = require("fs");

const data: string = fs
  .readFileSync("./countries.txt", { encoding: "utf8", flag: "r" })
  .replace(/,/g, "");
const newData: string[] = data.split(/\r?\n/);
let title = newData.shift();

const singleCountriesInfo: string[][] = newData.map((data: string) =>
  data.split(" ")
);

const finalArray: (string | number)[][] = [
  ["Country", "Population", "Area", "Population Density"],
];

for (let index = 0; index < singleCountriesInfo.length - 1; index++) {
  const element: (any)[] = singleCountriesInfo[index];

  let name: string = "";

  for (let i = 0; i < element.length; i++) {
    if (isNaN(element[i])) {
      name += " " + element[i] + " ";
    }
  }

  let population: number;

  if (element[element.length - 2] === "1") {
    population = parseInt(element[element.length - 3]);
  } else {
    population = parseInt(element[element.length - 2]);
  }

  let area: number;

  if (element[element.length - 1] === "1") {
    area = parseInt(element[element.length - 2]);
  } else {
    area = parseInt(element[element.length - 1]);
  }

  let pd: string | undefined;
  let pdmi: string = '';

  if (!isNaN(population) && !isNaN(area)) {
    pd = (population / area).toFixed(2);
  } else {
    pdmi = "Wrong or missing information";
  }

  finalArray.push([name.trim(), population, area, pd ? parseFloat(pd) : pdmi]);
}

for (let index = 1; index < finalArray.length; index++) {
  const element = finalArray[index];
  finalArray.sort(
    (a: any, b: any) => b[element.length - 1] - a[element.length - 1]
  );
}

const cadena = finalArray
  .map((country) => country.join(" - ") + "\n")
  .join("\n");

fs.writeFileSync("countries.csv", cadena);
