import React, {Component} from 'react';

class HyperLink extends Component {

    render() {
        const {props} = this;
        const {link, title, linkClass, onClickAction, text, linkclassName} = props;
        const className = linkClass ? `hyperlink ${linkClass}` : 'hyperlink';
        return (
            <div className={className} title={title}>
                <a className={linkclassName} href={link} onClick={onClickAction}>{text}</a>
            </div>
        );
    }
}

export default HyperLink;
