(function() {
    window.library = (function() {
        var result = {};
        
        /**
         * Супер класс для всех элементов
         * 
         * @returns {library.Element}
         */
        result.LibElement = ( function() {
            var c = function() {
                console.log( 'конструктор LibElem');
            };
            
            c.prototype = Object.create( Object.prototype );
            
            c.HTML_BODY_STIRNG = 'HTMLBodyElement';
            
            /**
             * @static 
             * проверяет является ли аргумент узлом-элементом
             * 
             * @param {HTMLElement} item узел элемент
             * @returns {boolean}
             */
            c.isHTMLElement = function( item ) {
                var string = {}.toString.call( item );
                if( ~string.indexOf( c.HTML_BODY_STIRNG ) ) {
                    return true;
                } else {
                    return false;
                }
            },
        
            c.prototype.addEvent = function( name, handler ) {

            };

            c.prototype.removeEvent = function( name, handler ) {

            };

            c.prototype.addEvents = function( descriptor ) {

            };

            c.prototype.removeEvents = function( descriptor ) {

            };

            c.prototype.raiseEvent = function( name ) {

            };
            
            /**
             * Добавляет текущий элемент в родитель
             * 
             * @param {Element} parent родитель
             * @returns {undefined}
             */
            c.prototype.appendTo = function( parent ) {
                
                if( !c.isHTMLElement( parent ) ) throw new Error( 'Ожидался узел-элемент' );
                
                debugger
            };
            
            return c;
        } )();
        
        /**
         * Выпадающий список
         * 
         * 
         * @event changed когда изменился выбранный элемент
         *      @argument {array} newSelectedItems Выбранные элементы
         *      @argument {array} oldSelectedItems Предыдущие выбранные элементы
         * 
         * @returns {undefined}
         */
        result.Combobox = ( function() {
            var c = function() {
                result.LibElement.apply( this, arguments );

                console.log( 'конструктор Combobox');
            };
            
            c.prototype = Object.create( result.LibElement.prototype );
        
            c.prototype.method = function( name, handler ) {
                console.log( 'method combobox' );
            };
            
            return c;
        } )();
        
        return result;
    })();
})();