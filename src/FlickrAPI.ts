import { Photos } from './Photos/index';
import { FlickrAPISettings } from './FlickrAPISettings';

export class FlickrAPI {
	settings: FlickrAPISettings;
	photos: ReturnType<typeof Photos>; // 関数群

	constructor(settings: { key: string, secret?: string }) {
		this.settings = new FlickrAPISettings(settings.key, settings.secret);
		this.photos = Photos(settings);
	}
}