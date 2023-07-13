// static class to save and recieve user info from localstorage

class LS {
    static setUserInfo(user: any) {
        localStorage.setItem('lpr64_user', JSON.stringify(user));
    }
    
    static getUserInfo() {
        const user = JSON.parse(localStorage?.getItem('lpr64_user') || 'null');
        return { user };
    }
    
    static removeUserInfo() {
        localStorage.removeItem('lpr64_user');
    }
}

export default LS;
