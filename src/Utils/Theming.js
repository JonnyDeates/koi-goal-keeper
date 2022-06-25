export function getMainColor(state){
    let colors;
    if(!(!!state.darkmode))
        colors = {Default: '#abceea', Bekko: '#eeeeee', Benigoi: "#d10300", Kigoi: "#e2b521",
        'Kin Showa': "#de4e07", Lucki: "#0cc61f", Platinum: "#84adea",Sanke: "#c3210d"}
    else
        colors = {Default: '#5d7283', Bekko: '#3f3f3f', Benigoi: "#800100", Kigoi: "#896900",
            'Kin Showa': "#953302", Lucki: "#067111", Platinum: "#425777",Sanke: "#821508"}
    const color = colors[state.theme];
    if(color === undefined){
        return colors.Default
    }
    return color;
}
export function getAccentColor(state) {
    let colors;
    if(!(!!state.darkmode))
        colors = {Default: '#84adea', Bekko: '#a09ea6', Benigoi: "#751b00", Kigoi: "#cd923b",
        'Kin Showa': "#676767", Lucki: "#009617", Platinum: "#49678a",Sanke: "#cccccc"}
    else
        colors = {Default: '#355ea1', Bekko: '#212121', Benigoi: "#420c00", Kigoi: "#5d4827",
            'Kin Showa': "#212121", Lucki: "#004811", Platinum: "#163256",Sanke: "#363636"}
    const color = colors[state.theme];
    if(color === undefined) {
        return colors.Default
    }
    return color;
}
export function getNeedColor(state) {
    let colors;
    if(!(!!state.darkmode))
        colors = {Default: '#EAC7AB', Bekko: '#cdcdcd', Benigoi: "#D16B00", Kigoi: "#AEE221",
            'Kin Showa': "#DEBA07", Lucki: "#56C60C", Platinum: "#84E0EA", Sanke: "#C30D54"}
    else
        colors = {Default: '#836E5D', Bekko: '#727272', Benigoi: "#804100", Kigoi: "#789C14",
            'Kin Showa': "#957D02", Lucki: "#317106", Platinum: "#427277", Sanke: "#820838"}

    const color = colors[state.theme];
    if(color === undefined){
        return colors.Default
    }
    return color;
}
export function getWantColor(state) {
    let colors;
    if(!(!!state.darkmode))
        colors = {Default: '#E6ABEA', Bekko: '#cdcdcd', Benigoi: "#D16B00", Kigoi: "#AEE221",
            'Kin Showa': "#DEBA07", Lucki: "#56C60C", Platinum: "#84E0EA", Sanke: "#C30D54"}
    else
        colors = {Default: '#815D83', Bekko: '#727272', Benigoi: "#804100", Kigoi: "#789C14",
            'Kin Showa': "#957D02", Lucki: "#317106", Platinum: "#427277", Sanke: "#820838"}

    const color = colors[state.theme];
    if(color === undefined){
        return colors.Default
    }
    return color;
}

export function getSavingsColor(state) {
    let colors;
    if(!(!!state.darkmode))
        colors = {Default: '#AFEAAB', Bekko: "#cdcdcd", Benigoi: "#D10065", Kigoi: "#E25521",
            'Kin Showa': "#DE072C", Lucki: "#0CC67C", Platinum: "#8E84EA", Sanke: "#C37C0D"}
    else
        colors = {Default: '#5F835D', Bekko: "#727272", Benigoi: "#80003F", Kigoi: "#9C3814",
            'Kin Showa': "#95021B", Lucki: "#067146", Platinum: "#484277", Sanke: "#825208"}

    const color = colors[state.theme];
    if(color === undefined){
        return colors.Default
    }
    return color;
}
export function getBgColor(state) {
    return {backgroundColor: getMainColor(state)}
};