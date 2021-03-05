'use strict';

const fs = require('fs');

// 移除目录
const rmDir = function(dirPath, removeSelf) {
    if (removeSelf === undefined) {
        removeSelf = true;
    }
    let files = null;
    try {
        files = fs.readdirSync(dirPath);
    } catch (e) {
        return;
    }
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath)
                .isFile()) {
                fs.unlinkSync(filePath);
            } else {
                rmDir(filePath);
            }
        }
    }
    if (removeSelf) {
        fs.rmdirSync(dirPath);
    }
};

const mkDir = dir => {
    try {
        fs.lstatSync(dir);
    } catch (e) {
        // 文件夹不存在
        // console.log(e);
        fs.mkdirSync(dir);
    }
};

// 驼峰转短划线
function camelToDash(key) {
    return key.replace(/([A-Z])/g, '-$1').toLowerCase();
}


module.exports = {
    rmDir,
    mkDir,
    camelToDash,
}
