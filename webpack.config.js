const fs = require('fs');
const TerserPlugin = require("terser-webpack-plugin");


const files = fs.readdirSync(`${__dirname}/icons`).filter(e => e.match(new RegExp(/^.*\.svg$/, 'gi'))).map(e => e = `${__dirname}/icons/` + e);
//console.info(files);

const webfontsGenerator = require('vusion-webfonts-generator');
webfontsGenerator({
    files: files,
    // files: [
    //     `${__dirname}/icons/ic1.svg`,
    //     `${__dirname}/icons/ic2.svg`,
    //     `${__dirname}/icons/ic3.svg`,
    //     `${__dirname}/icons/ic4.svg`,
    //     `${__dirname}/icons/ic5.svg`
    // ],
    dest: `${__dirname}/build/custom-fonts/`,
    fontName: 'alarm-iconfonts',
    html: true,
    
    templateOptions: {
        classPrefix: 'custom-',
        baseSelector: '.custom'
    }
}, function (error) {
    if (error) {
        console.log('ICONS: Fail!', error);
    } else {
        console.log('ICONS: Done!');
    }
});

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: `${__dirname}/build/public`,
        filename: 'bundle.js'
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    }
}