import { setshowloading } from "../Redux/Reducers/loadingSlice";
import store from "../Redux/store";
import instance from "./ApiConfig";
// import store from "../../Config/store.ts"; 

export const baseApiCall = async (config: any) => {
  store.dispatch(setshowloading(true))
  try {

    const response = await instance(config);

    console.log('response Api', response);

    if (response?.status >= 200 && response?.status < 300) {
      return response?.data;
    } else {
      throw new Error(`Unexpected status code: ${response?.status}`);
    }
  } catch (e: any) {
    console.log('API error', e);
    const errorMessage = e?.response?.data?.message || "An error occurred while making the request.";
    throw new Error(errorMessage);

  }
  finally {
    store.dispatch(setshowloading(false))
  }
};
