import {DEBUG} from "../resources/constants";

export default function log(data: any){
  return DEBUG && console.log(data);
}