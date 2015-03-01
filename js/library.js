(function() {
    window.library = (function() {
        // сразу опрделяем статические методы, и константы
        var library = {
            // типы для встроенных объектов js
            TYPES : {
                HTML_BODY_STRING : 'HTMLBodyElement',
                ARRAY_STRING : 'Array',
                OBJECT_STRING : 'Object',
            },
            
            // константы - для ошибок
            codes : {
                faledExecuteArguments : 'Ошибка при выполнении функции %0 в %1: %2 аргументов ожидалось, а получено %3.',
                wrongTypeOfVariable : 'Неверный тип переменной %0. Ожидался тип - %1',
                errorCodeNotFound : 'В библиотеке не найден код ошибки. Код - %0',

            },

            /**
             * работет быстрее чем обычный arr.forEach()
             * 
             * @param {type} arr
             * @param {type} fn
             * @returns {undefined}
             */
            forEach : function( arr, fn ) {

                if( !library.isArray( arr ) ) library.throwError( 'wrongTypeOfVariable', [ 'arr', 'Массив' ] );
                var len = arr.length;
                for( var i = 0; i < len; i++ ) {
                    fn( arr[i], i );
                }
            },

            /**
             * 
             * 
             * @param {string} type
             * @param {array} codes
             * @returns {undefined}
             */
            throwError : function( type, codes ) {

                codes = codes || [];
                var string = library.codes[ type ];
                if( !string ) library.throwError( 'errorCodeNotFound', [ type ] );

                library.forEach( codes, function( item, i ) {
                    string = string.replace( '%' + i, item );
                } );

                throw new Error( string );            
            },

            /**
             * @static 
             * проверяет является ли аргумент узлом-элементом
             * 
             * @param {HTMLElement} item узел элемент
             * @returns {boolean}
             */
            isHTMLElement : function( item ) {
                var string = {}.toString.call( item );
                if( ~string.indexOf( library.TYPES.HTML_BODY_STRING ) ) {
                    return true;
                } else {
                    return false;
                }
            },

            /**
             * @static 
             * проверяет является ли аргумент массивом
             * 
             * @param {type} arr
             * @returns {Boolean}
             */
            isArray : function( arr ) {
                var string = {}.toString.call( arr );
                if( ~string.indexOf( library.TYPES.ARRAY_STRING ) ) {
                    return true;
                } else {
                    return false;
                }
            },

            /**
             * @static 
             * проверяет является ли аргумент объектом
             * 
             * @param {type} arr
             * @returns {Boolean}
             */
            isObject : function( arr ) {
                var string = {}.toString.call( arr );
                if( ~string.indexOf( library.TYPES.OBJECT_STRING ) ) {
                    return true;
                } else {
                    return false;
                }
            },
            
            /**
             * Создает и возвращает HTML элемент
             *
             * @param {type} tagName
             * @param {type} descriptor
             * @returns {HTMLElement}
             */
            newTag : function( tagName, descriptor ) {
                
            },
        };
            
        /**
         * Супер класс для всех элементов
         * 
         * @returns {library.Element}
         */
        library.LibElement = ( function() {
            var c = function( descriptor ) {
                
                library.newTag();
                
            };
            
            c.prototype = Object.create( Object.prototype );
        
            c.prototype.addEvent = function( name, handler ) {

            };

            c.prototype.removeEvent = function( name, handler ) {
                
            };

            /**
             * 
             * @param {type} descriptor
             * @returns {undefined}
             */
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
                
                if( !library.isHTMLElement( parent ) ) library.throwError( 'wrongTypeOfVariable', [ 'parent', 'Узел-элемент' ] );
                
                
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
        library.Combobox = ( function() {
            var c = function() {
                library.LibElement.apply( this, arguments );

                console.log( 'конструктор Combobox');
            };
            
            c.prototype = Object.create( library.LibElement.prototype );
        
            c.prototype.method = function( name, handler ) {
                console.log( 'method combobox' );
            };
            
            return c;
        } )();
        
        return library;
    })();
})();