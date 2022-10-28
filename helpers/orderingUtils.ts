export function OrderByNameAscending(a:number, b:number) {
    if (a === b) {
        return 0;
    }
    else {
        return (a < b) ? -1 : 1;
    }
}