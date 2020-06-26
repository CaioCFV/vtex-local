"use strict";

/******************************************
******** SERVER DEPENDENCIES **************
*******************************************/
const { watch, parallel} = require('gulp');
var serveStatic = require('serve-static');
const proxy =  require('proxy-middleware');
const url = require('url');
const browserSync = require('browser-sync');
const {setCompression, setHeaders, setHost, setBody} =  require('./local.middlewares');


/******************************************
************** TASKS **********************
*******************************************/
const csstasks = require('./css.tasks');

/******************************************
************** CONFIG HOSTS ***************
*******************************************/
const pkg = require('./package.json')
const $_HOST = `${pkg.accountName}.vtexcommercestable.com.br`;
const  $_PROXY_CONFIG = url.parse(`https://${$_HOST}/`)
$_PROXY_CONFIG.preserveHost = true;
$_PROXY_CONFIG.cookieRewrite = `${pkg.accountName}.vtexlocal.com.br`;

/******************************************
************** SERVER INIT ****************
*******************************************/
function watchFiles(){
    watch('./src/**/*.css',function(done){
       csstasks();
       browserSync.reload();
       done();
    });
}

/******************************************
************** SERVER INIT ****************
*******************************************/
function myServer(){
    browserSync.init({
        host: `${pkg.accountName}.vtexlocal.com.br`,
        port:80,
        server:'./src',
        watch:true,
        open:'external',
        middleware: [
            setCompression,
            setHeaders,
            setHost,
            setBody(pkg.accountName),
            serveStatic('./build'),
            proxy($_PROXY_CONFIG),
        ],
    })
    console.log('SERVIDOR INICIADO');
}

exports.default = parallel(
    myServer, 
    watchFiles,
)
