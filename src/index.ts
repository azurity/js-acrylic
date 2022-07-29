import { Color } from './utils';
import os = require('os');

export function setEffect(hwnd: number, effect: number, dark: boolean, color: Color) {
    if (os.platform() == 'win32') {
        require('./windows/impl').setEffect(hwnd, effect, dark, color);
    }
}

export enum Effect {
    disabled,

    /// Solid colored window background.
    /// Works on Windows & Linux.
    solid,

    /// Transparent window background.
    /// Works on Windows & Linux.
    transparent,

    /// Aero glass effect.
    /// Windows Vista & Windows 7 like glossy blur effect.
    /// Works only on Windows.
    aero,

    /// Acrylic is a type of brush that creates a translucent texture. You can apply acrylic to app surfaces to add depth and help establish a visual hierarchy.
    /// Works only on Windows 10 version 1803 or higher.
    acrylic,

    /// Mica is an opaque, dynamic material that incorporates theme and desktop wallpaper to paint the background of long-lived windows.
    /// Works only on Windows 11 or greater.
    mica,

    /// Tabbed is a Mica like material that incorporates theme and desktop wallpaper, but having more transparency.
    /// Works only on later Windows 11 versions (builds higher than 22523).
    tabbed,
};
