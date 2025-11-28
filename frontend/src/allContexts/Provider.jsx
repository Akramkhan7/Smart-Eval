// import { AuthProvider } from "./AuthContext";
// import { ThemeProvider } from "./ThemeContext";
import { ToastProvider } from "./ToastContext";

export const Providers = ({ children }) => {
  return (
    // <AuthProvider>
    //   <ThemeProvider>
        <ToastProvider>{children}</ToastProvider>
    //   </ThemeProvider>
    // </AuthProvider>
  );
};
