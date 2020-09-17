const params = process.argv;
if (params[2] == "help") {
  console.log("Haproxy Log Analyzer.\n Usage: node index.js [from-filename] [to-filename] [from-time] [to-time].\n Date Format Example: Sep 14 00:04:14");
  return;
}

const fromFileName = params[2];
const toFileName = params[3];
const fromTime = process.argv[4];
const toTime = process.argv[5];
let totalReq = 0;
let dateFrom;
let dateTo;
if (fromTime) {
  dateFrom = new Date(fromTime);
}

if (toTime) {
  dateTo = new Date(toTime);
}

var uniqueIps = [];

const fs = require('fs');

function processLineByLine() {
  try {
    const data = fs.readFileSync(fromFileName, 'UTF-8');
    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
      const splitLine = line.split(/ +/g);
      if (splitLine.length < 5) return;

      //dates cal
      var curDate = new Date(splitLine[0] + " " + splitLine[1] + " " + splitLine[2]);
      if (dateFrom && dateTo && !(curDate > dateFrom && curDate < dateTo)) {
        return;
      }
      const ipAddress = splitLine[5].split(":")[0];
      if (!uniqueIps[ipAddress]) {
        uniqueIps[ipAddress] = { count: 0 };
      }

      let count = uniqueIps[ipAddress].count;
      count++;
      uniqueIps[ipAddress].count = count;
      totalReq++;
    });
  } catch (err) {
    console.error(err);
  }
}

function printUniqueuIps() {
  var array = [];
  for (var key in uniqueIps) {
    array.push({
      ip: key,
      count: uniqueIps[key].count
    });
  }

  var sorted = array.sort(function (a, b) {
    return (b.count - a.count);
  });
  console.log(sorted);
  console.log("Total Requests = "+ totalReq);
}

processLineByLine();
printUniqueuIps();
