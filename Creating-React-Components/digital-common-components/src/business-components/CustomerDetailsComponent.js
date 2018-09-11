import React, {Component} from 'react';

class CustomerDetailsComponent extends Component {
    render () {
        const props = this.props;
        const {Icons = []} = this.props;
        let tabIndex = -1;
        return (
            <div className="container customerDetailSubComponent">
                <div className="row">
                    <div className="col-sm-8 col-sm-auto text-left">
                        <div className="customerName">
                            {props.CustomerName}
                        </div>
                        <div className="customerId">
                            {props.IdType} : {props.CustomerId}
                        </div>
                    </div>
                    <div className="col-sm-4 col-sm-auto">
                        <div className="row Icons">
                            <div className="divider-top hidden-sm-up" />
                            {Icons.map((item) => {
                                tabIndex += 1;
                                return (
                                    <div className="col-4 divider-right " key={item}>
                                        <i
                                            className="material-icons"
                                            onClick={() => props.handleIconClick(item)}
                                            tabIndex={tabIndex}
                                            role="link">
                                            {item}
                                        </i>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CustomerDetailsComponent;
