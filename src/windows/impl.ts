import os = require('os');
import ref = require('ref-napi');
import * as def from './lib/def';
import user32 from './lib/user32';
import dwmapi from './lib/dwmapi';
import { Color } from '../utils';

function GetWindowsVersion() {
    return parseInt(os.release().split('.')[2]);
}

let window_effect_last_ = 0;

function makeColor(color: Color) {
    return new Uint32Array(new Uint8Array([color.R, color.G, color.B, color.A]).buffer)[0];
}

export function setEffect(hwnd: number, effect: number, dark: boolean, color: Color) {
    user32.SetWindowCompositionAttribute(hwnd, {
        Attrib: user32.WINDOWCOMPOSITIONATTRIB.WCA_ACCENT_POLICY,
        pvData: user32.ACCENT_POLICY({
            AccentState: user32.ACCENT_STATE.ACCENT_DISABLED,
            AccentFlags: 2,
            GradientColor: 0,
            AnimationId: 0
        }).ref(),
        cbData: user32.ACCENT_POLICY.size,
    });
    if (GetWindowsVersion() >= 22523 && effect > 3) {
        dwmapi.DwmExtendFrameIntoClientArea(hwnd, {
            cxLeftWidth: -1,
        });
        let darkRaw = ref.alloc(def.BOOL, dark ? 1 : 0);
        dwmapi.DwmSetWindowAttribute(hwnd, dwmapi.DWMWINDOWATTRIBUTE.DWMWA_USE_IMMERSIVE_DARK_MODE, ref.ref(darkRaw), def.BOOL.size);
        let enable = ref.alloc(def.BOOL, 1);
        dwmapi.DwmSetWindowAttribute(hwnd, dwmapi.DWMWINDOWATTRIBUTE.DWMWA_SYSTEMBACKDROP_TYPE, ref.ref(enable), def.BOOL.size);
    } else {
        if (effect == 5) {
            if (GetWindowsVersion() >= 22000) {
                dwmapi.DwmExtendFrameIntoClientArea(hwnd, {
                    cxLeftWidth: -1,
                });
                let darkRaw = ref.alloc(def.BOOL, dark ? 1 : 0);
                dwmapi.DwmSetWindowAttribute(hwnd, dwmapi.DWMWINDOWATTRIBUTE.DWMWA_USE_IMMERSIVE_DARK_MODE, ref.ref(darkRaw), def.BOOL.size);
                let enable = ref.alloc(def.BOOL, 1);
                dwmapi.DwmSetWindowAttribute(hwnd, 1029, ref.ref(enable), def.BOOL.size);
            }
        } else {
            if (GetWindowsVersion() >= 22000 && window_effect_last_ == 5 ||
                GetWindowsVersion() >= 22523 && window_effect_last_ > 3) {
                dwmapi.DwmExtendFrameIntoClientArea(hwnd, {
                    cxLeftWidth: 0,
                    cxRightWidth: 0,
                    cyTopHeight: 1,
                    cyBottomHeight: 0
                });
                let enable = ref.alloc(def.BOOL, 0);
                dwmapi.DwmSetWindowAttribute(hwnd, dwmapi.DWMWINDOWATTRIBUTE.DWMWA_USE_IMMERSIVE_DARK_MODE, ref.ref(enable), def.BOOL.size);
                dwmapi.DwmSetWindowAttribute(hwnd, 1029, ref.ref(enable), def.BOOL.size);
            }
            user32.SetWindowCompositionAttribute(hwnd, {
                Attrib: user32.WINDOWCOMPOSITIONATTRIB.WCA_ACCENT_POLICY,
                pvData: user32.ACCENT_POLICY({
                    AccentState: effect,
                    AccentFlags: 2,
                    GradientColor: makeColor(color),
                    AnimationId: 0
                }).ref(),
                cbData: user32.ACCENT_POLICY.size
            });
        }
    }
    window_effect_last_ = effect;
}
