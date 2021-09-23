import { makeVar } from '@apollo/client'
import StorageType from '../types/type'
import moment from 'moment'

const m = moment()
export const nowDay = makeVar<number>(m.date())
export const nowWeek = makeVar<number>(m.week())
export const nowMonth = makeVar<number>(m.month())
export const nowYear = makeVar<number>(m.year())
export const whatDay = makeVar<number>(-1)
export const yearStorage = makeVar<number>(m.year())
export const monthStorage = makeVar<number>(m.month())

export const storage = makeVar<StorageType[]>(JSON.parse(localStorage.getItem('storage') || '[]'))

export const navBarClicked = makeVar<boolean>(false)

export const onClickHamburger = ():void => {
	if(navBarClicked()){
		navBarClicked(false)
	} else{
		navBarClicked(true)
	}
}

export const onClickDay = (e: any): void => {
	const dateInfo = e.target.dataset
	nowDay(Number(dateInfo.day))
	nowWeek(Number(dateInfo.week))
	nowMonth(Number(dateInfo.month))
	nowYear(Number(dateInfo.year))
	monthStorage(Number(dateInfo.month))
	yearStorage(Number(dateInfo.year))

	whatDay(Number(dateInfo.whatDay))
}

export const onClickWeek = (e: any): void => {
	const firstDayOfTheMonth = m.month(nowMonth()).startOf('month').format('d')
	const isGrayed = e.target.parentNode.childNodes[1].dataset.gray === 'true'

	if (isGrayed) {
		const dateInfo =
            e.target.parentNode.childNodes[Number(firstDayOfTheMonth) + 1].dataset
		nowDay(1)

		monthStorage(Number(dateInfo.month))
		yearStorage(Number(dateInfo.year))
		nowWeek(Number(dateInfo.week))
		whatDay(Number(firstDayOfTheMonth))
	} else {
		const dateInfo = e.target.parentNode.childNodes[1].dataset
		nowDay(Number(dateInfo.day))
		whatDay(0)

		monthStorage(Number(dateInfo.month))
		yearStorage(Number(dateInfo.year))
		nowWeek(Number(dateInfo.week))
	}
}

export const onClickToday = (): void => {
	nowDay(m.date())
	nowWeek(m.week())
	nowMonth(m.month())
	nowYear(m.year())
	whatDay(-1)
	yearStorage(m.year())
	monthStorage(m.month())

}

export const onClickRight = (): void => {
	if (nowMonth() < 11) {
		nowMonth(nowMonth() + 1)
	} else {
		nowMonth(0)
		nowYear(nowYear() + 1)
	}
}

export const onClickLeft = (): void => {
	if (nowMonth() > 0) {
		nowMonth(nowMonth() - 1)
	} else {
		nowMonth(11)
		nowYear(nowYear() - 1)
	}
}

export const onClickDelete = (e: any): void => {
	const filteredStorage = storage().filter((v: StorageType) => {
		return v.id !== e.target.parentNode.id
	})
	storage(filteredStorage)
}

export const setItemsInStorage = () => {
	storage(JSON.parse(localStorage.getItem('storage') || '[]'))
}

export const addStorage = (newItem: StorageType):void => {
	storage([...storage(),newItem])
}

export const isDuplicated = (blockStorage:StorageType):boolean => {
	if (storage().length !== 0) {
		for (let i = 0; i < storage().length; i++) {
			if (
				storage()[i].startHours === blockStorage.startHours &&
                storage()[i].startMinutes === blockStorage.startMinutes &&
                storage()[i].endHours === blockStorage.endHours &&
                storage()[i].endMinutes === blockStorage.endMinutes &&
                storage()[i].year === blockStorage.year &&
                storage()[i].month === blockStorage.month &&
                storage()[i].day === blockStorage.day
			) {
				return false
			}
		}
	}
	return true
}
