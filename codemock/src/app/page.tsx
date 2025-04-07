// app/providers.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "@/store/redux";
import rootSaga from "@/store/redux-saga";
import {
  ToastProvider,
  ToastViewport,
  Toast,
} from "@/app/components/toast/toast";
import { toastService } from "./components/toast/toast.service";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

interface ProvidersProps {
  children: ReactNode;
}

// ✅ Toast Wrapper
function GlobalToast() {
  const [toasts, setToasts] = useState<
    { id: string; title: string; description: string; variant?: string }[]
  >([]);

  useEffect(() => {
    toastService.setHandler(({ title, description, variant }) => {
      const id = Math.random().toString();
      setToasts((prev) => [...prev, { id, title, description, variant }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    });
  }, []);

  return (
    <ToastProvider>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          title={toast.title}
          description={toast.description}
          variant={toast.variant as any}
        />
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}

export function App({ children }: ProvidersProps) {
  return (
    <ReduxProvider store={store}>
      <GlobalToast />
      {children}
    </ReduxProvider>
  );
}
