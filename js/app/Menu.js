/**
 * This module handles the Menu stuff.
 * While the game is playing there is only a pause/unpause button.
 * Before/After the game.
 *   The player can give their name to, later, allow tracking top scores.
 *   There is a toggle button to turn on/off ghost shapes.
 *   There is a button to start the game.
 */

define(
    [ "lodash", "dom", "events" ],
    function( _, dom, ev ) {
        function Menu ( game ) {

            var nameBox = dom.create("INPUT", { type : "text" });
            var nameSub = dom.create("BUTTON", null, "Submit");
            var start   = dom.create("BUTTON", null, "Start Game");
            var ghost   = dom.create("INPUT", { type : "checkbox", checked : true });
            game.useGhost = ghost.checked;
            var preDiv  = dom.create("div", {style : " display : block "},
                    dom.create("div", null,
                            "Name",
                            nameBox,
                            nameSub

                    ),
                    start,
                    dom.create("div", null,
                            dom.create("string", "Add ghost shape"),
                            ghost
                    )
            );
            
            var pause  = dom.create("BUTTON", null, "Pause");
            
            var durDiv = dom.create("div", {style : " display : none "}, pause);
            
            this.dom   = dom.create("div", null, preDiv, durDiv);

            ev.addHandler(start, "click", function () {
                preDiv.style.display = "none";
                durDiv.style.display = "block";
                game.start();
            });

            ev.addHandler(pause, "click", function () {
                if ( game.state === PLAYING ) {
                    game.togglePause();
                    pause.firstChild.nodeValue = "UnPause";
                }
                else if ( game.state === PAUSED ) {
                    game.togglePause();
                    pause.firstChild.nodeValue = "Pause";
                }
            });
            
            ev.addHandler(ghost, "click", function () {
                    game.useGhost = ghost.checked;
                }
            );
                
            this.gameOver = function () { 
                preDiv.style.display = "block";
                durDiv.style.display = "none";
            };            
        }

        //var thisP = Menu.prototype;
        
        return Menu;
    }
);