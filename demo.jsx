import React from 'react';

export const CONST_VALUE = 'I am Mr. Const';
class DemoClass extends React.Component {
    constructor() {
        super();
        console.log('Demo class loaded successfully');
        this.refreshDemoComp = this.refreshDemoComp.bind(this);
        this.state= {
          count: 123
        };
    }

    refreshDemoComp() {
        this.setState({});
    }

    render() {
        console.log('Demo class loaded successfully');
        return (
            <div>
                Hello Amdocs!!!!
                <button className="square" onClick={this.refreshDemoComp}>Refresh</button>
                <ButtonComp count={123}/>
            </div>
        );
    }
}

class ButtonComp extends React.Component {
    constructor(props) {
        super(props);
        console.log('Button Comp loaded successfully');
        console.log('Intial value: '+ props.count);
        this.buttonClickHandler = this.buttonClickHandler.bind(this);
        this.state = {
            count: props.count
        };
    }

    componentWillMount() {
        console.log('Button Comp is about to mount');
    }

    componentDidMount() {
        console.log('Button Comp mounted successfully');
    }

    componentWillReceiveProps(nextProps) {
        console.log('Button Comp received new props');
    }

    shouldComponentUpdate(props, nextProps) {
        console.log('should component update ?');
        return props.count !== nextProps.count;
    }

    componentWillUpdate(props, nextProps) {
        console.log('Button Comp will update after change in state/props');
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('Button Comp updated after change in state/props');
    }

    componentWillUnmount() {
        console.log('Button Comp will be destroyed soon...');
    }

    buttonClickHandler() {
        let currState = this.state;
        const count = currState.count + 1;
        currState = {...currState, count};
        console.log('Button Clicked. Count: ' + count);
        //is.setState(currState);
        this.state.count = count;
    }

    render() {
        console.log('Button component rendered successfully');
        return (
            <div>
                <button className="square" onClick={this.buttonClickHandler}>++</button>
                <p>Count: {this.state.count}</p>
            </div>
        );

    }
}

export default DemoClass;
