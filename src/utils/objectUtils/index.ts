
export function readObjectProp(obj: object, key: string) {
    const objectFind = Object.entries(obj).find(entry => (entry['0'] === key));
    return objectFind ? objectFind['1'] : undefined;
}
