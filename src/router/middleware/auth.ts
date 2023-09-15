export default function auth(params: any) {
    if (localStorage.activeUser) {
        return params.next();
    }
    return params.next({ name: "Login" });
}
