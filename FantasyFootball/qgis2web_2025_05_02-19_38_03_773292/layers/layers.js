var wms_layers = [];


        var lyr_OSMStandard_0 = new ol.layer.Tile({
            'title': 'OSM Standard',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' &nbsp &middot; <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
                url: 'http://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_Count_1 = new ol.format.GeoJSON();
var features_Count_1 = format_Count_1.readFeatures(json_Count_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Count_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Count_1.addFeatures(features_Count_1);
var lyr_Count_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Count_1, 
                style: style_Count_1,
                popuplayertitle: 'Count',
                interactive: true,
    title: 'Count<br />\
    <img src="styles/legend/Count_1_0.png" /> 0 - 12<br />\
    <img src="styles/legend/Count_1_1.png" /> 12 - 39<br />\
    <img src="styles/legend/Count_1_2.png" /> 39 - 61<br />\
    <img src="styles/legend/Count_1_3.png" /> 61 - 92<br />\
    <img src="styles/legend/Count_1_4.png" /> 92 - 133<br />' });
var format_bikepts_2 = new ol.format.GeoJSON();
var features_bikepts_2 = format_bikepts_2.readFeatures(json_bikepts_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_bikepts_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_bikepts_2.addFeatures(features_bikepts_2);
var lyr_bikepts_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_bikepts_2, 
                style: style_bikepts_2,
                popuplayertitle: 'bikepts',
                interactive: true,
                title: '<img src="styles/legend/bikepts_2.png" /> bikepts'
            });
var format_Shortestpath_3 = new ol.format.GeoJSON();
var features_Shortestpath_3 = format_Shortestpath_3.readFeatures(json_Shortestpath_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Shortestpath_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Shortestpath_3.addFeatures(features_Shortestpath_3);
var lyr_Shortestpath_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Shortestpath_3, 
                style: style_Shortestpath_3,
                popuplayertitle: 'Shortest path',
                interactive: true,
                title: '<img src="styles/legend/Shortestpath_3.png" /> Shortest path'
            });
var format_NewYorkCityBikeRoutes_20250502_4 = new ol.format.GeoJSON();
var features_NewYorkCityBikeRoutes_20250502_4 = format_NewYorkCityBikeRoutes_20250502_4.readFeatures(json_NewYorkCityBikeRoutes_20250502_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_NewYorkCityBikeRoutes_20250502_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_NewYorkCityBikeRoutes_20250502_4.addFeatures(features_NewYorkCityBikeRoutes_20250502_4);
var lyr_NewYorkCityBikeRoutes_20250502_4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_NewYorkCityBikeRoutes_20250502_4, 
                style: style_NewYorkCityBikeRoutes_20250502_4,
                popuplayertitle: 'New York City Bike Routes_20250502',
                interactive: true,
                title: '<img src="styles/legend/NewYorkCityBikeRoutes_20250502_4.png" /> New York City Bike Routes_20250502'
            });
var format_NYCParksForeverWild_20250502_5 = new ol.format.GeoJSON();
var features_NYCParksForeverWild_20250502_5 = format_NYCParksForeverWild_20250502_5.readFeatures(json_NYCParksForeverWild_20250502_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_NYCParksForeverWild_20250502_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_NYCParksForeverWild_20250502_5.addFeatures(features_NYCParksForeverWild_20250502_5);
var lyr_NYCParksForeverWild_20250502_5 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_NYCParksForeverWild_20250502_5, 
                style: style_NYCParksForeverWild_20250502_5,
                popuplayertitle: 'NYC Parks Forever Wild_20250502',
                interactive: true,
                title: '<img src="styles/legend/NYCParksForeverWild_20250502_5.png" /> NYC Parks Forever Wild_20250502'
            });

lyr_OSMStandard_0.setVisible(true);lyr_Count_1.setVisible(true);lyr_bikepts_2.setVisible(true);lyr_Shortestpath_3.setVisible(true);lyr_NewYorkCityBikeRoutes_20250502_4.setVisible(true);lyr_NYCParksForeverWild_20250502_5.setVisible(true);
var layersList = [lyr_OSMStandard_0,lyr_Count_1,lyr_bikepts_2,lyr_Shortestpath_3,lyr_NewYorkCityBikeRoutes_20250502_4,lyr_NYCParksForeverWild_20250502_5];
lyr_Count_1.set('fieldAliases', {'shape_area': 'shape_area', 'gispropnum': 'gispropnum', 'park_name': 'park_name', 'borough': 'borough', 'shape_len': 'shape_len', 'NUMPOINTS': 'NUMPOINTS', });
lyr_bikepts_2.set('fieldAliases', {'id': 'id', });
lyr_Shortestpath_3.set('fieldAliases', {'id': 'id', 'start': 'start', 'end': 'end', 'cost': 'cost', });
lyr_NewYorkCityBikeRoutes_20250502_4.set('fieldAliases', {'bikedir': 'bikedir', 'fromstreet': 'fromstreet', 'lanecount': 'lanecount', 'facilitycl': 'facilitycl', 'ft2facilit': 'ft2facilit', 'tf2facilit': 'tf2facilit', 'tostreet': 'tostreet', 'ret_date': 'ret_date', 'bikeid': 'bikeid', 'instdate': 'instdate', 'tf_facilit': 'tf_facilit', 'shape_leng': 'shape_leng', 'allclasses': 'allclasses', 'version': 'version', 'onoffst': 'onoffst', 'status': 'status', 'ft_facilit': 'ft_facilit', 'boro': 'boro', 'street': 'street', 'segmentid': 'segmentid', 'prevbikeid': 'prevbikeid', });
lyr_NYCParksForeverWild_20250502_5.set('fieldAliases', {'gispropnum': 'gispropnum', 'propertyname': 'propertyname', 'acres': 'acres', 'forverwildid': 'forverwildid', });
lyr_Count_1.set('fieldImages', {'shape_area': 'TextEdit', 'gispropnum': 'TextEdit', 'park_name': 'TextEdit', 'borough': 'TextEdit', 'shape_len': 'TextEdit', 'NUMPOINTS': 'TextEdit', });
lyr_bikepts_2.set('fieldImages', {'id': '', });
lyr_Shortestpath_3.set('fieldImages', {'id': 'TextEdit', 'start': 'TextEdit', 'end': 'TextEdit', 'cost': 'TextEdit', });
lyr_NewYorkCityBikeRoutes_20250502_4.set('fieldImages', {'bikedir': '', 'fromstreet': '', 'lanecount': '', 'facilitycl': '', 'ft2facilit': '', 'tf2facilit': '', 'tostreet': '', 'ret_date': '', 'bikeid': '', 'instdate': '', 'tf_facilit': '', 'shape_leng': '', 'allclasses': '', 'version': '', 'onoffst': '', 'status': '', 'ft_facilit': '', 'boro': '', 'street': '', 'segmentid': '', 'prevbikeid': '', });
lyr_NYCParksForeverWild_20250502_5.set('fieldImages', {'gispropnum': '', 'propertyname': '', 'acres': '', 'forverwildid': '', });
lyr_Count_1.set('fieldLabels', {'shape_area': 'no label', 'gispropnum': 'no label', 'park_name': 'no label', 'borough': 'no label', 'shape_len': 'no label', 'NUMPOINTS': 'no label', });
lyr_bikepts_2.set('fieldLabels', {'id': 'no label', });
lyr_Shortestpath_3.set('fieldLabels', {'id': 'no label', 'start': 'no label', 'end': 'no label', 'cost': 'no label', });
lyr_NewYorkCityBikeRoutes_20250502_4.set('fieldLabels', {'bikedir': 'no label', 'fromstreet': 'no label', 'lanecount': 'no label', 'facilitycl': 'no label', 'ft2facilit': 'no label', 'tf2facilit': 'no label', 'tostreet': 'no label', 'ret_date': 'no label', 'bikeid': 'no label', 'instdate': 'no label', 'tf_facilit': 'no label', 'shape_leng': 'no label', 'allclasses': 'no label', 'version': 'no label', 'onoffst': 'no label', 'status': 'no label', 'ft_facilit': 'no label', 'boro': 'no label', 'street': 'no label', 'segmentid': 'no label', 'prevbikeid': 'no label', });
lyr_NYCParksForeverWild_20250502_5.set('fieldLabels', {'gispropnum': 'no label', 'propertyname': 'no label', 'acres': 'no label', 'forverwildid': 'no label', });
lyr_NYCParksForeverWild_20250502_5.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});