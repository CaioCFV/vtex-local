const {src,dest} = require('gulp');
const rename = require('gulp-rename');

function main(cb){
    return src('**/*.{js,html,png,jpg,gif}',{cwd:'./src'})
        .pipe(rename({dirname:'arquivos'}))
        .pipe(dest('build/'))
}



module.exports = main