import ApiService from '../Services/ApiService';
import SecretConstants from '../Constants/SecretConstants';
import UrlConstants from '../Constants/UrlConstants';
import ActionConstants from '../Constants/ActionConstants';
import async from 'async';
import Dropbox from 'dropbox';
import uuid from 'uuid';
import fs from 'fs';

/**
 * Upload a file to the webserver
 * @param{File} files the file to upload
 * @return{Promise} contining the fileObject, or rejection error
 */
export const uploadFile = (files) => {
    return new Promise((resolve, reject) => {
        const xhr =  new XMLHttpRequest();
        var formData = new FormData();
        formData.append("files", files);
        xhr.open("POST", UrlConstants.FILE_SERVER + "file/upload");
        xhr.onload = (res) => {
            if(res.target.status != 201) reject(xhr.responseText);
            resolve(JSON.parse(xhr.responseText)); 
        }
        xhr.onerror = function(err) {
           reject(err);
        }
        
        xhr.send(formData);
    });
    //const dropbox = new Dropbox({ accessToken: SecretConstants.DROPBOX_ACCESS_TOKEN });
    //return dropbox.filesUpload({ path: "/" + uuid.v4() + "/" + file.name, contents: file });
};

/**
 * Delete a file from the webserver
 * @param{String} path the id of the file
 * @return{Promise} clean resolve, or rejection with error
 */
export const deleteFile = (path) => {
    //const parentPath = path.substr(1, 36);
    //const form = "root=sandbox&path="+parentPath;
    //return ApiService.authenticatedFormPost(form, UrlConstants.DROPBOX_DELETE_FILE, SecretConstants.DROPBOX_ACCESS_TOKEN);
    return ApiService.unauthenticatedDelete(UrlConstants.FILE_SERVER + "file/delete/" + path);
}

/**
 * Fetch a file from the webserver
 * @param{String} path the id of the file
 * @return{Promise} containing the blob of the file, or a rejection error
 */
export const readFile = (path) => {
    return new Promise((resolve, reject) => {
        ApiService.authenticatedGet(UrlConstants.FILE_SERVER + path, SecretConstants.DROPBOX_ACCESS_TOKEN)
        .then(res => {
            res.blob()
                .then(textRes => resolve(textRes))
                .catch(err => reject(err))
        })
        .catch(err => reject(err));
    });
}