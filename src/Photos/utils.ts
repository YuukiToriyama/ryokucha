export const toUnixtime = (datetime: Date): number => {
	return Math.floor(datetime.getTime() / 1000);
}