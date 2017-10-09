'use strict';

// app.js 서버 어플리케이션에서 ES6 문법을 사용하기위한 호출파일
require('babel-register')({
	presets: ['es2015']
});
require('./app');