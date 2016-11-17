import ApiService from 'services/ApiService';
import SecretConstants from 'constants/SecretConstants';
import UrlConstants from 'constants/UrlConstants';
import ActionConstants from 'constants/ActionConstants';
import async from 'async';
import Dropbox from 'dropbox';
import uuid from 'uuid';
import fs from 'fs';

export const uploadFile = (file) => {
    const dropbox = new Dropbox({ accessToken: SecretConstants.DROPBOX_ACCESS_TOKEN });
    return dropbox.filesUpload({ path: "/" + uuid.v4() + "/" + file.name, contents: file });
};

export const deleteFile = (path) => {
    const parentPath = path.substr(1, 36);
    const form = "root=sandbox&path="+parentPath;
    return ApiService.authenticatedFormPost(form, UrlConstants.DROPBOX_DELETE_FILE, SecretConstants.DROPBOX_ACCESS_TOKEN);
}

export const readFile = (path) => {
    return new Promise((resolve, reject) => {
        ApiService.authenticatedGet(UrlConstants.DROPBOX_READ_FILE + path, SecretConstants.DROPBOX_ACCESS_TOKEN)
        .then(res => {
            res.blob()
                .then(textRes => resolve(textRes))
                .catch(err => reject(err))
        })
        .catch(err => reject(err));
    });
}