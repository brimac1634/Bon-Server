import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import shopReducer from './shop/shop.reducer';
import galleryReducer from './gallery/gallery.reducer';
import menuReducer from './menu/menu.reducer';
import loadingReducer from './loading/loading.reducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cart']
}

const rootReducer = combineReducers({
	user: userReducer,
	cart: cartReducer,
	shop: shopReducer,
	gallery: galleryReducer,
	menu: menuReducer,
	loading: loadingReducer
})

export default persistReducer(persistConfig, rootReducer);