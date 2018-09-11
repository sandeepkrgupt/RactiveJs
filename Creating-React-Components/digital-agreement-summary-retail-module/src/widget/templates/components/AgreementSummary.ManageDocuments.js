import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import messages from 'digital-agreement-summary-retail-module/src/widget/AgreementSummary.i18n';

export default function ManageDocuments (manageDocumentsProps) {
    return (
        <div>
            <form name="maxImage" method="post" action={manageDocumentsProps.MAX_IMAGE_URL} target="_blank">
                <label hidden>
                    <input type="text" name="userID" value={manageDocumentsProps.MAX_IMAGE_USER_ID} hidden />
                    <input type="text" name="archiveID" value={manageDocumentsProps.archiveID} hidden />
                    <input type="text" name="origin" value={manageDocumentsProps.MAX_IMAGE_ORIGIN} hidden />
                    <input type="text" name="customerID" value={manageDocumentsProps.customerID} hidden />
                    <input type="text" name="password" value={manageDocumentsProps.MAX_IMAGE_PASSWORD} hidden />
                    <input type="text" name="ip" value={manageDocumentsProps.MAX_IMAGE_IP} hidden />
                </label>
                <input className="btn btn-link btn-manage-document" type="submit" value={messages.manageDocuments.defaultMessage} />
            </form>
        </div>
    );
}
