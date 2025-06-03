import { Toast } from "@/app/components/toast/toast";
import { AxiosError } from "axios";
import { get } from "es-toolkit/compat";
import { call, put, take } from "redux-saga/effects";
import { toastService } from "@/app/components/toast/toast.service";
import { AuthActions } from "../actions";

export default function* callApi<
  Fn extends (...args: Parameters<Fn>) => ReturnType<Fn>
>(func: Fn, ...args: Parameters<Fn>) {
  try {
    const result: ReturnType<Fn> = yield call(func, ...args);
    return result;
  } catch (err) {
    console.error(
      "[API] ",
      func,
      get(err, "response.data.error", err as string)
    );
    if (err instanceof AxiosError) {
    }
    throw err;
  }
}

export function handleLoadingStart(formId?: string) {}

export function clearFormValues(formId?: string) {}

export function handleLoadingEnd(formId?: string) {}

export function handleError(error: any, showErrorToast: boolean) {
  try {
    const message =
      get(error, "response.data.message") ||
      get(error, "response.data.error") ||
      get(error, "message") ||
      "Đã xảy ra lỗi không xác định.";

    const formattedMessage = Array.isArray(message)
      ? message.join(", ")
      : message;

    if (showErrorToast) {
      toastService.show({
        title: "Lỗi",
        description: formattedMessage,
        variant: "error",
      });
    }
  } catch (e) {
    console.error("Lỗi khi xử lý handleError:", e);
  }
}

/**
 * Gọi API function `apiFn` với args,
 * nếu 401 thì tự động dispatch refresh, chờ kết quả
 * và retry lại 1 lần. Nếu vẫn lỗi, throw tiếp.
 */
export function* callApiWithRefresh<T>(
  apiFn: (...args: any[]) => Promise<T>,
  ...args: any[]
): Generator<any, T, any> {
  try {
    return yield call(apiFn, ...args);
  } catch (err: any) {
    if (err.response?.status === 401) {
      yield put(AuthActions.refreshToken.request());
      const result = yield take([
        AuthActions.refreshToken.success,
        AuthActions.refreshToken.failure,
      ]);
      if (result.type === AuthActions.refreshToken.success.toString()) {
        return yield call(apiFn, ...args);
      } else {
        
      }
      
    }
    throw err;
  }
}
