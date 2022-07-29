import ffi = require('ffi-napi');
import ref = require('ref-napi');
import refStruct = require('ref-struct-di');
const Struct = refStruct(ref);

import { DWORD, HRESULT, HWND } from './def';

const DWMWINDOWATTRIBUTE = {
    DWMWA_NCRENDERING_ENABLED: 0,
    DWMWA_NCRENDERING_POLICY: 1,
    DWMWA_TRANSITIONS_FORCEDISABLED: 2,
    DWMWA_ALLOW_NCPAINT: 3,
    DWMWA_CAPTION_BUTTON_BOUNDS: 4,
    DWMWA_NONCLIENT_RTL_LAYOUT: 5,
    DWMWA_FORCE_ICONIC_REPRESENTATION: 6,
    DWMWA_FLIP3D_POLICY: 7,
    DWMWA_EXTENDED_FRAME_BOUNDS: 8,
    DWMWA_HAS_ICONIC_BITMAP: 9,
    DWMWA_DISALLOW_PEEK: 10,
    DWMWA_EXCLUDED_FROM_PEEK: 11,
    DWMWA_CLOAK: 12,
    DWMWA_CLOAKED: 13,
    DWMWA_FREEZE_REPRESENTATION: 14,
    DWMWA_PASSIVE_UPDATE_MODE: 15,
    DWMWA_USE_HOSTBACKDROPBRUSH: 16,
    DWMWA_USE_IMMERSIVE_DARK_MODE: 20,
    DWMWA_WINDOW_CORNER_PREFERENCE: 33,
    DWMWA_BORDER_COLOR: 34,
    DWMWA_CAPTION_COLOR: 35,
    DWMWA_TEXT_COLOR: 36,
    DWMWA_VISIBLE_FRAME_BORDER_THICKNESS: 37,
    DWMWA_SYSTEMBACKDROP_TYPE: 38,
    DWMWA_LAST: 39
};

const MARGINS = Struct({
    'cxLeftWidth': ref.types.int32,
    'cxRightWidth': ref.types.int32,
    'cyTopHeight': ref.types.int32,
    'cyBottomHeight': ref.types.int32
});

const dwmapi = ffi.Library('dwmapi.dll', {
    'DwmExtendFrameIntoClientArea': [HRESULT, [HWND, ref.refType(MARGINS)]],
    'DwmSetWindowAttribute': [HRESULT, [HWND, DWORD, 'pointer', DWORD]],
});

export default {
    DwmExtendFrameIntoClientArea(hwnd: number, margin: Exclude<Parameters<typeof MARGINS>[0], Buffer | undefined>) {
        return dwmapi.DwmExtendFrameIntoClientArea(hwnd, MARGINS(margin).ref());
    },
    DwmSetWindowAttribute(hwnd: number, dwAttribute: number, pvAttribute: ref.Pointer<unknown>, cbAttribute: number) {
        return dwmapi.DwmSetWindowAttribute(hwnd, dwAttribute, pvAttribute, cbAttribute);
    },

    DWMWINDOWATTRIBUTE,
    MARGINS,
}