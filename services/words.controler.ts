
export function CanIJustifyThis(input:string, wordAvailableToday: number): boolean {
    const tab = input.split(" ")
    if (tab.length > wordAvailableToday) 
        return false
    return true
}

