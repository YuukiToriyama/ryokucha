export class FlickrAPISettings {
	key: string // API Key
	secret?: string // API Secret

	constructor(key: string, secret?: string) {
		this.key = key;
		this.secret = secret;
	}
}