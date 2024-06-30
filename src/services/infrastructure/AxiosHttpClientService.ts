import axios from "axios";
import AxiosHttpClient from "../../infrastructure/AxiosHttpClient";

export const AxiosHttpClientService = new AxiosHttpClient(axios);
