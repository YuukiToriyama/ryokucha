export const toUnixtime = (datetime: Date): number => {
	return Math.floor(datetime.getTime() / 1000);
}

export interface ErrorFromAPIServer {
	stat: "fail"
	code: number
	message: string
}