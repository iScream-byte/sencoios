import {deleteServiceAuthorized, getService, getServiceAuthorized, postService, postServiceAuthorized, postServiceFormData, postServiceFormDataAuthorized, putServiceAuthorized} from '../configs/FetchRequest';

const CartService = {};

CartService.myCartItems = (token) => getServiceAuthorized(
    `/cartManagement/api/v1/carts`,
    token
  );

CartService.updateCart = (payload, token) => putServiceAuthorized(
    `/cartManagement/api/v1/carts`,
    payload,
    token
  );
CartService.deleteItem = (payload, token) => deleteServiceAuthorized(
    `/cartManagement/api/v1/carts`,
    payload,
    token
  );
CartService.addToCart = (payload, token) => postServiceAuthorized(
    `/cartManagement/api/v1/carts`,
    payload,
    token
  );

CartService.checkoutOrder = (payload, token) => postServiceAuthorized(
    `/pointRedemptions/api/v1/orders`,
    payload,
    token
  );
  CartService.addToWishlist = (payload, token) => postServiceAuthorized(
    `/cartManagement/api/v1/wishlists`,
    payload,
    token
  );
  CartService.cartItemCount = (token) => getServiceAuthorized(
    `/cartManagement/api/v1/carts/count`,
    token
  );


export default CartService;