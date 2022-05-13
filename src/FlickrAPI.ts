import { Photos } from './Photos';
import { FlickrAPISettings } from './types';

export class FlickrAPI {
	key: string;
	secret: string;
	photos: ReturnType<typeof Photos>; // 関数群

	constructor(settings: FlickrAPISettings) {
		this.key = settings.key;
		this.secret = settings.secret || "";
		this.photos = Photos(settings);
	}

}