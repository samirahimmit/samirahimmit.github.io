var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('_scss/main.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('_scss/*.scss', ['sass']);
    gulp.watch(['*.md', 'content/*.md','*.html', 'journal/*.html', '_layouts/*.html', '_includes/*.html',  '_posts/*'], ['jekyll-rebuild']);
});

/**
 * Automate bower files into template -- Need to configure more
 */
 gulp.task('bower', function () {
   gulp.src('./footer.php')
     .pipe(wiredep({
       cwd: '././',
       optional: 'configuration',
       goes: 'here'
     }))
     .pipe(replace(/(<script src=")(bower_components\/)/g, '$1<?php echo get_template_directory_uri(); ?>/$2'))
     .pipe(gulp.dest('./'));

     gulp.src('./_layouts/default.html')
       .pipe(wiredep({
         cwd: '././',
         optional: 'configuration',
         goes: 'here'
       }))
       .pipe(replace(/(href=")(bower_components\/)/g, '$1<?php echo get_template_directory_uri(); ?>/$2'))
       .pipe(gulp.dest('./'));

 });

 /**
  * Minify CSS
  */

 gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});


/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
