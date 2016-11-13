// Read the file and print its contents.
var fs = require('fs'),
	folderOriginalData = 'data/original-gps-data/',
	folderOutputData = 'data/',
	r = [],
	savePointsEvery = 4,
	precision = 6,
	files = fs.readdirSync(folderOriginalData),
	ouputFileName = folderOutputData + "output." + savePointsEvery + "." + precision + ".gpx";

for (var j in files.sort()) {
	var file = files[j];
	r.push(processThisFile(file));
	// break;
}

fs.writeFileSync(ouputFileName, [
    '<?xml version="1.0"?>',
    '<gpx creator="lucamug https://github.com/lucamug/gps-converter" version="1.0" xmlns="http://www.topografix.com/GPX/1/0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd">',
	    '<trk>',
		    '<name>All</name>',
		    '<trkseg>',
			    r.join(''),
		    '</trkseg>',
	    '</trk>',
    '</gpx>',
].join(''));

console.log("Check the output in " + ouputFileName);

function processThisFile(filename) {
	var array = fs.readFileSync(folderOriginalData + filename).toString().split("\n");
	var c = 0;
	var r = [];
	for (var i in array) {
		var row = array[i];
		if (row.match(/^\$GPRMC/)) {
			c++;
			if (!(c % savePointsEvery)) {
				var ll = getLatLng(row);
				r.push([
                    '<trkpt lat="' + ll.lat + '" lon="' + ll.lon + '">',
                    '</trkpt>',
                ].join(''));
			}
			// break;
		}
	}
	return r;
}

function getLatLng(d) {
	// Example of nmea
	// $GPRMC,002516.000,A,6358.0464,N,02234.5556,W,1.69,324.78,290812,,,A*72

	var nmea = d.split(",");
	var coord, direction, days, minutes, lat, lon;

	// LAT: North South 
	coord = nmea[3];
	direction = nmea[4];
	days = coord.substring(0, 2);
	minutes = coord.substring(2, 10);
	lat = toDD(days, minutes, direction);

	// LON: East West
	coord = nmea[5];
	direction = nmea[6];
	days = coord.substring(0, 3);
	minutes = coord.substring(3, 11);
	lon = toDD(days, minutes, direction);

	return { lat: lat, lon: lon };
}

function toDD(degrees, minutes, direction) {
	var out = parseInt(degrees) + (parseFloat(minutes) / 60);
	if (direction == "S" || direction == "W") {
		out = out * -1.0;
	}
	return out.toFixed(precision);
}
