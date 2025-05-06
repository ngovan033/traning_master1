import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "./App";
import "./index.css";
import "./polyfills";
import reportWebVitals from "./reportWebVitals";
import "./styles.scss";
import "./styling/main_styling.scss";
// @ts-ignore
// import { worker } from './mocks/browser';
import { AuthProvider } from "@packages/contexts/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import "./i18n/config";
import LoadPanelConfig from "./packages/components/loadPanel/LoadPanel";
import Error from "./packages/ui/error/error";
import { PopupMultiAPI } from "./packages/ui/HandleMultiAPI/showData-multiAPI";

if (import.meta.env.DEV) {
  // worker.start();
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      refetchOnMount: "always", // call api when component mounted
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
    },
  },
});

root.render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Suspense>
        <App />
        <LoadPanelConfig />
        <PopupMultiAPI />
      </Suspense>
    </AuthProvider>
    <Error />
    <ToastContainer
      className="toaster-container"
      position="top-right"
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover={true}
    />{" "}
    {/* <ReactQueryDevtools /> */}
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
