const PaidRestrictions = {
    serializeColorStyle (paid_account, color_style)  {
        if(!paid_account)
            return 'Default';
        return color_style
    },
    serializeTheme(paid_account, theme) {
        if (!paid_account)
            return (theme === 'Default' ||theme === 'Bekko') ? theme : 'Default';
        return theme
    },
    seralizeTypeList(paid_account, type_list){
    if(!paid_account)
        return (type_list === 'Normal List'|| type_list === 'Short List') ? type_list : 'Normal List';
    return type_list
}
};
export default PaidRestrictions;
