import { Color } from './utils';
import os = require('os');

export function setEffect(hwnd: number, effect: number, dark: boolean, color: Color) {
    if (os.platform() == 'win32') {
        require('./windows/impl').setEffect(hwnd, effect, dark, color);
    }
}
