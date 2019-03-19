var fs = require('fs');
var PNG = require('pngjs').PNG;
var getPixels = require("get-pixels");
var size = require('image-size');
var n = 0; //截图次数
var mapsize;

var testDir = './test/e2e'

var commonTools = ({

    /*
     * function: open specific example and assert elements 'body','#map' present
     * params: browser ;
   '  * type(String) - serviceType, eg:'leaflet'、'openlayers' etc.
     * exampleName(String) - eg:'01_tiledMapLayer3857' etc.
     * */
    openExampleAndLoadMap: function (browser) {
        //var baseDir = path.resolve(__dirname, '../../').replace(/\\/g, '/');
        //var exampleUrl = baseDir + '/examples/' + '/' + exampleName + '.html';
        var basePath = 'http://localhost:8080';
        browser.url(basePath);
        browser.pause(2000);
        browser.waitForElementPresent('body', 5000);
        browser.waitForElementPresent('#map', 5000);
        browser.pause(1000);
    },

    /*
     * if standard tile not exist , use this function to get  standard tile.
     * function: getStdTile
     * params: browser ;
     * exampleName(String) - eg:'01_tiledMapLayer3857' etc.
     * standardTilePrams(offsetX, offsetY, width, height).
     * */
    getStdTile_centre: function (browser, exampleName, offsetX, offsetY, width, height) {
        var screenShotPath = testDir + '/temp/' + exampleName + '.png';
        var tileTestPath = testDir + '/resources/' + exampleName + '.png';
        browser.pause(5000);
        browser.saveScreenshot(screenShotPath, function () {
            console.log('Screenshot has been saved , now start to get StdTile from Screenshot');
            //dimensions 是整幅图 图片的大小
            size(screenShotPath, function (err, dimensions) {
                var totalWidth = dimensions.width;
                var totalHeight = dimensions.height;
                console.log(totalWidth + ":" + totalHeight)
                var offX = (totalWidth - width) / 2 + offsetX;
                var offY = (totalHeight - height) / 2 - offsetY;
                commonTools.getTileFromScreenshot(screenShotPath, offX, offY, width, height, tileTestPath);
                console.log('get StdTile completed');
            });
        });
        browser.pause(2000, function () {
            // commonTools.deleteFolders(testDir + '/temp');
            // commonTools.deleteFolders('/output');
        })
    },

    /*
  * if standard tile not exist , use this function to get  standard tile.
  * function: getStdTile
  * params: browser ;
  * exampleName(String) - eg:'01_tiledMapLayer3857' etc.
  * standardTilePrams(offsetX, offsetY, width, height).
  * */
    getStdTile: function (browser, exampleName, offsetX, offsetY, width, height) {
        var screenShotPath = testDir + '/temp/' + exampleName + '.png';
        var tileTestPath = testDir + '/resources/' + exampleName + '.png';
        browser.pause(5000);
        browser.saveScreenshot(screenShotPath, function () {
            console.log('Screenshot has been saved , now start to get StdTile from Screenshot');
            //dimensions 是整幅图 图片的大小
            size(screenShotPath, function (err, dimensions) {
                var totalWidth = dimensions.width;
                var totalHeight = dimensions.height;
                console.log(totalWidth + ":" + totalHeight)
                commonTools.getTileFromScreenshot(screenShotPath, offsetX, offsetY, width, height, tileTestPath);
                console.log('get StdTile completed');
            });
        });
        browser.pause(2000, function () {
            // commonTools.deleteFolders(testDir + '/temp');
            // commonTools.deleteFolders('/output');
        })
    },


    /*
     * use this function when standard tile already exist.
     * function: get screenshot from browser window ,
     * then get testTile from the screenshot and compare with standard tile.
     * params: broswer ;
     * exampleName(String) - eg:'01_tiledMapLayer3857' etc.
     * testTilePrams(offsetX, offsetY, width, height) - should be equal with Corresponding standard tile params.
     * offsetX, offsetY: Offset relative to the center point
     * return : boolean
     * */
    cmpTestTileWithStdTile_centre: function (browser, exampleName, offsetX, offsetY, width, height) {
        var screenShotPath, tileTestPath, tileStandardPath;
        if (typeof exampleName !== 'string') {
            console.log('invalid input :  exampleName is not a string');
            return;
        }
        screenShotPath = testDir + '/output/' + '_' + exampleName + '_' + n + '.png';
        tileTestPath = testDir + '/output/' + '_' + exampleName + 'TileTest_' + n + '.png';
        tileStandardPath = testDir + '/resources/' + exampleName + '.png';
        browser.pause(5000);
        browser.saveScreenshot(screenShotPath, function () {
            console.log('start to get test tile');
            size(screenShotPath, function (err, dimensions) {
                var totalWidth = dimensions.width;
                var totalHeight = dimensions.height;
                var offX = (totalWidth - width) / 2 + offsetX;
                var offY = (totalHeight - height) / 2 - offsetY;
                //从screenshot中获取指定size的tileTest图片
                commonTools.getTileFromScreenshot(screenShotPath, offX, offY, width, height, tileTestPath);
                console.log('get test tile completed');
            });
        });
        browser.pause(5000, function () {
            console.log('start to compare test tile with standard tile');
            //对比tileTest图片和标准的期望的图片
            commonTools.isTwoTilesEqual(browser, tileStandardPath, tileTestPath, exampleName, offsetX, offsetY, width, height);
        });
    },


    cmpTestTileWithStdTile: function (browser, exampleName, offsetX, offsetY, width, height) {
        var screenShotPath, tileTestPath, tileStandardPath;
        if (typeof exampleName !== 'string') {
            console.log('invalid input :  exampleName is not a string');
            return;
        }
        screenShotPath = testDir + '/output/' + '_' + exampleName + '_' + n + '.png';
        tileTestPath = testDir + '/output/' + '_' + exampleName + 'TileTest_' + n + '.png';
        tileStandardPath = testDir + '/resources/' + exampleName + '.png';
        browser.pause(5000);
        browser.saveScreenshot(screenShotPath, function () {
            console.log('start to get test tile');
            size(screenShotPath, function (err, dimensions) {
                //从screenshot中获取指定size的tileTest图片
                commonTools.getTileFromScreenshot(screenShotPath, offsetX, offsetY, width, height, tileTestPath);
                console.log('get test tile completed');
            });
        });
        browser.pause(5000, function () {
            console.log('start to compare test tile with standard tile');
            //对比tileTest图片和标准的期望的图片
            commonTools.isTwoTilesEqual(browser, tileStandardPath, tileTestPath, exampleName, offsetX, offsetY, width, height);
        });
    },


    /*
     * function: get a tile with certain range from the screenshot
     * offX, offY: Offset relative to the top-left corner
     * */
    getTileFromScreenshot: function (sourceImagePath, offX, offY, width, height, tilePath) {
        var dst = new PNG({ width: width, height: height });
        fs.createReadStream(sourceImagePath).pipe(new PNG()).on('parsed', function () {
            console.log(offX + ":" + offY)
            this.bitblt(dst, offX, offY, width, height, 0, 0);
            dst.pack().pipe(fs.createWriteStream(tilePath));
        });
    },

    /*
     * function: compare two image by tilePath,
     * return : boolean
     * */
    isTwoTilesEqual: function (browser, tilePath1, tilePath2, exampleName, offsetX, offsetY, width, height) {
        browser.pause(2000, function () {
            n++;
        });
        var array1 = [];
        var array2 = [];
        console.log('start to compare two tiles');
        getPixels(tilePath1, function (err, pixels) {
            if (err) {
                browser.assert.ok(false, "path of standard tile not exist: " + tilePath1);
                return;
            }
            for (var i = 0; i < pixels.data.length; i++) {
                array1.push(pixels.data[i]);
            }
            console.log('tile1 ( ' + tilePath1 + ' ) has pixels : ' + (array1.length / 4));
            getPixels(tilePath2, function (err, pixels) {
                if (err) {
                    browser.assert.ok(false, "path of test tile not exist: " + tilePath2);
                    return;
                }
                for (var i = 0; i < pixels.data.length; i++) {
                    array2.push(pixels.data[i]);
                }
                console.log('tile2 ( ' + tilePath2 + ' ) has pixels : ' + (array2.length / 4));
                var isEqual = commonTools.judgeTwoTilesByRgbaArrays(browser, array1, array2);
                //判断两张图是否相等
                if (isEqual) {
                    n = 0;
                    browser.assert.ok(isEqual, '第' + n + '次比较,similarity of two pictures >=0.8');
                }
                else if (n > 4) {
                    n = 0;
                    browser.assert.ok(isEqual, '4次比较后,similarity of two pictures <0.8');
                }
                else {
                    console.log('第' + n + '次比较,地图不相等,继续比较...');
                    browser.deleteCookies(function () {
                        // commonTools.openExampleAndLoadMap(browser, type, exampleName);
                        //循环调用，知道超出对比次数4次 结束对比
                        commonTools.cmpTestTileWithStdTile(browser, exampleName, offsetX, offsetY, width, height);
                    });
                }
            });
        });
    },

    /*
     * function: compare two image by one-dimensional RgbaArrays,
     * elements in one-dimensional RgbaArrays are [r1,g1,b1,a1,r2,g2,b2,a2,...,rn,gn,bn,an].
     * return : boolean
     * */
    judgeTwoTilesByRgbaArrays: function (browser, RgbaArraysOfTile1, RgbaArraysOfTile2) {
        var isLengthEqual = (RgbaArraysOfTile1.length == RgbaArraysOfTile2.length);
        if (!isLengthEqual) {
            console.log('length are not equal');
            return false;
        }
        console.log('length of two tiles are equal');
        var totalCount = ((RgbaArraysOfTile1.length) / 4);
        var unEqualCount = commonTools.difPixelsCount(RgbaArraysOfTile1, RgbaArraysOfTile2);
        console.log('different pixels count : ' + unEqualCount);
        var similarity = ((totalCount - unEqualCount) / totalCount).toFixed(5);
        if (similarity < 0.8) {
            browser.assert.ok(similarity < 0.8, 'similarity : ' + similarity + ' < 0.8');
            return false;
        }
        browser.assert.ok(similarity >= 0.8, 'similarity : ' + similarity + ' >= 0.8');
        return true;
    },

    /*
     * function: calculate count of different Pixels between two tiles ,
     * return : number
     * */
    difPixelsCount: function (RgbaArraysOfTile1, RgbaArraysOfTile2) {
        var unEqualCount = 0;
        for (var i = 0; i < RgbaArraysOfTile1.length; i = i + 4) {
            var isValueEqual = ((RgbaArraysOfTile1[i] == RgbaArraysOfTile2[i]) && (RgbaArraysOfTile1[i + 1] == RgbaArraysOfTile2[i + 1]) && (RgbaArraysOfTile1[i + 2] == RgbaArraysOfTile2[i + 2]));
            if (!isValueEqual) {
                unEqualCount = unEqualCount + 1;
            }
        }
        return unEqualCount;
    },

    /*
     * function: delete folders
     * */
    deleteFolders: function (folderPath) {
        var files = [];
        if (fs.existsSync(folderPath)) {
            files = fs.readdirSync(folderPath);
            files.forEach(function (file) {
                var curPath = folderPath + "/" + file;
                if (fs.statSync(curPath).isDirectory()) {
                    deleteFolders(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(folderPath);
        }
    },

    clickAndCheck: function (browser, orientation) {
        browser.click('.is-' + orientation)
            .pause(1000)

        // commonTools.getStdTile(browser, 'pan' + '_' + orientation, 0, 0, 256, 256);
        commonTools.cmpTestTileWithStdTile(browser, 'pan' + '_' + orientation, 0, 0, 256, 256);

        // commonTools.getStdTile(browser, "miniMap" + '_' + orientation, 990, 980, 256, 256);

        commonTools.cmpTestTileWithStdTile(browser, "miniMap" + '_' + orientation, 990, 980, 256, 256);

    }


});
module.exports = commonTools;