import React, {Component} from 'react';

import {defTimer, testAttempts} from "../MainComponent";

export class ShadowComponent extends Component {

    state = {
        attempts : testAttempts,
        style : false,
        testStringOuter : ' shadow',
        testStringInner : ' '
    };

    constructor(props, context) {
        super(props, context);

        setTimeout(this.swapStyle, defTimer);
    }

    swapStyle = () => {
        let {style, attempts} = this.state;
        style = !style;

        if (!style) {
            attempts --;
        }

        if (attempts !== 0) {
            setTimeout(this.swapStyle, defTimer);
        }

        this.setState( {
            style, attempts
        })
    };

    render() {
        const {style, testStringOuter, testStringInner} = this.state;

        return (
            <div className="test">
                <div className={'transition-object'+(style? testStringOuter : '')}>
                    <div className={'object '+(style? testStringInner : '')}>
                    </div>
                </div>
            </div>
        );
    }
}
