const initialState = 
{
    clients: [],
    isAuthenticated: false,
    token: null,
    email: null,
    settings:
    {
        disableBalanceOnAdd: false,
        disableBalanceOnEdit: true,
        allowRegistration: true
    }
};

const reducer = (state=initialState, action) =>
{
    switch (action.type)
    {
        case 'GET_CLIENT':
            return {
                ...state,
                clients: action.value
            }
        case 'SET_TOKEN':
            return {
                ...state,
                isAuthenticated: true,
                token: action.value.token,
                email: action.value.email
            }
        case 'LOGOUT':
            return {
                ...state,
                clients: [],
                isAuthenticated: false,
                token: null,
                email: null
            }
        case 'DISABLE_BALANCE_ON_ADD':
            let newSettingsON_ON_ADD = {...state.settings};
            newSettingsON_ON_ADD.disableBalanceOnAdd = action.value;
            return {
                ...state,
                settings: newSettingsON_ON_ADD
            }
        case 'DISABLE_BALANCE_ON_EDIT':
            let newSettingsON_EDIT = {...state.settings};
            newSettingsON_EDIT.disableBalanceOnEdit = action.value;
            return {
                ...state,
                settings: newSettingsON_EDIT
            }
        case 'ALLOW_REGISTRATION':
            let newSettingsALLOW_REG = {...state.settings};
            newSettingsALLOW_REG.allowRegistration = action.value;
            return {
                ...state,
                settings: newSettingsALLOW_REG
            }
        case 'SET_SETTINGS':
            let newSettings = {...state.settings};
            newSettings = action.value;
            return {
                ...state,
                settings: newSettings
            }
        default:
            return state;
    }
}

export default reducer;