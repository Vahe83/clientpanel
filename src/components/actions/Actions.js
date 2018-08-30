export const setDisableBalanceOnAdd = () =>
{
    const settings = JSON.parse(localStorage.getItem('settings'));
    settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd;

    localStorage.setItem('settings', JSON.stringify(settings));

    return {
        type: 'DISABLE_BALANCE_ON_ADD',
        value: settings.disableBalanceOnAdd
    }
}

export const setDisableBalanceOnEdit = () =>
{
    const settings = JSON.parse(localStorage.getItem('settings'));
    settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit;

    localStorage.setItem('settings', JSON.stringify(settings));

    return {
        type: 'DISABLE_BALANCE_ON_EDIT',
        value: settings.disableBalanceOnEdit
    }
}

export const setAllowRegistration = () =>
{
    const settings = JSON.parse(localStorage.getItem('settings'));
    settings.allowRegistration = !settings.allowRegistration;

    localStorage.setItem('settings', JSON.stringify(settings));

    return {
        type: 'ALLOW_REGISTRATION',
        value: settings.allowRegistration
    }
}

export const logout = () =>
{
    window.location.reload();
    localStorage.clear();
    return {
        type: 'LOGOUT'
    }
}

export const setCheckBox = (settings) =>
{
    return {
        type: 'SET_SETTINGS',
        value: settings
    }
}

export const passToken = (data) =>
{
    return {
        type: 'SET_TOKEN',
        value: data
    }
}