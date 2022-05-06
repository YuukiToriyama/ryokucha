import * as Photos from './Photos';

interface FrickrAPISettings {
	key: string // API Key
	secret?: string // API Secret
}

export class FrickrAPI {
	key: string = "";
	secret: string = "";

	constructor(settings: FrickrAPISettings) {
		this.key = settings.key;
		this.secret = settings.secret || "";
	}

	public photos = {
		search: Photos.search(this.key)
	}
}