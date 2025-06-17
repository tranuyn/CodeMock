// app/providers.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "@/store/redux";
import rootSaga from "@/store/redux-saga";
import {
  ToastProvider,
  ToastViewport,
  Toast,
} from "@/app/components/toast/toast";
import { toastService } from "./components/toast/toast.service";
import AppBarWrapper from "./components/AppBar/AppBarWrapper";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import authReducer from "@/store/redux/auth-state";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
};
const persistedRootReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

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
          variant={
            toast.variant as
              | "default"
              | "success"
              | "warning"
              | "error"
              | "primary"
          }
        />
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}

export default function App({ children }: ProvidersProps) {
  useEffect(() => {
    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = "https://embed.tawk.to/6851b471f6b5691912928190/1itvihnp0";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    document.body.appendChild(s1);
  }, []);
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalToast />
        <AppBarWrapper />
        {children}
      </PersistGate>
    </ReduxProvider>
  );
}
