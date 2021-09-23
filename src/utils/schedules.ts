import StorageType from 'types/type'

const scheduleStorage = (array:StorageType[],year:number, month:number, day:number) => {
    const schedules: StorageType[] = []
    array.forEach((v: StorageType) => {
        if (v.year === year) {
            if (v.month === month) {
                if (v.day === day) {
                    schedules.push(v)
                }
            }
        }
    })
    return schedules
}

export default scheduleStorage

