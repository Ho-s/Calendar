export interface StorageType {
	id: string
	title:string
	year: number
	month: number
	day: number
	startHours: number|string
	startMinutes: number|string
	endHours: number|string
	endMinutes: number|string
	color:string
}

export default StorageType