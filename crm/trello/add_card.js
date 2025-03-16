const Result = Object.freeze({
    SUCCESS: 'success',
    FAILURE: 'failure'
})

/**
 * Add a new card to Trello. If the column does not exist, it will be created.
 * @description This module provides functionality to add a new card to Trello.
 * @param {string} authToken - The authentication token for accessing the Trello API.
 * @param {string} title - The title of the card.
 * @param {string} description - The description of the card.
 * @param {string} listId - The ID of the list to add the card to.
 * @return {Result} - Returns the
 */
async function addCard(authToken, title, description, listId) {
    const fetch = require('node-fetch');

    const url = `https://api.trello.com/1/cards?key=YOUR_API_KEY&token=${authToken}`;
    const body = {
        name: title,
        desc: description,
        idList: listId
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}