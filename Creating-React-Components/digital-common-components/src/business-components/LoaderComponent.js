import React, {Component} from 'react';

class LoaderComponent extends Component {
    render () {
        const style = {
            backgroundColor: 'black',
            backgroundSize: '50px',
            backgroundRepeat: 'no-repeat'
        };
        return (
            <div className="row">
                <div className="col-lg-12 text-center">
                    <div className="loader" style={style} />
                </div>
            </div>
        );
    }
}

export default LoaderComponent;
