﻿// Copyright 2018 TerraTap Technologies Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

module.exports =
    {
        doConvert: function(data)
        {
            return convert(data);
        }
    };

function convert(data)
{
    var json = data;

    if(typeof(data) === 'string' || data instanceof String)
    {
        json = JSON.parse(data)
    }

    var converted      = {};

    converted.type     = "FeatureCollection";
    converted.features = [];

    var featuresJSON = json["features"];

    for(var i = 0; i < featuresJSON.length; i++)
    {
        var featureJSON = featuresJSON[i];
        var feature       = {};
        var properties    = {};

        feature.type       = "Feature";
        feature.geometry   = featureJSON.geometry;
        feature.properties = properties;
        properties.name    = featureJSON.properties.Name;

        if(featureJSON.properties.Descriptn !== null)
        {
            properties.summary  = featureJSON.properties.Descriptn;
        }

        if(featureJSON.properties.website !== "")
        {
            properties.website = featuresJSON[i].properties.website;
        }

        if(featureJSON.properties.Address !== "")
        {
            properties.address = featureJSON.properties.Address;
        }

        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}
