
/*
|--------------------------------------------------------------------------
| Sly
|--------------------------------------------------------------------------
*/


;(function ( window, document, undefined ) {

     var Sly = function(el, options) {
          this.options = {
               bullets: options.bullets || false,
               speed: options.speed  || '0.5s'
          }
          this.el = document.getElementById(el);
          this.children = this.getChildren();
          this.wrap = this.createWrap();
          this.length = 0;
          this.left = 0;
          this.setup();
          this.init();
          return {
               next: this.next.bind(this),
               prev: this.prev.bind(this)
          }
     };

     Sly.prototype = {
       
          init: function() {

               var that = this;
          
               window.onresize = this.setup.bind(this);

               this.children.forEach(function(item, index) {
                    that.el.removeChild(item);
                    that.wrap.appendChild(item);
               });

               if(this.options.bullets) this.createNav();

               this.el.appendChild(this.wrap);

               this.updateNav();
               
          },

          next: function() {
               this.move('next');
          },

          prev: function() {
               this.move('prev');
          },

          move: function(direction) {

               if( this.currentLeft === this.maxLeft && direction !== 'prev' ) {
                    this.wrap.style.left = 0;
                    this.currentLeft = 0;
                    return this.updateNav();
               }

               if( this.currentLeft === 0 && direction !== 'next' ) {
                    this.wrap.style.left = '-' + this.maxLeft + 'px';
                    this.currentLeft = this.maxLeft;
                    return this.updateNav();
               } 

               var newleft;

               switch(direction) {
                    case 'next' :
                    newleft = this.currentLeft + this.left;
                    break;
                    case 'prev' :
                    newleft = this.currentLeft - this.left;
                    break;
                    default :
                    newleft = this.currentLeft += this.left;
               }

               this.wrap.style.left = '-' + newleft + 'px';
               this.currentLeft = newleft;
               this.updateNav();

          },

          createNav: function(item, index) {

               var that = this;

               this.children.forEach(function(item, index) {

                    var bullet = document.createElement('a');
                    var nav    = document.getElementsByClassName(that.options.bullets)[0];

                    bullet.href = '#' + (index++);
                    bullet.innerHTML = (index++);

                    bullet.addEventListener('click', that.navigate.bind(that));

                    nav.appendChild(bullet);

               });

          },

          navigate: function(e) {

               e.preventDefault();

               var  num  = parseInt(e.currentTarget.innerHTML, 10),
                    move = ( num * this.left ) - 800;

               this.wrap.style.left = '-' + move + 'px';
               this.currentLeft = move;
               this.updateNav();

          },

          setup: function() { 

               var that = this;

               this.currentLeft = 0;
               this.maxLeft = this.el.clientWidth * (this.children.length - 1);
               this.left = this.el.clientWidth;
               this.wrap.style.left = 0;

               var length = 0;

               this.children.forEach(function(item) {
                    item.style.width = that.left + 'px';
                    length += item.clientWidth;
               });

               this.wrap.style.width = length + 'px'

          },

          updateNav: function() {

               var current = this.currentLeft / this.left;
               
               this.getNav().forEach(function(item, index) {
                    (index === current) ? item.className = 'active' : item.className = '';
               });

          },

          getChildren: function() {
               return Array.prototype.slice.call(this.el.childNodes).filter(function(item) {
                    if ( item.nodeType !== 3 ) return item;
               })
          },

          getNav: function() {
               return Array.prototype.slice.call(document.getElementsByClassName('slide-navigation')[0].childNodes)
          },

          createWrap: function() {

               var  wrapper   = document.createElement('div'),
                    s         = wrapper.style,
                    anim      = 'all ' + this.options.speed + ' ease';
               
               wrapper.className = 'wrapper';
               s.position = 'absolute';
               s.top = 0;
               s.left = 0;
               s.WebkitTransition = anim;
               s.MozTransition = anim;
               s.transition = anim;
               
               return wrapper;

          }

     };

     window.Sly = Sly;

}(window, document));
