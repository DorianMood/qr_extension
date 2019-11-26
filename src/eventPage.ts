// Listen to messages sent from other parts of the extension.

import { MESSAGE_TYPE } from "./types";

console.log("This is background task.");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // onMessage must return "true" if response is async.
    let isResponseAsync = false;

    if (request.type === MESSAGE_TYPE.POPUP_MOUNT) {
        console.log('eventPage notified that Popup.tsx has mounted.');
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            console.log("sent to " + tabs.length)
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, {
                    type: MESSAGE_TYPE.POPUP_MOUNT
                });
            })
        });
    }

    if (request.type === MESSAGE_TYPE.PRICE_SEND) {
        console.log(request.payload);
        chrome.runtime.sendMessage({
            type: MESSAGE_TYPE.PRICE_SEND,
            payload: request.payload
        });
    }

    return isResponseAsync;
});
