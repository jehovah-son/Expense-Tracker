export function addComas(num: number): string {
    // Convert the number to a string and add commas as thousands separators

    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}   