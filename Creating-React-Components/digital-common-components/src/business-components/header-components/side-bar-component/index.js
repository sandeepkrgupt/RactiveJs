import React, {Component} from 'react';


class SideBarComponent extends Component {

    render() {
        const sideBar = <div id="sidebar-wrapper" className="visible-xs">sideBar</div>;
        return (
            <div>{sideBar}</div>
        );
    }
}

export default SideBarComponent;
