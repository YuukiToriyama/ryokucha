// Leafletマップインスタンスを作成
const map = L.map('map').setView([35.021245, 135.756068], 12);

// マップにレイヤーおよびマーカーをマッピングする
const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
	maxZoom: 19
});
tileLayer.addTo(map);

// 実行ボタンが押されたら
// flickrのジオタグ付き画像をマッピング
document.getElementById("execute").addEventListener("click", () => {
	const apiKey = document.getElementById("apiKey").value;
	console.log(apiKey)
	projectFlickrImages(apiKey);
});

const projectFlickrImages = async (apiKey) => {
	// @toriyama/ryokuchaを用いてflickrにアクセス
	const flickr = new FlickrAPI({
		key: apiKey
	});
	const response = await flickr.photos.search({
		tags: ["kyoto", "shrine"],
		taken_date: {
			min: new Date(2015, 1, 1),
			max: new Date(2015, 1, 31),
		},
		has_geo: true,
		extras: [
			"geo",
			"url_o",
			"url_sq",
			"date_taken",
			"owner_name",
			"description",
		]
	});
	const geojson = response.toGeoJSON();

	// GeoJSONレイヤーを作成
	const geojsonLayer = L.geoJson(geojson, {
		onEachFeature: (feature, layer) => {
			var popupText = `
					<div style="width: 200px; padding: 20px;">
						<table>
							<tr>
								<td>Image</td>
								<td><a href="${feature.properties["flickrMetadata"]["url_o"]}"><img src="${feature.properties["flickrMetadata"]["url_sq"]}" alt="${feature.properties["flickrMetadata"]["title"]}" width="150px" /></a></td>
							</tr>
							<tr>
								<td>Title</td>
								<td><p>${feature.properties["flickrMetadata"]["title"]}</p></td>
							</tr>
							<tr>
								<td>Photo by</td>
								<td><p>${feature.properties["flickrMetadata"]["owner_name"]}(${feature.properties["flickrMetadata"]["owner"]})</p></td>	
							</tr>
							<tr>
								<td>Details</td>
								<td><p>${feature.properties["flickrMetadata"]["description"]}</p></td>
							</tr>
							<tr>
								<td>Taken-Date</td>
								<td><p>${feature.properties["flickrMetadata"]["datetaken"]}</p></td>
							</tr>
						</table>
					</div>`;
			layer.bindPopup(popupText);
		}
	});
	geojsonLayer.addTo(map);
};