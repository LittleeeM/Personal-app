import { message } from 'antd';
import * as api from '../api/register';

export function getCaptcha(payload = {}) {
  return async () => {
    const result = await api.getCaptcha(payload);
    console.log(result);
    //const { data: { code, message: msg, data: { captcha }}} = await api.getCaptcha(payload);
    //if (code === 20018) {
    //  message.success(`${msg}, 验证码为${captcha}`);
    //} else {
    //  message.error(msg);
    //}
  }
}
