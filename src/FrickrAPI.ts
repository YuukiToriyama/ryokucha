import { Photos } from './Photos';
import { FrickrAPISettings } from './types';

export class FrickrAPI {
	key: string;
	secret: string;
	photos: ReturnType<typeof Photos>; // 関数群

	constructor(settings: FrickrAPISettings) {
		this.key = settings.key;
		this.secret = settings.secret || "";
		this.photos = Photos(settings);
	}

}