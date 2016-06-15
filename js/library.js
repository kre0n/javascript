(function() {
    window.library = (function() {
        // сразу опрделяем статические методы, и константы
        var library = {
            // типы для встроенных объектов js
            TYPES : {
                HTML_ELEMENT_TYPE : 1,
                ARRAY_STRING : 'Array',
                OBJECT_STRING : 'Object',
                STRING : 'string',
                NUMBER : 'number',
            },
            
            // константы - для ошибок 1111
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
             * @param {type} obj
             * @param {type} fn
             * @returns {undefined}
             */
            forEachObj : function( obj, fn ) {
                if( !library.isObject( obj ) ) library.throwError( 'wrongTypeOfVariable', [ 'obj', 'Объект' ] );
                
                for( var key in obj ) {
                    fn( obj[key], key );
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
                if( item.nodeType && item.nodeType === library.TYPES.HTML_ELEMENT_TYPE ) {
                    try {
                        var tag = item.tagName;
                        item.tagName = '';  
                        if( item.tagName === tag ) {
                            return true;
                        } else {
                            item.tagName = tag;
                            return false;
                        }
                    } catch (e) {
                        return true;
                    }
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
             * Проверяет является ли строкой аргумент
             * 
             * @param {type} str
             * @returns {Boolean}
             */
            isString : function( str ) {
                return typeof( str ) === library.TYPES.STRING;
            },
            
            /**
             * Создает и возвращает HTML элемент
             *
             * @param {type} descriptor
             *      @par {string} tagName = 'div' имя тэга
             * @returns {HTMLElement}
             */
            newTag : function( descriptor ) {
                descriptor = descriptor || {};
                
                var tagName = descriptor.tagName || 'div';
                
                return document.createElement( tagName );
            },
            
            /**
             * Статический метод, добавляет класс css к указанном узлу-элементу
             * 
             * @param {HTMLElement} htmlElement
             * @param {string} className
             * @returns {unresolved}
             */
            addClass : function( htmlElement, className ) {
                if( !library.isHTMLElement( htmlElement ) ) library.throwError( 'wrongTypeOfVariable', [ 'htmlElement', 'Узел-элемент' ] );
                if( !library.isString( className ) ) library.throwError( 'wrongTypeOfVariable', [ 'className', 'Строка' ] );
                
                var classArr = className.split( ' ' );
                var currentClass = htmlElement.className;
                
                library.forEach( classArr, function( str ) {
                    if( !~currentClass.indexOf( str ) ) {
                        currentClass += " " + str;
                    }
                } );
                
                htmlElement.className = currentClass;
                
                return htmlElement;
            },
            
            /**
             * 
             * @param {type} htmlElement
             * @param {type} className
             * @returns {undefined}
             */
            removeClass : function( htmlElement, className ) {
                if( !library.isHTMLElement( htmlElement ) ) library.throwError( 'wrongTypeOfVariable', [ 'htmlElement', 'Узел-элемент' ] );
                if( !library.isString( className ) ) library.throwError( 'wrongTypeOfVariable', [ 'className', 'Строка' ] );
                
                var currentClass = htmlElement.className;
                var classArr = className.split( ' ' );
                var currClassArr = currentClass.split( ' ' );
                
                var resultClass = '';
                
                library.forEach( currClassArr, function( item ) {
                    if( ~classArr.indexOf( item ) ) return;
                    resultClass += item;
                } );
                
                htmlElement.className = resultClass;
                
                return htmlElement;                
            },
            
            addEvent : function( htmlElement, event, handler, capture ) {
                if( !library.isHTMLElement( htmlElement ) ) library.throwError( 'wrongTypeOfVariable', [ 'htmlElement', 'Узел-элемент' ] );
                if( !library.isString( event ) ) library.throwError( 'wrongTypeOfVariable', [ 'event', 'Строка' ] );
                
                htmlElement.addEventListener( event, handler, capture );
                
            },
            
            raiseEvent : function( htmlElement, eventName, param, caption ) {
                if( !library.isHTMLElement( htmlElement ) ) library.throwError( 'wrongTypeOfVariable', [ 'htmlElement', 'Узел-элемент' ] );
                param = param || {};
                
                var cancelable = false;
                
                var event = document.createEvent( "Event" );
                event.initEvent( eventName, caption || false, cancelable === false ? false : true);
                library.extend( event, param );
                
                htmlElement.dispatchEvent( event );
            },
            
            /**
             * 
             * @param {type} obj1
             * @param {type} obj2
             * @returns {undefined}
             */
            extend : function( obj1, obj2 ) {
                library.forEachObj( obj2, function( item, key ) {
                    if( !obj1[ key ] ) {
                        obj1[ key ] = item;
                    }
                } );
            }
        };
            
        /**
         * Супер класс для всех элементов
         * 
         * @returns {library.Element}
         */
        library.LibElement = ( function() {
            var c = function( descriptor ) {
                var self = this;
                
                self.rootBox = library.newTag();
                
            };
            
            c.prototype = Object.create( Object.prototype );
        
            c.prototype.addEvent = function( name, handler, capture ) {
                library.addEvent( this.rootBox, name, handler, capture );
                
                return true;
            };
            
            c.prototype.events = function( object, capture ) {
                var self = this;
                
                object = object || {};
                
                library.forEachObj( object, function( item, key ) {
                    library.addEvent( self.rootBox, key, item, capture );
                } );
                
                return self;
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

            c.prototype.raiseEvent = function( event, param, caption ) {
                param = param || {};
                
                library.raiseEvent( this.rootBox, event, param, caption );
            };
            
            /**
             * Добавляет текущий элемент в родитель
             * 
             * @param {Element} parent родитель
             * @returns {undefined}
             */
            c.prototype.appendTo = function( parent ) {
                if( !library.isHTMLElement( parent ) ) library.throwError( 'wrongTypeOfVariable', [ 'parent', 'Узел-элемент' ] );
                
                parent.appendChild( this.rootBox );
            };
            
            c.prototype.addClass = function( str ) {
                var self = this;
                library.addClass( self.rootBox, str );
                
                return self;
            };
            
            c.prototype.removeClass = function( str ) {
                var self = this;
                library.removeClass( self.rootBox, str );
                
                return self;
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
