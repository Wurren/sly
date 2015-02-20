# Sly

<img src="http://i.imgur.com/stYq2aH.gif" />

A tiny, 2k responsive slider using CSS3 built with Javascript. its built with newer ecmascript 6 elements to _keep it tiny_ so its only build for modern browsers (Chrome, Firebox, IE10+).

Ill probably knock together a pollyfilled version, at the expense of filesize.


## Get Started

Add your markup

```
 <div id="slider">
     <div class="slide"></div>
     <div class="slide"></div>
     <div class="slide"></div>
     <div class="slide"></div>
 </div>

```

Add some CSS. The width of the slider can be whatever you want, its responsive! Make sure that the slider and slides have a set height though! ( fixing this soon )


```
 #slider {
     height: 600px;
     overflow: hidden;
     position: relative;
 }

 .slide {
     width: 100%;
     height: 600px;
     float: left;
 }
```


Fire her up! Add the ID of your slider into the function


```
var sly = new Sly('slider');
```

## Todo's

1. Options for Speed, Easing
2. Better support for IE
3. More API methods
4. Small File Size

## Development

Simple as ``npm install``. Make sure you have gulp installed globally beforehand.

Gulp comes with 3 tasks:

```
gulp less
```
for compiling LESS to CSS, minifying and saving to /CSS/style.css

```
gulp build
```
for compiling /src/sly.js to /dist/sly.min.js

```
gulp watch
```
Exactly what it says on the tin. Watch for changes to both js and less files and runs both ``Less`` and ``build``

```
gulp run
```
Everything together. Fires up the webserver on ``localhost:8000`` and listens for changes. Fires livereload when everything is compiled.

Fork away!

