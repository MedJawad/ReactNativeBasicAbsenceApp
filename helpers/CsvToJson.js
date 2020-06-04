//var csv is the CSV file with headers
export function csvJSON(csv, headers) {
  var lines = csv.split('\n');

  var result = [];

  var headers = headers || lines[0].split(';');

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(';');

    if (currentline.length !== headers.length) continue;

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  return result; //JavaScript object
  // return JSON.stringify(result); //JSON
}
