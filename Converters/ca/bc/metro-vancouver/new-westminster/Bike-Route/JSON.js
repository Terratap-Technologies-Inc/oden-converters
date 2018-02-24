module.exports =
    {
        doConvert: function(data)
        {
            return convert(data);
        }
    };

function convert(data)
{
    var json      = JSON.parse(data);
    var converted = {}

    converted.type     = "FeatureCollection";
    converted.features = []

    var featuresJSON = json["features"];

    for(var i = 0; i < featuresJSON.length; i++)
    {
        var feature = {}
        var properties = {}

        feature.type           = "Feature";
        feature.geometry       = featuresJSON[i].json_geometry;
        feature.properties     = properties
        properties.status      = featuresJSON[i].Status;
        properties.paved       = featuresJSON[i].Paved;
        properties.name        = featuresJSON[i].Name;
        properties.onStreet    = featuresJSON[i].Bike_OnStreet;
        properties.offStreet   = featuresJSON[i].Bike_OffStreet;
        properties.lane        = featuresJSON[i].Bike_Lane;
        properties.distance    = featuresJSON[i].Distance;
        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}