import StorageType from '../types/type'

const compare = (a: StorageType, b: StorageType) => {
    const A = Number(a.startHours) + Number(a.startMinutes)
    const B = Number(b.startHours) + Number(a.startMinutes)

    let comparison = 0
    if (A > B) {
        comparison = 1
    } else if (A < B) {
        comparison = -1
    }
    return comparison
}

export default compare