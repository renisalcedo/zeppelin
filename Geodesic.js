var GeographicLib = require("geographiclib");

export const Geodesic = (lat1,lon1,lat2,lon2) => {

  var geod = GeographicLib.Geodesic.WGS84;
  var l = geod.InverseLine(lat1,lon1,lat2,lon2,
                           GeographicLib.Geodesic.LATITUDE | GeographicLib.Geodesic.LONGITUDE),
      da = 1, n = Math.ceil(l.a13 / da),
      i, a;
  da = l.a13 / n;
  // console.log("latitude longitude");

  var path = [];

  for (i = 0; i <= n; ++i) {
    a = da * i;
    r = l.ArcPosition(a, GeographicLib.Geodesic.LATITUDE |
                      GeographicLib.Geodesic.LONGITUDE | GeographicLib.Geodesic.LONG_UNROLL);
    path.push({
      latitude: r.lat2,
      longitude: r.lon2
    });
  }

  return path;

}
