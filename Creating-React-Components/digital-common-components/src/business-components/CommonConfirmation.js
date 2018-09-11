import React, {Component} from 'react';
import Label from '../controllers-components/Label';
import config from './config';

class CommonConfirmation extends Component {

    render() {
        const props = this.props;
        return (
            <div className="react-change-sim-confirmation container">
                <div className="container">
                    <section className="component-heading">
                        {props.heading ?
          (
              <Label
                  labelData={props.heading} />
      ) : ''
                          }
                        {props.customerMsisdn ?
                            (
                                <span>{props.customerMsisdn}</span>
                          ) : ''
                          }
                    </section>
                    {props.orderId ?
                            (
                                <section className="order-id">
                                    <span>Order ID: </span>
                                    <a href="">{props.orderId}</a>
                                </section>
                      ) : ''
                      }

                    <section className="order-confirmation">
                        <img src={config.tickmark} alt="order-confirm" />
                        <Label
                            labelClass="order-confirm-text"
                            labelData={props.message} />
                    </section>
                    {props.backLinkLabel ?
                            (
                                <a href="" className="back-link">{props.backLinkLabel}</a>
                      ) : ''
                    }
                </div>
            </div>
        );
    }
}

export default CommonConfirmation;
