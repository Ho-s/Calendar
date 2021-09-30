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

export interface BriefItemType {
	cl: string
	to: string
	text: string
	onClick?: any
}

export default StorageType