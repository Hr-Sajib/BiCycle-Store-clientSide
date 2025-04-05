import { baseApi } from "../../api/baseApi";
import { TProduct } from "./productSlice";


const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<TProduct[], void>({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductQuery } = productApi;