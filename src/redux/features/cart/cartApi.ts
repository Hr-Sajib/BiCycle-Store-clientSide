// import { baseApi } from "../../api/baseApi"; // Import CartItem type
// import { CartItem } from "./cartSlice";

// const cartApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getCart: builder.query<{ data: CartItem[] }, void>({
//       query: () => ({
//         url: "/order",
//         method: "GET",
//       }),
//     }),
//     addToCart: builder.mutation<{ data: CartItem[] }, CartItem>({
//       query: (item) => ({
//         url: "/cart",
//         method: "POST",
//         body: item,
//       }),
//     }),
//     removeFromCart: builder.mutation<{ data: CartItem[] }, string>({
//       query: (productId) => ({
//         url: `/cart/${productId}`,
//         method: "DELETE",
//       }),
//     }),
//     updateCartQuantity: builder.mutation<{ data: CartItem[] }, { productId: string; quantity: number }>({
//       query: ({ productId, quantity }) => ({
//         url: `/cart/${productId}`,
//         method: "PATCH",
//         body: { quantity },
//       }),
//     }),
//   }),
// });

// export const {
//   useGetCartQuery,
//   useAddToCartMutation,
//   useRemoveFromCartMutation,
//   useUpdateCartQuantityMutation,
// } = cartApi;