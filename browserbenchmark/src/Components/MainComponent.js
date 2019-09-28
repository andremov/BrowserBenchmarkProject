import React, {Component} from 'react';
import {TestComponent} from "./TestComponent";
import {testDB} from "../testDataSrc";

export const defTimer = 750;
export const testAttempts = 3;
export const testLength = 5;

const skip = 1;

export class MainComponent extends Component {

    state = {
        currentTest : 0,
        progress : 0,
        doSingle : false,
        doMulti : true,
        doBlock : false,
        doImg : true,
        doNoClip : false,
        doClip : true
    };

    constructor(props, context) {
        super(props, context);

        window.mainComponent = this;
    }

    componentDidMount() {
        setInterval(this.handleProgress,1000)
    }

    handleProgress = () => {
        let p = this.state.progress;
        let t = this.state.currentTest;
        if (testDB[t].timed) {
            if (p >= testLength) {
                t = this.getNextTest(t);
                p = -1;
            }
            this.setState({
                progress: p + 1,
                currentTest: t
            });
        }
    };

    setTestNumber = (test) => {
        if (test === 1) {
            test = skip;
        }
        this.setState({
            progress : 0,
            currentTest : test
        });
    };

    getNextTest(current) {
        const {doSingle, doMulti, doBlock, doImg, doClip, doNoClip} = this.state;
        let next;
        let found = false;

        for (next = current + 1; next < testDB.length-1; next ++){
            const {testData} = testDB[next];

            if (testData.doMulti && !doMulti)
                continue;

            if (!testData.doMulti && !doSingle)
                continue;

            if (testData.doCat && !doImg)
                continue;

            if (!testData.doCat && !doBlock)
                continue;

            if (testData.doClip && !doClip)
                continue;

            if (!testData.doClip && !doNoClip)
                continue;


            found = true;
            break;
        }

        if (!found)
            next = testDB.length-1;

        return next;
    }

    changeParameters = (doSingle, doMulti, doBlock, doImg, doClip, doNoClip) => {
        this.setState({
            doSingle, doMulti, doBlock, doImg, doClip, doNoClip
        })
    };

    startTests = () => {
        this.setState ({
            progress : 0,
            currentTest : this.getNextTest(0)
        })
    };

    render() {
        const {progress : p, currentTest : t} = this.state;
        const {testData} = testDB[t];

        return (
            <div>
                <div className='header'>
                    <span className='title'>Browser Benchmark</span>
                    {testDB[t].titled ?
                        <span className='subtitle'>{t + '. ' + testDB[t].name}</span> :
                        ''
                    }
                </div>

                { testDB[t].isTest ?
                    <TestComponent testData={testData} testNum={t}/>
                    :
                    testDB[t].comp
                }

                <div className='bar' style={{"width" : (((p/testLength)*100)+'%')}}>
                    <div className='progress'>
                    </div>
                </div>

                <div className='devs'>
                    <span className='title'>Desarrollado por:</span>
                    <span className='names'>Mario Donato, Jose Luis Martinez, y Andrés Movilla.</span>
                    <span className='year'>2019.</span>
                </div>
            </div>
        );
    }
}
