import React, {Component} from 'react';

class MenuItemComponent extends Component {
    render() {
        return (
            <li className={this.props.active}>
                <a
                    onClick={this.props.setActiveMenuItem}
                    data-refValue={this.props.name}
                    href={`#/Demo/Connected/${this.props.href}`}>
                    {this.props.name}
                </a>
            </li>
        );
    }
}

export default MenuItemComponent;
