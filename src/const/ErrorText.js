/**
 * Created by liukun on 16/4/17.
 */

const errors = {

    500: {
        text: 'hadoop文件 %s 没找到'
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