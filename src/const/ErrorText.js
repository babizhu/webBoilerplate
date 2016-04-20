/**
 * Created by liukun on 16/4/17.
 * 错误提示文本
 * 序号1000以下请保留系统使用
 */

const errors = {
    200:{
      text:'远程网络无法连接,超时退出。'
    },
    201:{
        text:'访问的远程地址 %s 拒绝连接。'
    },

    404:{
        text: '访问的远程地址 %s 没找到。'
    },

    500: {
        text: '服务器异常:%s。'
    },
    501: {
        text: 'hadoop文件%s没找到,this is a test for%s'
    }
};

/**
 * 通过错误id来获取错误描述文本
 * @param errId 错误id
 * @param args  错误的相关参数
 * @returns {*}
 */
export function getErrMsg(errId, args) {

    let msg = errors[errId].text;
    for( const arg of args.split(',')){
        msg = msg.replace( '%s', arg);
    }
    return msg;
}