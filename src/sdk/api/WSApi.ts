
import Axios, { AxiosInstance } from 'axios';
import storage from '../common/Storage';
import Cookie from 'js-cookie';
import Auth from '@/sdk/common/Auth';
import Vue from 'vue';
import { ApiVersion, ApiServer } from '../common/SysConst';
import i18n from '@/lang';
class WSAPI {
  debug: boolean = true;
  apiHost: string = '';
  apiPath: string = this.apiHost + '/' + ApiVersion;
  controller: Object[];
  qs = require('qs');
  lang: string = i18n.locale;
  msgTitle: string = (i18n.messages[this.lang].Message as any).Title;
  codeMessage: object = {
    400: (i18n.messages[this.lang].Message as any).msg400,
    401: (i18n.messages[this.lang].Message as any).msg401,
    404: (i18n.messages[this.lang].Message as any).msg404,
    500: (i18n.messages[this.lang].Message as any).msg500,
    502: (i18n.messages[this.lang].Message as any).msg502,
    503: (i18n.messages[this.lang].Message as any).msg503
  }

  get instance () :AxiosInstance {
    let ins = Axios.create({
      //  baseURL: this.apiPath,
      timeout: 10000,
      headers: { 'Authorization': 'bearer ' + Cookie.get('access_token') }// storage.get('access_token')
    });
    ins.interceptors.request.use(config => {
      let contentType = config.headers.contentType;
      config.method === 'post'
        ? config.data = !contentType || contentType === 'application/x-www-form-urlencoded' ? this.qs.stringify({ ...config.data }) : config.data
        : config.params = { ...config.params };
      if (!contentType) config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      if (storage.get('timeout') < new Date().getTime()) throw new Error('timeout'); // 如已超時則在請求前打斷
      return config;
    }, error => { // 请求错误处理
      console.log(error);
    }
    );
    ins.interceptors.response.use(
      response => {
        storage.set(
          'timeout',
          storage.get('expires') * 1000 + new Date().getTime()
        );
        return Promise.resolve(response);
      },
      error => {
        Vue.prototype.$HiddenLayer();
        if (!error.response && error instanceof Error) {
          Vue.prototype.Shake(() => {
            Cookie.remove('access_token');
            Auth.GetToken().then(() => Vue.prototype.Reload());
          });

          return Promise.reject(error);
        };
        let status = error.response.status;
        if (status === 403) {
          Vue.prototype.Shake(() => {
            Cookie.remove('access_token');
            Auth.GetToken().then(() => Vue.prototype.Reload());
          });
        } else {
          Vue.prototype.$Confirm(this.msgTitle, this.codeMessage[status]);
        }
      }
    );
    return ins;
  }
  constructor () {
    this.apiHost = this.getPMHost();
    this.controller = Object[2];
  }
  log (arg1: any, arg2?: any) {
    if (this.debug) {
      console.log(arg1);
      if (arg2 !== undefined) {
        console.log(arg2);
      }
    }
  }

  getPMHost = function () {
    return ApiServer;
  };
}

export { WSAPI };
