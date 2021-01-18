const {src,dest}    = require('gulp')
const cleanCSS      = require('gulp-clean-css');
const autoprefixer  = require('gulp-autoprefixer');
const rename        = require('gulp-rename');
const concat        = require('gulp-concat');
const uglify        = require('gulp-uglify-es').default;
const babel         = require('gulp-babel');
const sourcemaps    = require('gulp-sourcemaps');
const sass           = require('gulp-dart-sass');

function css(){
    return src('**/*.css',{cwd:'./src'})
        .pipe(cleanCSS())
        .pipe(autoprefixer({cascade: false,grid:'autoplace'}))
        .pipe(rename({dirname:'arquivos'}))
        .pipe(dest('build/'))
}



function scss(){
    return src('**/*.scss',{cwd:'./src'})
    	.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(rename({dirname:'arquivos'}))
        .pipe(dest('build/'))
}

function copyAll(){
    return src(['**/*.*','!**/*.scss'],{cwd:'./src'})
        .pipe(rename({dirname:'arquivos'}))
        .pipe(dest('build/'))
}

function commomScripts(){
    return src('**/commomScripts/*.js',{cwd:'./src'})
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.min.js'))
	.pipe(babel({
        presets: ['@babel/preset-env']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(rename({dirname:'arquivos'}))
    .pipe(dest('build/'))
}

/**************************************************** 
********************* PRODDUCTION SCRIPTS *********** 
*****************************************************/

function commomScriptsProd(){
    return src('**/commomScripts/*.js',{cwd:'./src'})
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.min.js'))
	.pipe(babel({
        presets: ['@babel/preset-env']
    }))
    .pipe(uglify())
    .pipe(rename({dirname:'arquivos'}))
    .pipe(dest('build/'))
}

function scssProd(){
    return src('**/*.scss',{cwd:'./src'})
    	.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(rename({dirname:'arquivos'}))
        .pipe(dest('build/'))
}

module.exports = {
    copyAll,
    css,
    scss,
    scssProd,
    commomScripts,
    commomScriptsProd
}
