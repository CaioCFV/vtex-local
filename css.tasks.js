const cleanCSS = require('gulp-clean-css');
const {src,dest} = require('gulp');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

function main(cb){
    return src('**/*.css',{cwd:'./src'})
        .pipe(cleanCSS())
        .pipe(autoprefixer({cascade: false,grid:'autoplace'}))
        .pipe(rename({dirname:'arquivos'}))
        .pipe(dest('build/'))
}

module.exports = main