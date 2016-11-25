var jsdom = require('jsdom');

global.document = jsdom.jsdom('<!doctype html><html><head></head><body></body></html>');
global.window = document.defaultView;
global.view = {};
global.navigator = {userAgent: 'node.js'};
