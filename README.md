# gps-converter
GPS nmea data converter to gpx or kml format for google map importing

This script take large amount of GPS data in nmea format and convert into gpx format to import into Google maps.

I had large amount of data coming from a trip to Iceland and I wanted quicly import it on Google My Maps.

Google has a limit of 5 MB but my data was 90 MB.

To reduce I 

* only export latitude and longitude
* approximae the latitude and longitude values reducing the number of decimal digit
* skeep points 

There are two variables that you can adjust to get an putput file smaller than 5 MB. In my case the best compromise was

* savePointsEvery = 4
* precision = 6

This generate an ouput file of 4,5 MB

Using instead

* savePointsEvery = 4
* precision = 6

The output file was 6 MB

The output files are in the folder data.

# Others

Online converter:

http://www.gpsvisualizer.com/convert_input
