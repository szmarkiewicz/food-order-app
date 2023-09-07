import {DEBUG, METHOD} from "../resources/constants";
import logEvent from "./logger";

const fetcher = async (url: URL, method: METHOD, parserFunction?: Function, headers?: HeadersInit) => {
    return await fetch(url, {
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        method: method,
    }).then((response: Response) => {
        if (response.ok)
            return response.json();
        return new Error(DEBUG ? `Error occurred while performing ${method} request\nURL: ${url}\nError code: ${response.status}` : `Error occurred while fetching data.`);
    }).then((responseJson: any) => {
        return parserFunction ? parserFunction(responseJson) : responseJson;
    }).catch((error: Error) => {
        logEvent(error);
    });
}

export default fetcher;