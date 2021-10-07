import React from 'react';// @ts-ignore
import { useHistory } from 'react-router-dom';// @ts-ignore
import { stringify } from 'querystring';// @ts-ignore
import { cache } from 'swr';// @ts-ignore
import { useMyInfo } from 'hooks';// @ts-ignore
import Paths from 'commons/paths';// @ts-ignore
import { isApp } from 'utils/lglifeUtils';// @ts-ignore
import { useCookies } from 'react-cookie';

const useCheckAuthTokens = () => {
    const history = useHistory();
    const { isAppLogined } = useMyInfo();
    const [, , removeCookie] = useCookies();

    const gotoLogin = () => {
        cache.clear();
        localStorage.clear();

        history.replace({
            pathname: Paths.getPath('login'),
            search: stringify({
                redirect: window.location.href,
            }),
        });
    };

    return {
        checkLogin() {
            if (!localStorage.getItem('llAccessToken') || !localStorage.getItem('llRefreshToken')) {
                gotoLogin();
            }
        },
        checkAppLogin() {
            if (isApp() && !isAppLogined()) {
                gotoLogin();
            }
        },
    };
};

export default useCheckAuthTokens;
