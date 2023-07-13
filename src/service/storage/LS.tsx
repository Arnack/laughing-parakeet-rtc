// static class to save and recieve user info from localstorage

class LS {
    static setUserInfo(user: any) {
        if (typeof window !== 'undefined') {
            localStorage?.setItem('lpr64_user', JSON.stringify(user));
        }
    }

    static getUserInfo() {
        if (typeof window !== 'undefined') {
            const user = JSON.parse(localStorage?.getItem('lpr64_user') || 'null');
            return { user };
        }
        else {
            return { user: {} };
        }
    }

    static removeUserInfo() {
        if (typeof window !== 'undefined') {
            localStorage?.removeItem('lpr64_user');
        }
    }
}

export default LS;
