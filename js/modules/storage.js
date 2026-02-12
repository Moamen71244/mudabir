/**
 * Storage Module
 * Manages LocalStorage CRUD operations for Modabbar.
 */

export const getItems = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};

export const saveItems = (key, items) => {
    localStorage.setItem(key, JSON.stringify(items));
};

export const addItem = (key, item) => {
    const items = getItems(key);
    items.push({ id: Date.now(), ...item });
    saveItems(key, items);
};

export const updateItem = (key, id, updatedData) => {
    let items = getItems(key);
    items = items.map(item => item.id === id ? { ...item, ...updatedData } : item);
    saveItems(key, items);
};

export const deleteItem = (key, id) => {
    let items = getItems(key);
    items = items.filter(item => item.id !== id);
    saveItems(key, items);
};
