import { get } from './http'
export const forYou = (v1) => get(`http://192.168.172.227:3000/for_you_list`, v1);
export const following = (v1) => get(`http://192.168.172.227:3000/following_list`, v1);
