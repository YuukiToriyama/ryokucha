import { FlickrAPISettings } from '../FlickrAPISettings';
import { search, PhotosSearchArguments } from './search';
import { getExif } from './getExif';

export const Photos = (settings: FlickrAPISettings) => {
	return {
		getExif: (photo_id: string) => getExif(settings, photo_id),
		search: (args: PhotosSearchArguments) => search(settings, args)
		// APIに合わせてメソッドを追加していく
	}
}
