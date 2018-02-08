(function(){
    var relax = 5;
    var session = 25;
    var time;
    var sessionID = "";
    var breakID = "";
    var position;
    var interval;
    var remain;
    var seconds;
    var mins;
    var running = false;
    var paused ="";
    //increase break time
    $("#moreBreak").on("click",function(){
        if(!running){
            relax++;
            $("#break").text(relax);
        }        
    });
    
    //decrease break time
    $("#lessBreak").on("click",function(){
        if(!running){
           if(relax > 1){
                relax--;
                $("#break").text(relax);
            }  
        }      
    });
    
    //increase session time
    $("#moreSession").on("click",function(){
        if(!running){
            session++;
            $("#session").text(session);
            $("#time").text(session+":00");
        }
    });
    
    //decrease session time
    $("#lessSession").on("click",function(){
        if(!running){
            if(session >1){
            session--;
            $("#session").text(session);
            $("#time").text(session+":00");
            }
        }  
    });
    
    //reset
    $(".fa.fa-free-code-camp").on("click",function(){
        relax = 5;
        session = 25;
        $("#session").text(session);
        $("#break").text(relax);
        $("#time").text(session+":00");
        
        if(sessionID !== ""){
            clearInterval(sessionID);
            sessionID = "";
        }
        if(breakID !== ""){
            clearInterval(breakID);
            breakID = "";
        }

        $("#innerTimer").css("left",-300);
        $("#breakInnerTimer").css("left",300);
        position = 0;
        $("#timer").css("border-color","#42ed36");
        running=false;
        paused="";
    });
    
    //start
    $("#timer").on("click",function(){
        if(!running){
           timeToSession(); 
        }else{
            if(paused ===""){
                if(sessionID !== ""){
                    clearInterval(sessionID);
                    paused="session";
                }else if(breakID !== ""){
                    clearInterval(breakID);
                    paused="break";
                }
            }else{
                if(paused==="session"){
                    timeToSession();
                    paused="";
                }else if(paused==="break"){
                    timeToBreak();
                    paused="";
                }
            }
        }
    });
    
    function timeToSession(){
        $("#textSession").html("Session");
        if(breakID !== ""){
            clearInterval(breakID);
            breakID = "";
        }
        
        if(!running){
            time = session * 60;
            interval = 300/time; 
            position = 0;
        }
        running=true;
        sessionID = setInterval(sessionTimer, 1000);
        $("#timer").css("border-color","#42ed36");
        running=true;
    }
    
    function sessionTimer(){
        seconds = time%60;
        mins = parseInt(time/60);
        if(seconds < 10) seconds ="0"+seconds;
        remain = mins+":"+seconds;
        $("#time").text(remain);
        position += interval;
        $("#innerTimer").css("left",-300+position);
        if(time == 0){
            $("#innerTimer").css("left",-300);
            running=false;
            timeToBreak();
        }
        time--;
    }
    
    function timeToBreak(){
        $("#textSession").html("Break");
        if(sessionID!==""){
            clearInterval(sessionID);
            sessionID="";
        }
        if(!running){
            time = relax * 60;
            interval = 300/time; 
            position = 0;
        }
        running=true;
        $("#timer").css("border-color","#f92100");
        breakID = setInterval(breakTimer, 1000);      
    }
    
    function breakTimer(){
        seconds = time%60;
        mins = parseInt(time/60);
        if(seconds < 10) seconds ="0"+seconds;
        remain = mins+":"+seconds;
        $("#time").text(remain);
        position += interval;
        $("#breakInnerTimer").css("left",300-position);
        if(time == 0){
            $("#breakInnerTimer").css("left",300);
            running=false;
             timeToSession();
        }
        time--;
    }
    
})();