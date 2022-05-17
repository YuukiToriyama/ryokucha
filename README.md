# @toriyama/ryokucha

## Example

下記の条件に当てはまる写真を Flickr から取得し、GeoJSON に変換します。

- tag に`kyoto`,`shrine`を含む
- `2015-01-01`から`2015-01-31`の間に撮影された
- geo タグを含む

```env
APIKey=0123456789abcdefghgi
```

```javascript
import { FlickrAPI } from "@toriyama/ryokucha";
import "dotenv/config";

(async () => {
	const flickr = new FlickrAPI({
		key: process.env.APIKey,
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
		],
	});
	const geojson = response.toGeoJSON();
	console.log(JSON.stringify(geojson, null, "\t"));
})();
```
