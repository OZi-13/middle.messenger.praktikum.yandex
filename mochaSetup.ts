import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost:3000',
});

(global as any).window = jsdom.window;
(global as any).document = jsdom.window.document;
(global as any).Node = jsdom.window.Node;
(global as any).MouseEvent = jsdom.window.MouseEvent;
(global as any).XMLHttpRequest = jsdom.window.XMLHttpRequest;
(global as any).FormData = jsdom.window.FormData;
