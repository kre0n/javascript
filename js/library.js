(function() {
    window.library = function() {
        var result;    
        
        /**
         * Супер класс для всех элементов
         * 
         * @returns {library.Element}
         */
        result.Element = function() {
            
        };
        result.Element.prototype = {
            
            /**
             * 
             * @returns {undefined}
             */
            addEvent : function( name, handler ) {
                
            },
            
            /**
             * 
             * @param {type} name
             * @param {type} handler
             * @returns {undefined}
             */
            removeEvent : function( name, handler ) {
                
            },
            
            /**
             * 
             * @param {type} descriptor
             * @returns {undefined}
             */
            addEvents : function( descriptor ) {
                
            },
            
            /**
             * 
             * @param {type} descriptor
             * @returns {undefined}
             */
            removeEvents : function( descriptor ) {
                
            },
            
            /**
             * 
             * @returns {undefined}
             */
            raiseEvent : function( name ) {
                
            },
        };
        
        /**
         * Выпадающий список
         * 
         * @returns {undefined}
         */
        result.Combobox = function() {
            
        };
        result.Combobox.prototype = {
            
        };
                
        return result;
    };
})();