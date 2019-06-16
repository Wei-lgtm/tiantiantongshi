//加载crypto模块  
var crypto = require("crypto");

//MD5加密
export function md5(str){
	var md5 = crypto.createHash('md5');
	md5.update(str);
	str = md5.digest('hex');
	return str;
}

//aes192 加密长度256？ 太长  废弃
let key = 'abc'
//AES加密
export function aesEncrypt(data) {
	const cipher = crypto.createCipher('aes192', key);
	var crypted = cipher.update(data, 'utf8', 'hex');
	crypted += cipher.final('hex');
	return crypted;
}

//AES解密
export function aesDecrypt(encrypted) {
	const decipher = crypto.createDecipher('aes192', key);
	var decrypted = decipher.update(encrypted, 'hex', 'utf8');
	decrypted += decipher.final('utf8');
	return decrypted;
}

