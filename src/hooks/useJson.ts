import * as fs from 'fs';

// Function to create a JSON file
export function createJsonFile(filePath: string, data: object): void {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Function to modify an element in a JSON file
export function modifyJsonFile(filePath: string, key: string, value: any): void {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(fileData);
    jsonData[key] = value;
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
}

// Function to delete an element from a JSON file
export function deleteJsonElement(filePath: string, key: string): void {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(fileData);
    delete jsonData[key];
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');

}
