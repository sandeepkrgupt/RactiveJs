/**
 * The Upload Attachment Component to have a Common process for File Attachment.
 *
 * @Properties Expected from Parent Component.
 *
 * @param allowedSize: The Max Size of the Document allowed to Upload.
 *  (The Size must be specified in Bytes for More Granular Validation,
 *  1024 Bytes = 1KB as Browser API displays the Size of file in Bytes.).
 *  If this is not specified, then any size of file will be allowed to Upload.
 * @param allowedCount: The Max Number of Files to allow to upload.
 *  If not specified, then any number of files can be uploaded.
 * @param fileType: The Type of Files allowed to upload. If not passed, then any type of files can be uploaded.
 *  NOTE: (Did'nt checked the File Type after upload, as a Single Type of File can have other Extention also.)
 * @param heading: The Heading for this Core Component.
 * @param browseText: The Text for Browse Button. Default it will use <code>Browse</code>
 * @param handleFileUpload: The Method reference to call when the file is uploaded.
 *  This will be an Atomic Call so that Parent will know after each file Selection.
 *
 * @Date: 13th Sep 2017.
 */
import React, {Component} from 'react';
import Label from '../controllers-components/Label';
/** Import Styles. */


class UploadAttachment extends Component {

    constructor(props) {
        super(props);
        const {allowedSize, allowedCount} = props;
        this.state = {
            allowedCount,
            allowedSize,
            invalidSize: false
        };
        this.handleFileSelection = this.handleFileSelection.bind(this);
        this.handleFileDeletion = this.handleFileDeletion.bind(this);
    }

    handleFileDeletion(event) {
        const {state} = this;
        const blackFuction = () => {};
        const {handleFileUpload = blackFuction} = this.props;
        const target = event.target;
        const parentElement = target.parentElement;
        const grandParent = parentElement.parentElement;
        const listOfAttachmentItems = grandParent.getElementsByClassName('upload-image');
        const listOfAttachments = [];
        for (let attachmentIndex = 0; attachmentIndex < listOfAttachmentItems.length; attachmentIndex += 1) {
            listOfAttachments.push(listOfAttachmentItems.item(attachmentIndex));
        }
        const {attached = []} = state;
        const index = listOfAttachments.indexOf(parentElement);
        const changedAttached = [...attached.slice(0, index), ...attached.slice(index + 1)];
        if (changedAttached.length === 0) {
            target.value = '';
        }
        handleFileUpload(changedAttached);
        this.setState({attached: changedAttached});
    }

    handleFileSelection(event) {
        const {state, props} = this;
        this.setState({invalidSize: false});
        const files = event.target.files;
        const file = files[0];
        const {attached = [], allowedSize, allowedCount} = state;
        const blackFuction = () => {};
        const {handleFileUpload = blackFuction} = props;
        if (attached.length < allowedCount) {
            if (file.size <= allowedSize) {
                attached.push(file);
                this.setState({attached});
                handleFileUpload(attached);
            } else {
                this.setState({invalidSize: true});
            }
        }
    }

    render() {
        const {props, state} = this;
        const {heading, browseText, fileType, allowedCount, errorMessage, errorClass} = props;
        const {attached = [], invalidSize} = state;
        const isDisabled = attached.length === allowedCount;
        return (
            <div className="upload-attachment-core">
                <Label
                    labelClass="upload-heading"
                    labelData={heading} />
                <div className="attachments">
                    {attached.map((item, key) =>
                        (<div className="upload-image" key={[key, 'attached'].join('_')}>
                            <span className="Upload-text">{item.name}</span>
                            <i
                                tabIndex="-1"
                                className="float-right material-icons"
                                role="button"
                                onClick={this.handleFileDeletion}>close</i>
                        </div>)
                    )}
                </div>
                <div className="upload-input">
                    <input type="file" accept={fileType} onChange={this.handleFileSelection} disabled={isDisabled} />
                    <i className="material-icons">file_upload</i>
                    <span className="Upload-text">{browseText}</span>
                </div>
                {invalidSize && (<span className={`${errorClass} error-message`}>{errorMessage}</span>)}
            </div>
        );
    }
}

export default UploadAttachment;
