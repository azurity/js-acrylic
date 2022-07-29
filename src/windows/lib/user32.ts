import ffi = require('ffi-napi');
import ref = require('ref-napi');
import refStruct = require('ref-struct-di');
const Struct = refStruct(ref);

import { ENUM, BOOL, DWORD, SIZE_T, HWND } from './def';

const WINDOWCOMPOSITIONATTRIB = {
    WCA_UNDEFINED: 0,
    WCA_NCRENDERING_ENABLED: 1,
    WCA_NCRENDERING_POLICY: 2,
    WCA_TRANSITIONS_FORCEDISABLED: 3,
    WCA_ALLOW_NCPAINT: 4,
    WCA_CAPTION_BUTTON_BOUNDS: 5,
    WCA_NONCLIENT_RTL_LAYOUT: 6,
    WCA_FORCE_ICONIC_REPRESENTATION: 7,
    WCA_EXTENDED_FRAME_BOUNDS: 8,
    WCA_HAS_ICONIC_BITMAP: 9,
    WCA_THEME_ATTRIBUTES: 10,
    WCA_NCRENDERING_EXILED: 11,
    WCA_NCADORNMENTINFO: 12,
    WCA_EXCLUDED_FROM_LIVEPREVIEW: 13,
    WCA_VIDEO_OVERLAY_ACTIVE: 14,
    WCA_FORCE_ACTIVEWINDOW_APPEARANCE: 15,
    WCA_DISALLOW_PEEK: 16,
    WCA_CLOAK: 17,
    WCA_CLOAKED: 18,
    WCA_ACCENT_POLICY: 19,
    WCA_FREEZE_REPRESENTATION: 20,
    WCA_EVER_UNCLOAKED: 21,
    WCA_VISUAL_OWNER: 22,
    WCA_HOLOGRAPHIC: 23,
    WCA_EXCLUDED_FROM_DDA: 24,
    WCA_PASSIVEUPDATEMODE: 25,
    WCA_USEDARKMODECOLORS: 26,
    WCA_LAST: 27
};

const WINDOWCOMPOSITIONATTRIBDATA = Struct({
    'Attrib': ENUM,
    'pvData': 'pointer',
    'cbData': SIZE_T
});

const ACCENT_STATE = {
    ACCENT_DISABLED: 0,
    ACCENT_ENABLE_GRADIENT: 1,
    ACCENT_ENABLE_TRANSPARENTGRADIENT: 2,
    ACCENT_ENABLE_BLURBEHIND: 3,
    ACCENT_ENABLE_ACRYLICBLURBEHIND: 4,
    ACCENT_ENABLE_HOSTBACKDROP: 5,
    // ACCENT_INVALID_STATE: 6
};

const ACCENT_POLICY = Struct({
    'AccentState': ENUM,
    'AccentFlags': DWORD,
    'GradientColor': DWORD,
    'AnimationId': DWORD
});

const user32 = ffi.Library('user32.dll', {
    'SetWindowCompositionAttribute': [BOOL, [HWND, ref.refType(WINDOWCOMPOSITIONATTRIBDATA)]],
});

export default {
    SetWindowCompositionAttribute(hwnd: number, attr: Exclude<Parameters<typeof WINDOWCOMPOSITIONATTRIBDATA>[0], Buffer | undefined>) {
        const arg = WINDOWCOMPOSITIONATTRIBDATA(attr);
        let ret = user32.SetWindowCompositionAttribute(hwnd, arg.ref());
        return ret != 0;
    },

    WINDOWCOMPOSITIONATTRIB,
    WINDOWCOMPOSITIONATTRIBDATA,
    ACCENT_STATE,
    ACCENT_POLICY,
};