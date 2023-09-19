/*
Efi Tzaig, 315852160
Yael Levi, 207196205
*/

import { DB_NAME, DB_VERSION, STORE_NAME } from "./utils/consts";

/**
 * Opens the IndexedDB database for managing cost data.
 *
 * @returns {Promise<IDBDatabase>} A promise that resolves to the opened database.
 */
export function openCostsDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            resolve(db);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

/**
 * Adds a cost item to the IndexedDB database.
 *
 * @param {IDBDatabase} db - The IndexedDB database.
 * @param {object} cost - The cost item to be added.
 * @returns {Promise<void>} A promise that resolves when the cost item is added.
 */
export function addCost(db, cost) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.add(cost);

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

/**
 * Get all cost items from the IndexedDB database.
 *
 * @param {IDBDatabase} db - The IndexedDB database.
 * @returns {Promise<object[]>} A promise that resolves to an array of cost items.
 */
export function getAllCosts(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}


/**
 * Deletes a cost item from the IndexedDB database.
 *
 * @param {IDBDatabase} db - The IndexedDB database.
 * @param {number} costId - The ID of the cost item to be deleted.
 * @returns {Promise<void>} A promise that resolves when the cost item is deleted.
 */
export function deleteCost(db, costId) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(costId);

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}