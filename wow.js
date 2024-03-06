
var MAP_BASE = '';
var mapId = '/wow';

var headerEl = mmw._overlay.headerEl;
var middleheaderEl = mmw._overlay.middleheaderEl;
var rightheaderEl = mmw._overlay.rightheaderEl;
var rightbarEl = mmw._overlay.rightbarEl;

var map = mmw.map;
var marker = mmw.marker;
var markerpopup = mmw.markerpopup;

document.title = 'Wonders of World';

rightheaderEl.style.display = 'flex';
rightheaderEl.style['padding-left'] = '30px';
rightheaderEl.style.width = '170px';

rightheaderEl.innerHTML = 'Wonders of World'

rightbarEl.style.width = '200px';
rightbarEl.style.height = '70px';

rightbarEl.style.display = 'grid';

let rightbarListEl = document.createElement('ol');
rightbarEl.append(rightbarListEl);

map.on('load',  async () => {

	var geoJSONData = await mmw._common.fetchJSON(MAP_BASE + mapId + '/data/wow.json');

	map.addLayer(newThreeboxLayer(geoJSONData));

	geoJSONData.features.forEach( (f) => {
		var memberEl = document.createElement('li');
		memberEl.innerHTML = f.properties.name;
		if(f.geometry) {
		memberEl.setAttribute('onclick','map.flyTo({ zoom: ' + f.properties.zoom +', pitch: 65,  center: ['+ f.geometry.coordinates +'] })');
		}
		rightbarListEl.append(memberEl);
	});


});
