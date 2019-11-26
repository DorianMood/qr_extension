import { MESSAGE_TYPE } from "../types";

const TAG_ID: string = "J_PromoPriceNum";

console.log("Content script loaded...");


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let element = document.getElementById(TAG_ID);

    // console.log(element);
    // console.log(parseFloat(element.innerText));

    let price = element ? parseFloat(element.innerText) : 0;
    let link = document.URL.toString();

    chrome.runtime.sendMessage({
        type: MESSAGE_TYPE.PRICE_SEND,
        payload: {
            price,
            link
        }
    });
});
