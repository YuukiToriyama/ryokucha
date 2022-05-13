import { FrickrAPISettings } from '../types';
import { search, PhotosSearchArguments } from './search';

export const Photos = (settings: FrickrAPISettings) => {
	return {
		search: (args: PhotosSearchArguments) => search(settings.key, args)
		// APIに合わせてメソッドを追加していく
	}
}
