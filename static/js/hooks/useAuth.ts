// @ts-ignore
import { fetcher } from 'services';

const useAuth = () => {
    return {
        putCicUserInfo() {
            return fetcher.auth.putCicUserInfo();
        },
        postConfirmMember(email: string, empNum: string) {
            return fetcher.auth.postConfirmMember({ email, empNum });
        },
        postFindPassword(name: string, email: string, groupCode: string) {
            return fetcher.auth.postFindPassword({ name, email, groupCode });
        },
        postSignIn(email: string, password: string) {
            return fetcher.auth.postSignIn({ email, password });
        },
        postSignOut() {
            return fetcher.auth.postSignOut({});
        },
        postSignUp(
            department: string,
            email: string,
            empNum: string,
            groupCode: string,
            hiredYmd: string,
            intrKeywordList: string[],
            jobCode: 'PRODUCTION' | 'OFFICE' | 'DEVELOP' | 'SALES' | 'ETC',
            name: string,
            password: string,
            phoneNum: string,
            positionNm: string,
        ) {
            return fetcher.auth.postSignUp({
                department,
                email,
                empNum,
                groupCode,
                hiredYmd,
                intrKeywordList,
                jobCode,
                name,
                password,
                phoneNum,
                positionNm,
            });
        },
        postSSOCheck(secureSessionId: string, secureToken: string, clientIp: string) {
            return fetcher.auth.postSSOCheck({ secureSessionId, secureToken, clientIp });
        },
        getTokenRefresh(refreshToken: string) {
            return fetcher.auth.postTokenRefresh({ refreshToken });
        },
    };
};
export default useAuth;
