const fs = require("fs");

const data = fs
  .readFileSync("./countries.txt", { encoding: "utf8", flag: "r" })
  .replace(/,/g, "");
const newData = data.slice(24).split(/\r?\n/);

const singleCountriesInfo = newData.map((data) => data.split(" "));

const finalArray = [["Country", "Population", "Area", "Population Density"]];


for (let index = 0; index < singleCountriesInfo.length - 1; index++) {
  const element = singleCountriesInfo[index];

  let name = '';

  for (let i = 0; i < element.length; i++) {
    if (isNaN(element[i])) {
      name += ' ' + (element[i]) + ' ';
    }
  }

  let population = parseInt(element[element.length - 2]);
  let area = parseInt(element[element.length - 1]);
  let pd;

  if (!isNaN(population) && population > 1 && !isNaN(area) && area > 1) {
    pd = (population / area).toFixed(2);
  } else {
    pd = 0;
  }

  finalArray.push([name.trim(), population, area, parseFloat(pd)])
}

for (let index = 1; index < finalArray.length; index++) {
  const element = finalArray[index];
  finalArray.sort((a,b) => b[element.length -1 ] -  a[element.length -1])
}

finalArray[1].sort((a,b) => b[finalArray.length -1 ] -  a[finalArray.length -1])

console.dir(finalArray, { maxArrayLength: null });

const cadena = finalArray.toString();

fs.writeFileSync("countries.csv", cadena);
