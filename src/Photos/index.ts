import { FlickrAPISettings } from '../types';
import { search, PhotosSearchArguments } from './search';
import { getExif } from './getExif';

export const Photos = (settings: FlickrAPISettings) => {
	return {
		getExif: (photo_id: string) => getExif(settings.key, photo_id),
		search: (args: PhotosSearchArguments) => search(settings.key, args)
		// APIに合わせてメソッドを追加していく
	}
}
