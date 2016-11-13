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

# Blog article:

https://coding-and-design.blogspot.de/2016/11/gps-nmea-gpx-or-klm-converter-for.html

# Example of data imported in Google Map

https://www.google.com/maps/d/u/0/edit?hl=en_US&mid=15CP7PErBuWqA_4r5Kh5ngExjkIg&ll=63.953737510408395%2C-19.131404323596257&z=8

# Others

Online converter:

http://www.gpsvisualizer.com/convert_input
