import "isomorphic-fetch";
import * as queryString from 'query-string';
import { ErrorFromAPIServer } from './utils';

/**
 * flickr.photos.getExif
 * @param api_key 
 * @param photo_id 
 * @returns (photo_id: string) => Promise<PhotosGetExifResult>
 */
export const getExif = async (api_key: string, photo_id: string): Promise<PhotosGetExifResult> => {
	let query: Record<string, any> = {
		api_key: api_key,
		method: "flickr.photos.getExif",
		format: "json",
		nojsoncallback: 1,
		photo_id: photo_id
	}

	const baseURL = "https://api.flickr.com/services/rest/";
	const request = queryString.stringifyUrl({
		url: baseURL,
		query: query
	});

	const result: ResponseFromAPIServer | ErrorFromAPIServer = await fetch(request).then(response => {
		return response.json();
	});

	if (result.stat === "ok") {
		return new PhotosGetExifResult(request, result);
	} else {
		throw Error("API error: " + JSON.stringify(result));
	}
}

export class PhotosGetExifResult {
	request: URL
	response: ResponseFromAPIServer

	constructor(request: string, response: ResponseFromAPIServer) {
		this.request = new URL(request);
		this.response = response;
	}
}

interface ResponseFromAPIServer {
	photo: {
		id: string
		secret: string
		server: string
		farm: string
		camera: string
		exif: {
			tagspace: string
			tagspaceid: number
			tag: string
			label: string
			raw: {
				_content: string
			}
			clean: {
				_content: string
			}
		}[]
	}
	stat: "ok"
}