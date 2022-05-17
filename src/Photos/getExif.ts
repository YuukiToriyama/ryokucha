import "isomorphic-fetch";
import * as queryString from 'query-string';
import { ErrorFromAPIServer } from './utils';
import { FlickrAPISettings } from '../FlickrAPISettings';

/**
 * flickr.photos.getExif
 * @param settings
 * @param photo_id 
 * @returns (photo_id: string) => Promise<PhotosGetExifResult>
 */
export const getExif = async (settings: FlickrAPISettings, photo_id: string): Promise<PhotosGetExifResult> => {
	let query: Record<string, any> = {
		api_key: settings.key,
		method: "flickr.photos.getExif",
		format: "json",
		nojsoncallback: 1,
		photo_id: photo_id
	}

	// The secret for the photo. If the correct secret is passed then permissions checking is skipped.
	// This enables the 'sharing' of individual photos by passing around the id and secret.
	if (settings.secret !== undefined) {
		query.secret = settings.secret;
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