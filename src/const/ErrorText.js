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
    202:{
        text:'此目录下已经存在同名文件 : %s ，请删除后再试）。'
    },
    203:{
        text:'此目录下不为空 ，请删除后再试，或者打开递归删除开关。'
    },

    404:{
        text: '访问的远程地址 %s 没找到。'
    },

    500: {
        text: '后端逻辑错误：%s。'
    },
    501: {
        //text: 'hadoop文件%s没找到,this is a test for%s'
        text: '您无权访问 %s 文件（夹）'
    }
};

/**
 * 通过错误id来获取错误描述文本
 * @param errId 错误id
 * @param args  错误的相关参数
 * @returns {*}
 */
export function getErrMsg(errId, args,url) {

    let msg = errors[errId].text;
    for( const arg of args.split(',')){
        msg = msg.replace( '%s', arg);
    }
    return{
        url,
        msg
    }
    //return 'url: ' + url + '\n' + msg;
}