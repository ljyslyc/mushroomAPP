// Author: Haohao Zhang<hyacinth.hao@foxmail.com>
// CreateTime: 2017-06-07 16:16
// function:
//    getPersistentImage(ImageUri, fileName)
//    writeRecords(dataObj)
//    writeTemplate(dataObj)
//    readTemplate(successfulCallback)

/**
 * 持久化存储图片
 * @param {string} ImageUri 缓存图片地址
 * @param {string} fileName 图片名
 * @returns 持久化存储的图片地址
 */
function getPersistentImage(ImageUri, fileName, fn) {
  var dirUri = cordova.file.externalDataDirectory;
  var oldFileUri = ImageUri;
  var fileExt = '.' + oldFileUri.split('.').pop();
  var newFileName = fileName + fileExt;

  window.resolveLocalFileSystemURL(ImageUri, function (fileEntry) {
    window.resolveLocalFileSystemURL(dirUri, function (dirEntry) {
      // move the file to a new directory and rename it
      fileEntry.moveTo(dirEntry, newFileName, successCallback, errorCallback);
      fn && fn(dirUri + newFileName);
    }, errorCallback);
  }, errorCallback);
}

/**
 * 导出数据库记录
 * @param {object} dataObj 
 */
function writeRecords(dataObj, fn) {
  var dirUri = cordova.file.externalDataDirectory;
  window.resolveLocalFileSystemURL(dirUri, function (dirEntry) {
    saveFile(dirEntry, dataObj, 'records.csv');
    fn && fn()
  }, errorCallback);
}

/**
 * 导出模版
 * @param {any} dataObj 
 */
function writeTemplate(dataObj, fn) {
  var dirUri = cordova.file.externalDataDirectory
  window.resolveLocalFileSystemURL(dirUri, function (dirEntry) {
    saveFile(dirEntry, dataObj, 'teamplate.json');
    fn && fn()
  }, errorCallback);
}


/**
 * 读取模版文件，传入一个回调函数来获取文件内容
 * @param {function} successfulCallback(fileContent)
 */
function readTemplate(successfulCallback) {
  var fileUri = cordova.file.externalDataDirectory + 'teamplate.json'
  window.resolveLocalFileSystemURL(fileUri, function (fileEntry) {
    readFile(fileEntry, successfulCallback);
  }, errorCallback);
}


/* ----- private function begin ----- */

/**
 * 读取文件公共方法
 * 
 * @param {any} fileEntry 
 * @param {any} successfulCallback 
 */
function readFile(fileEntry, successfulCallback) {
  fileEntry.file(function (file) {
    var reader = new FileReader();

    reader.onloadend = function () {
      console.log('Successful file read: ' + this.result);
      successfulCallback(this.result);
      // displayFileData(fileEntry.fullPath + ': ' + this.result);
    };
    reader.readAsText(file);
  }, onErrorReadFile);
}

/**
 * 保存数据公共方法
 * 
 * @param {any} dirEntry 
 * @param {any} fileData 
 * @param {any} fileName 
 */
function saveFile(dirEntry, fileData, fileName) {
  dirEntry.getFile(
    fileName, {
      create: true,
      exclusive: false
    },
    function (fileEntry) {
      writeFile(fileEntry, fileData);
    }, onErrorCreateFile);
}

/**
 * 写入文件基础公共方法
 * 
 * @param {any} fileEntry 
 * @param {any} dataObj 
 */
function writeFile(fileEntry, dataObj) {
  // Create a FileWriter object for our FileEntry (log.txt).
  fileEntry.createWriter(function (fileWriter) {
    fileWriter.onwriteend = function () {
      console.log('Successful file write...');
    };

    fileWriter.onerror = function (e) {
      console.log('Failed file write: ' + e.toString());
    };

    fileWriter.write(dataObj);
  });
}

function onErrorCreateFile(e) {
  console.log('Failed create file: ' + e.toString());
}

function onErrorReadFile(e) {
  console.log('Failed read file: ' + e.toString());
}

function errorCallback(e) {
  console.log(e.toString());
  alert(e.toString());
}

function successCallback(e) {
  console.log('move filesuccess');
}