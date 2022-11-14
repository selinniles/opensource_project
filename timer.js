$(document).ready(function(){
    // get the info from html
    var start = document.getElementById('start'); 
    var stop = document.getElementById('stop');
    var reset = document.getElementById('reset');
    
    var w_m = document.getElementById('work_min');
    var w_s = document.getElementById('work_sec');
    
    var b_m = document.getElementById('break_min');
    var b_s = document.getElementById('break_sec');

    var started = 1000;
    // counter to secure the double clicking of timer
    var c = 0;
    
    // counter for the longer break
    var long_break = 0; 
   
    // start timer 
    var start_timer;
    start.addEventListener('click', function(){ 
        if (c===0){
            start_timer = setInterval(timer, started);
            c=1;
        }
        
    })
    
    //if reset, delete all and start again
    reset.addEventListener('click',function(){  
        stop_();
        c = 0;
        long_break = 0;
        w_m.innerText = 25;
        w_s.innerText = "00";
    
        b_m.innerText = 5;
        b_s.innerText = "00";
    
        document.getElementById('counter').innerText = 0;
    
        clearInterval();
        start_timer = '';
    })
    
    // stop timer
    stop.addEventListener('click', function(){ 
            stop_();
            c=0;
    })
    
    
    function timer(){
        if (started){
            // Countdown for working
        if(w_s.innerText != 0){  // decrease second counter
            w_s.innerText--;
        } else if(w_m.innerText != 0 && w_s.innerText == 0){  // for every one minute decrease minute counter
            w_s.innerText = 59;
            w_m.innerText--;
        }
    
        // Countdown for break time
        if(w_m.innerText == 0 && w_s.innerText == 0){  //decrease second counter
            if(b_s.innerText != 0){
                b_s.innerText--;
            } else if(b_m.innerText != 0 && b_s.innerText == 0){  //for every one minute decrease minute counter
                b_s.innerText = 59;
                b_m.innerText--;
            }
        }
    
        // counter is increased if a cycle is completed
        if(w_m.innerText == 0 && w_s.innerText == 0 && b_m.innerText == 0 && b_s.innerText == 0){
            w_m.innerText = 25;
            w_s.innerText = "00";
    
            if(long_break % 4 == 0){  //if 4 continuos cycle is finished ask user to take a longer break for the next cycle
                if(confirm("You finished 4 cycles! Do you want to take a long break next time?")){
                    b_m.innerText = 25;
                }
                else{
                b_m.innerText = 5;
                }
            }
            b_s.innerText = "00";
            document.getElementById('counter').innerText++;
            long_break++;
        }
        }
        
    }
    
    //Stop Timer Function
    function stop_(){
        clearInterval(start_timer);
    }
    });