import { FrickrAPI } from './FrickrAPI';

console.log(process.env.APIKey);

(async () => {
	const frickr = new FrickrAPI({
		key: process.env.APIKey
	});
	const geojson = await frickr.photos.search({
		tags: ["kyoto", "shrine"],
		taken_date: {
			min: new Date(2015, 1, 1),
			max: new Date(2015, 12, 31)
		},
		has_geo: true,
		extras: ["geo", "url_o", "url_sq", "date_taken", "owner_name", "description"]
	}).catch(error => {
		console.error(error)
	});
	console.log(JSON.stringify(geojson, null, "\t"));
})();