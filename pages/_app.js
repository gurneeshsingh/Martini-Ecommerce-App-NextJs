import 'tailwindcss/tailwind.css';
import "../styles/global.css";
import { Provider} from "react-redux";
import { store, persistor } from "../Redux/store";
import { PersistGate } from 'redux-persist/integration/react';




function MyApp({ Component, pageProps }) {

  return <Provider store={store}><PersistGate loading={null} persistor={persistor}><Component {...pageProps} /></PersistGate></Provider>
}

export default MyApp
