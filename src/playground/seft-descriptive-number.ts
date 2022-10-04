/**
 * Base will less than 10
 * @param num
 * @param base
 * @returns
 */
export function convertDecimalToBase(num: number, base: number): number {
    if (base < 2 || base > 9) {
        throw new Error('Base must be between 2 and 9')
    }
    let result = ''
    while (num > 0) {
        result = (num % base) + result
        num = Math.floor(num / base)
    }
    return parseInt(result)
}

/**
 * Check if a number is a self descriptive number
 * @param decimal
 * @param base
 * @returns
 */
export function isSelfDescriptiveNumber(
    decimal: number,
    base: number,
): boolean {
    if ([2, 3, 6].includes(base)) {
        return false
    } else {
        const baseNumber = convertDecimalToBase(decimal, base)
        if (baseNumber.toString().length !== base) {
            return false
        } else {
            const baseNumberArray = baseNumber.toString().split('')
            for (let i = 0; i < baseNumberArray.length; i++) {
                if (
                    baseNumberArray[i] !==
                    baseNumberArray
                        .filter((item) => item === baseNumberArray[i])
                        .length.toString()
                ) {
                    return false
                }
            }
            return true
        }
    }
}
