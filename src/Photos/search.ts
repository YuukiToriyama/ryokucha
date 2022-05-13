import "isomorphic-fetch";
import * as  queryString from 'query-string';
import { toUnixtime } from './utils';
import { GeoJson } from '../types';

/**
 * flickr.photos.search
 * @param api_key 
 * @returns (args: PhotosSearchArguments) => Promise<PhotosSearchResult>
 * @see https://www.flickr.com/services/api/flickr.photos.search.html
 */
export const search = async (api_key: string, args: PhotosSearchArguments): Promise<PhotosSearchResult> => {
	let query: Record<string, any> = {
		api_key: api_key,
		method: "flickr.photos.search",
		format: "json",
		nojsoncallback: 1,
	}
	if (args.tags !== undefined) {
		query.tags = args.tags.join(",");
		query.tag_mode = args.tag_mode || "any";
	}
	if (args.text !== undefined) {
		query.text = args.text;
	}
	if (args.upload_date !== undefined) {
		if (args.upload_date.min !== undefined) {
			query.min_upload_date = toUnixtime(args.upload_date.min);
		}
		if (args.upload_date.max !== undefined) {
			query.max_upload_date = toUnixtime(args.upload_date.max);
		}
	}
	if (args.taken_date !== undefined) {
		if (args.taken_date.min !== undefined) {
			query.min_taken_date = toUnixtime(args.taken_date.min);
		}
		if (args.taken_date.max !== undefined) {
			query.max_taken_date = toUnixtime(args.taken_date.max);
		}
	}
	if (args.license !== undefined) {
		query.license = args.license;
	}
	if (args.sort !== undefined) {
		query.sort = args.sort;
	}
	if (args.bbox !== undefined) {
		query.bbox = [
			args.bbox.minimum_longitude,
			args.bbox.minimum_latitude,
			args.bbox.maximum_longitude,
			args.bbox.maximum_latitude
		].join(",");
	}
	if (args.safe_search !== undefined) {
		query.safe_search = args.safe_search;
	}
	if (args.media !== undefined) {
		query.media = args.media;
	}
	if (args.has_geo !== undefined) {
		query.has_geo = args.has_geo ? 1 : 0;
	}
	if (args.is_commons !== undefined) {
		query.is_commons = args.is_commons;
	}
	if (args.in_gallery !== undefined) {
		query.in_gallery = args.in_gallery;
	}
	if (args.is_getty !== undefined) {
		query.is_getty = args.is_getty;
	}
	if (args.extras !== undefined) {
		query.extras = args.extras.join(",")
	}

	const baseURL = "https://api.flickr.com/services/rest/";
	const request = queryString.stringifyUrl({
		url: baseURL,
		query: query
	});
	console.log(request)
	const result: ResponseFromAPIServer = await fetch(request).then(response => {
		return response.json();
	});

	if (result.stat === "fail") {
		throw new Error("API error: " + JSON.stringify(result));
	} else {
		return new PhotosSearchResult(result);
	}

}

export class PhotosSearchResult {
	response: ResponseFromAPIServer

	constructor(response: ResponseFromAPIServer) {
		this.response = response;
	}

	public toGeoJSON = (): GeoJson => {
		const features = [];
		this.response.photos.photo.forEach(photo => {
			const feature = {
				type: "Feature",
				properties: {
					title: photo.title,
					description: "",
					//marker-color: "#00ffff",
					//marker-size: "medium",
					//marker-symbol: "",
					frickrMetadata: photo
				},
				geometry: {
					type: "Point",
					coordinates: [
						photo.longitude,
						photo.latitude
					]
				}
			};
			features.push(feature);
		});
		return {
			type: "FeatureCollection",
			features: features
		}
	}
}

interface ResponseFromAPIServer {
	photos: {
		page: number
		pages: any
		perpage: number
		total: any
		photo: {
			id: string
			owner: string
			secret: string
			title: string
			ispublic: number
			// extras
			description?: {
				_content: string
			}
			ownername?: string
			license?: any
			dateupload?: string
			lastupdate?: string
			datetaken?: string
			tags?: string
			latitude?: string
			longitude?: string
			accuracy?: number
			url_h?: string
			height_h?: string
			width_h?: string
			url_sq?: string
			height_sq?: any
			width_sq?: any
		}[]
	}
	stat: string
}

export interface PhotosSearchArguments {
	user_id?: string
	tags?: string[]
	tag_mode?: "any" | "all"
	text?: string
	upload_date?: {
		min?: Date
		max?: Date
	}
	taken_date?: {
		min?: Date
		max?: Date
	}
	license?: string[]
	sort?: "date-posted-asc" | "date-posted-desc" | "date-taken-asc" | "date-taken-desc" | "interestingness-desc" | "interestingness-asc" | "relevance"
	//privacy_filter?: 1 | 2 | 3 | 4 | 5
	bbox?: {
		minimum_longitude: number
		maximum_longitude: number
		minimum_latitude: number
		maximum_latitude: number
	}
	//accuracy?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16
	safe_search?: "safe" | "moderate" | "restricted"
	//content_type?: number
	//machine_tags?: string
	//machine_tag_mode?: "any" | "all"
	//group_id?: string
	//contacts?: "all" | "ff"
	//woe_id?: string
	//place_id: string
	media?: "all" | "photos" | "videos"
	has_geo?: boolean
	//geo_context: 0 | 1 | 2
	//lat?: number
	//lon?: number
	//radius?: number
	//radius_units?: "mi" | "km"
	is_commons?: boolean
	in_gallery?: boolean
	is_getty?: boolean
	extras?: ("description" | "license" | "date_upload" | "date_taken" | "owner_name" | "icon_server" | "original_format" | "last_update" | "geo" | "tags" | "machine_tags" | "o_dims" | "views" | "media" | "path_alias" | "url_sq" | "url_t" | "url_s" | "url_q" | "url_m" | "url_n" | "url_z" | "url_c" | "url_l" | "url_o")[]
	//per_page? number
	//page?: number
}
