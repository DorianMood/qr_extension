import * as React from 'react';
import './Popup.scss';
import { QRCode } from "react-qrcode-logo";
import { MESSAGE_TYPE } from "../types";

interface AppProps { }

interface AppState {
    price: number;
    link: string;
}

export default class Popup extends React.Component<AppProps, AppState> {
    constructor(props: AppProps, state: AppState) {
        super(props, state);
        this.state = {
            link: "old",
            price: 0
        }
    }

    componentDidMount() {
        // Example of how to send a message to eventPage.ts.
        chrome.runtime.sendMessage({ type: MESSAGE_TYPE.POPUP_MOUNT });

        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.type === MESSAGE_TYPE.PRICE_SEND) {
                this.onRefresh(request.payload);
            }
        });
    }

    onRefresh(newValue) {
        this.setState({
            price: newValue.price,
            link: newValue.link
        });
    }

    render() {
        return (
            <>
                <QRCode
                    value={ JSON.stringify({ link: this.state.link, price: this.state.price }) }
                    qrStyle="dots"
                    size={ 300 }
                />
            </>
        )
    }
}
