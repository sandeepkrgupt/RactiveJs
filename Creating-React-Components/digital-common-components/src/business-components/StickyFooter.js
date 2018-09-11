import React, {Component} from 'react';
import Accordion from '../controllers-components/Accordion/Accordion';
import Button from '../controllers-components/Button';

class StickyFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newStyle: {
                marginTop: 0
            }
        };
        this.setFooterHeight = this.setFooterHeight.bind(this);
        this.getProductView = this.getProductView.bind(this);
    }

    getProductView() {
        const props = this.props;
        return (
            <div className="col-12 products">
                <div className="row">
                    <div className="col-6 text-center">
                        <div className="item">{props.FooterProduct}</div>
                    </div>
                    <div className="col-3 text-center">
                        <div className="Quantity">{props.FooterQuantity}</div>
                    </div>
                    <div className="col-3 text-center">
                        <div className="Price">{props.FooterPrice}</div>
                    </div>
                </div>
                {props.ProductCount.map((items, index) => {
                    return (
                        <div className="row" key={items.updateProduct} id={`Selected_ ${index}`}>
                            <div className="col-6">
                                <div className="mt-2 text-left">
                                    <span className="updateProduct">{items.updateProduct}</span>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="mt-2 text-center updateProduct">{items.updateItem}</div>
                            </div>
                            <div className="col-3">
                                <div className="mt-2 totalPrice text-right">
                                    {items.UpdateAmount}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    setFooterHeight(el) {
        let footerHeight = '70px';
        try {
            footerHeight = el.offsetHeight;
        } catch (e) {
            console.error(`caught error setting offsetHeight on stickFooter: ${e}`);
        }
        this.setState({
            newStyle: {
                marginTop: footerHeight
            }
        });
    }

    render () {
        const props = this.props;
        return (
            <div className="StickyFooter">
                <div className="container-fluid" style={this.state.newStyle}>
                    <div className="row py-2" id="stickyFooter" ref={this.setFooterHeight}>
                        <div className="col-6">
                            <span className="TotalPrice">
                                {props.FooterPriceLabel}
                            </span>
                            <div className="devicePrice">
                                {props.FooterTotalPrice}
                            </div>
                        </div>
                        <div className="col-6">
                            <Button
                                buttonType="button"
                                buttonClass="float-right button-bg "
                                clickEvent={props.cartClick}
                                buttonLabel={props.footerbuttonLabel} />
                        </div>
                        <div className="col-12">
                            <Accordion
                                AccordionClass=""
                                accordionOpen={props.footeraccordionOpenLabel}
                                accordionClosed={props.footeraccordionCloseLabel}>
                                <div className="table">
                                    {this.getProductView(props)}
                                </div>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StickyFooter;
