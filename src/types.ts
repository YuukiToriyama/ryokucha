export type Feature = {
	type: "Feature"
	geometry: {
		type: string
		coordinates: [number, number][]
	}
	properties: Record<string, string>
}
export type GeoJson = {
	type: "FeatureCollection"
	features: Feature[]
}

export interface FlickrAPISettings {
	key: string // API Key
	secret?: string // API Secret
}