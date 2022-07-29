export const Effect = {
    disabled: 0,

    /// Solid colored window background.
    /// Works on Windows & Linux.
    solid: 1,

    /// Transparent window background.
    /// Works on Windows & Linux.
    transparent: 2,

    /// Aero glass effect.
    /// Windows Vista & Windows 7 like glossy blur effect.
    /// Works only on Windows.
    aero: 3,

    /// Acrylic is a type of brush that creates a translucent texture. You can apply acrylic to app surfaces to add depth and help establish a visual hierarchy.
    /// Works only on Windows 10 version 1803 or higher.
    acrylic: 4,

    /// Mica is an opaque, dynamic material that incorporates theme and desktop wallpaper to paint the background of long-lived windows.
    /// Works only on Windows 11 or greater.
    mica: 5,

    /// Tabbed is a Mica like material that incorporates theme and desktop wallpaper, but having more transparency.
    /// Works only on later Windows 11 versions (builds higher than 22523).
    tabbed: 6,
}

export interface Color {
    R: number
    G: number
    B: number
    A: number
};
