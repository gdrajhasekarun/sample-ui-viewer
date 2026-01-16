import { Box } from "@mui/material";
import { ReactNode, useEffect } from "react";
import { useLazyGetSessionQuery } from "../store/api/auth.api.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { saveSession } from "../store/feature/auth.slice";

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const tokenCreationTime = useSelector(
    (state: RootState) => state.authState.createdTime
  );
  const tokenValidaity = useSelector(
    (state: RootState) => state.authState.sessionResponse?.claims.exp
  );
  const [triggerSession, { data: token, isSuccess, error }] =
    useLazyGetSessionQuery();

  useEffect(() => {
    const checkToken = () => {
      // If no token creation time, always fetch
      if (!tokenCreationTime) {
        triggerSession();
        return;
      }

      // Parse token validity (exp) as ISO date string
      const expDate = tokenValidaity ? new Date(tokenValidaity) : undefined;
      const nowMs = Date.now();

      // If validity is not available, always fetch
      if (!expDate || isNaN(expDate.getTime())) {
        triggerSession();
        return;
      }

      // Calculate pre-expiry trigger time: exp - 5 minutes
      const preExpiryMs = expDate.getTime() - 5 * 60 * 1000;
      const timeLeftMs = preExpiryMs - nowMs;

      // If token validity is less than or equal to 5 minutes, trigger session fetch
      if (timeLeftMs <= 0) {
        triggerSession();
        return;
      }
      // If token is expired, fetch new session
      if (expDate.getTime() <= nowMs) {
        triggerSession();
        return;
      }
      // Otherwise, do nothing
    };

    checkToken(); // Initial check
    const interval = setInterval(checkToken, 240000); // Check every 4 minutes
    return () => clearInterval(interval);
  }, [tokenCreationTime, tokenValidaity]);

  useEffect(() => {
    if (
      error &&
      typeof error === "object" &&
      "status" in error &&
      error.status === 401
    ) {
      console.warn("401 Unauthorized, redirecting to login...");
      const backendBaseUrl = import.meta.env.VITE_API_BASE_URL;
      window.location.assign(
        `${backendBaseUrl.replace(
          /\/$/,
          ""
        )}/bff/login?redirect=${encodeURIComponent(window.location.origin)}`
      );
    } else if (token) {
      dispatch(saveSession({ token }));
    }
  }, [isSuccess, error]);

  return <Box>{children}</Box>;
};

export default ProtectedRoute;
