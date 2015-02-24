# Sly

<div style="text-align:center"><img src="http://i.imgur.com/stYq2aH.gif" /></div>

A tiny, 2k responsive slider using CSS3 built with Javascript. its built with newer ecmascript 6 elements to _keep it tiny_ so its only build for modern browsers (Chrome, Firebox, IE10+).

There will be pollyfilled version for IE


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

Add some CSS. The width of the slider can be whatever you want, its responsive!


```
 #slider {
     height: 600px;
     overflow: hidden;
     position: relative;
 }

 .slide {
     width: 100%;
     float: left;
 }
```


Fire her up! Add the ID of your slider into the function


```
var sly = new Sly('slider');
```

With options

```
 var sly = new Sly('slider', {
     bullets: 'slide-navigation', // ID of element to inject bullet nav into, default: false
     speed: '0.5' // this is the default speed
 });
 
```

## API methods

For the moment, just some simple Next, Previous controls

```
sly.next();
```

```
sly.prev();
```



## Todo's

1. ~~Options for Speed, Easing~~
2. ~~Better support for IE~~ Creating a seperate pollyfilled version instead
3. More API methods
4. Smaller File Size

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

