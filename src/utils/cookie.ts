const tokenKey = "share_token";

export function getCookieToken() {
    const value = "; " + document.cookie;
    const parts = value.split("; " + tokenKey + "=") as any;
    if (parts.length === 2) return parts.pop().split(";").shift();
}

export function setCookieToken(value: any) {
    const now = new Date();
    const offset = 8;
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const nd = utc + 3600000 * offset;
    const exp = new Date(nd);
    const domain = document.domain;
    exp.setTime(exp.getTime() + 360 * 60 * 60 * 1000);
    document.cookie =
        tokenKey +
        "=" +
        escape(value) +
        ";path=/;expires=" +
        exp.toISOString() +
        ";domain=" +
        domain +
        ";";
}

export function deleteCookie() {
    document.cookie = tokenKey + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
