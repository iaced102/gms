import { ElMessage } from "element-plus";

export function filterResponse(res: any, successCb: any, errorCb: any = null) {
    if (!successCb) {
        successCb = null;
    }
    if (!errorCb) {
        errorCb = null;
    }
    return new Promise((resolve) => {
        if (res && res.error === 0) {
            successCb && successCb(res);
        } else {
            errorCb
                ? errorCb(res)
                : ElMessage({
                      type: "error",
                      message: res.msg,
                      showClose: true,
                  });
        }
        resolve(res);
    });
}
