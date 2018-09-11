import React, {Component} from 'react';

class TagComponent extends Component {
    render () {
        const props = this.props;
        let Tag;
        if (props.TagLabelClass === 'Information') {
            Tag =
            (
                <div className="TagComponent">
                    <span className={props.TagLabelClass}>{props.TagLabel}</span>
                </div>
            );
        } else if (props.TagLabelClass === 'success') {
            Tag =
            (
                <span className={props.TagLabelClass}>{props.TagLabel}</span>
            );
        } else if (props.TagLabelClass === 'Warning') {
            Tag =
            (
                <span className={props.TagLabelClass}>{props.TagLabel}</span>
            );
        } else if (props.TagLabelClass === 'error') {
            Tag =
            (
                <span className={props.TagLabelClass}>{props.TagLabel}</span>
            );
        } else {
            Tag =
            (
                <span className={props.TagLabelClass}>{props.TagLabel}</span>
            );
        }
        return (
            <div className="TagComponent">
                {Tag}
            </div>
        );
    }
}

export default TagComponent;
