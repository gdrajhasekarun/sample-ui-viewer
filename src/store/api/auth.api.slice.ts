import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SessionResponse } from "../model/auth.model";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: "include", // This sends cookies with every request
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (build) => ({
    getSession: build.query<SessionResponse, void>({
      query: () => `session`,
    }),
  }),
});

export const { useLazyGetSessionQuery } = authApi;
