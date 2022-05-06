import { FrickrAPI } from './FrickrAPI';

const frickr = new FrickrAPI({
	key: "apikey1234567890"
});
frickr.photos.search({
	tags: ["kyoto", "shrine"],
	taken_date: {
		min: new Date(2015, 1, 1),
		max: new Date(2015, 12, 31)
	},
	has_geo: true,
	extras: ["geo", "url_o", "url_sq", "date_taken", "owner_name", "description"]
});