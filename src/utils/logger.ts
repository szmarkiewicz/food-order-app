import {DEBUG} from "../resources/constants";

export default function logEvent(data: any){
  return DEBUG && console.log(data);
}