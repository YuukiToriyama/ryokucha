import { FlickrAPISettings } from '../types';
import { search, PhotosSearchArguments } from './search';

export const Photos = (settings: FlickrAPISettings) => {
	return {
		search: (args: PhotosSearchArguments) => search(settings.key, args)
		// APIに合わせてメソッドを追加していく
	}
}
