module.exports = {
    baseUrl: "http://localhost:8082/",
    loginGrantUrl :  "http://localhost:8082/api/oAuth2Clients",
    loginUrl : "http://localhost:8082/uaa/oauth/token",
    messagesUrl: "http://localhost:8082/api/messageConversations",
    userQuery: "http://localhost:8082/api/users",
    fileUrl: "http://localhost:8082/api/fileResources",
    DROPBOX_DELETE_FILE: 'https://api.dropboxapi.com/1/fileops/delete',
    DROPBOX_READ_FILE: 'https://content.dropboxapi.com/1/files/auto/',
    FILE_SERVER : 'http://localhost:3200/'
}