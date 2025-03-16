/**
 * Iterates over each element in a collection and applies the provided function.
 * @param {Array|Object} collection - The collection to iterate over.
 * @param {Function} callback - The function to apply to each element.
 */
async function foreach(collection, callback) {
    if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
            await callback(collection[i], i);
        }
    } else if (typeof collection === 'object') {
        for (const key in collection) {
            if (collection.hasOwnProperty(key)) {
                await callback(collection[key], key);
            }
        }
    }
}