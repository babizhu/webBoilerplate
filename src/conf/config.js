/**
 * 适用于本机d配置文件，通常配置好之后，无需git同步，
 */


/**
 * 网络api的根路径
 * @type {string}
 */
//const host = 'http://localhost:8080';
//const host = 'http://192.168.1.5:8080';
const host = 'http://qtrj77.6655.la:8085';

const downloadHost = 'http://192.168.1.5';

export const BASE_URI = host + '/api/';

//上传文件的服务器地址，比较特殊，放这里
export const HADOOP_UPLOAD_URI = BASE_URI + 'hadoop/upload';

export const HADOOP_DOWNLOAD_URL = downloadHost + ':50070/webhdfs/v1%s?op=OPEN'