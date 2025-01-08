import axios from "axios";
import { HTTP_METHODS } from "../constants/globals";

export const createApiRequest = async (
    url: string,
    method: HTTP_METHODS,
    data?: any
) => {
    const response = await axios({
        url,
        method,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        data,
    });
    return response.data;
};
