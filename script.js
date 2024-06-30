// This is the code to run the game

//declaring some global variables used throughout the program
var c=0;
var user1=[];//used to keep track of user 1 inputs
var user2=[];//keeps track of user2 for multiplayer and computer for single player
var buttonDisable=$(".but")//variable taken to disable button
var butt=document.querySelectorAll(".but");
var draw=0;//a counter to calculate if the game is a draw

// masking the other two pages so only the main title shows up in the screen
$(".container").hide();
$(".difficulty-screen").hide();
$(".comp_think").hide();
//refreshes the page after the game is over
$(".refresh").click(function(){
    location.reload();
})

//function used to play two player game
$(".main-screen>.two").click(function(){
    $(".main-screen").hide();
    $(".container").show();
    gameTwoPlayer();
})

//function used to ask the difficulty level when playing vs the computer
$(".main-screen>.single").click(function(){
    $(".main-screen").hide();
    $(".difficulty-screen").show();
})

//function to play vs computer in easy mode
$(".difficulty-screen>.single").click(function(){
    $(".difficulty-screen").hide();
    $(".container").show();
    gameOnePlayerEasy();//calling the function set in easy mode
})

//function used to play vs computer in diffucult mode
$(".difficulty-screen>.two").click(function(){
    $(".difficulty-screen").hide();
    $(".container").show();
    gameOnePlayerDifficult();//calling the function set in difficult mode
})

//the game logic for two player where we take the inputs of the players in turn and feed the data
function gameTwoPlayer(){
    $(".winner").hide();
    $(".but").click(function(){
        if(c%2==0){//used for alternating turns between user 1 and 2
            user1.push(this.innerHTML);//pushes the data taken from the user input 
            placeX(this);//function called which places and X on the clicked button
            user1.sort();
            //checking if the user pattern matches with the winning pattern
            if((JSON.stringify(user1).includes('1') && JSON.stringify(user1).includes('2') && JSON.stringify(user1).includes('3')) ||
            (JSON.stringify(user1).includes('4') && JSON.stringify(user1).includes('5') && JSON.stringify(user1).includes('6')) ||
            (JSON.stringify(user1).includes('7') && JSON.stringify(user1).includes('8') && JSON.stringify(user1).includes('9')) ||
            (JSON.stringify(user1).includes('1') && JSON.stringify(user1).includes('4') && JSON.stringify(user1).includes('7')) ||
            (JSON.stringify(user1).includes('2') && JSON.stringify(user1).includes('5') && JSON.stringify(user1).includes('8')) ||
            (JSON.stringify(user1).includes('3') && JSON.stringify(user1).includes('6') && JSON.stringify(user1).includes('9')) ||
            (JSON.stringify(user1).includes('1') && JSON.stringify(user1).includes('5') && JSON.stringify(user1).includes('9')) ||
            (JSON.stringify(user1).includes('3') && JSON.stringify(user1).includes('5') && JSON.stringify(user1).includes('7'))){
                for(var i=0;i<9;i++){
                    buttonDisable[i].disabled="true";
                }
                document.querySelector(".container>.main-title").textContent="Player 1 wins!!";
                endgame();     
            }
            if(draw==8){
                document.querySelector(".container>.main-title").textContent="Draw!!";
                endgame();
            }
        }else{//alternating turns using the counter
            user2.push(this.innerHTML);//taking inputs from the click of user2
            userplaceO(this);
            if((JSON.stringify(user2).includes('1') && JSON.stringify(user2).includes('2') && JSON.stringify(user2).includes('3')) ||
            (JSON.stringify(user2).includes('4') && JSON.stringify(user2).includes('5') && JSON.stringify(user2).includes('6')) ||
            (JSON.stringify(user2).includes('7') && JSON.stringify(user2).includes('8') && JSON.stringify(user2).includes('9')) ||
            (JSON.stringify(user2).includes('1') && JSON.stringify(user2).includes('4') && JSON.stringify(user2).includes('7')) ||
            (JSON.stringify(user2).includes('2') && JSON.stringify(user2).includes('5') && JSON.stringify(user2).includes('8')) ||
            (JSON.stringify(user2).includes('3') && JSON.stringify(user2).includes('6') && JSON.stringify(user2).includes('9')) ||
            (JSON.stringify(user2).includes('1') && JSON.stringify(user2).includes('5') && JSON.stringify(user2).includes('9')) ||
            (JSON.stringify(user2).includes('3') && JSON.stringify(user2).includes('5') && JSON.stringify(user2).includes('7'))){
                for(var i=0;i<9;i++){
                    buttonDisable[i].disabled="true";
                }
                document.querySelector(".container>.main-title").textContent="Player 2 wins!!";
                endgame();
            }
            if(draw==8){
                document.querySelector(".container>.main-title").textContent="Draw!!";
                endgame();
            }
        }
        c++;
        draw++;
    });
}


//function contains the game logic for playing against computer in easy mode
//basically the computer just takes random integers and replaces there value with 'O'
function gameOnePlayerEasy(){
    $(".winner").hide();
    var count=1;//counts the no of turns the user has clicked which allows me to stop the computer after 4 turns
    $(".but").click(function(){   
            user1.push(Number(this.textContent));
            placeX(this);
            draw++;
        if(count<=4){
            var num=randNum(9);//a random function is called and assigned to place 'O' by the computer
            if(user1.includes(num) || user2.includes(num)){//checking if the random no already contains a value
                while(user1.includes(num) || user2.includes(num)){
                    num=randNum(9);//if it contains then it replaces the no with another random no
                }
            }
            user2.push(num);
            placeO(butt[num-1]);
            count++;
            draw++;
        }
            check();//this function checks for a winner
        })
        
}       
    
//This function contains the logic for difficulty mode vs computer
function gameOnePlayerDifficult(){
    $(".winner").hide();
    var compCount=0;
    $(".but").click(function(){//taking in user input by the click of the button
        user1.push(Number(this.textContent));
        placeX(this);
        console.log(user1);
        user1.sort();//using this sort the values for easier identification
        draw++;//increasing the draw counter with each click to decide for a draw
        if(compCount==0){//action performed by comp for first turn
            if(!user1.includes(5) && !user2.includes(5)){
                placeO(butt[4]);//places O in the center if the user does not pick the center
                user2.push(5);
            }else{//else picks one of the corners to place to O
                var data=[0,2,6,8];//data values of the corners
                var ran=randNum(4)-1;
                placeO(butt[(data[ran])]);
                user2.push(data[ran]+1);
            }
            draw++;
        }
        else if(compCount==1){//2nd action performed by the computer
            var cond1=0;
            var cond=checkLine(user1[0],user1[1]);//this is trying to check whether the user has any two X in a row
            if(cond==true){//else places at a remaining corner
                var data=[0,2,6,8];
                for(var i=0;i<4;i++){
                    if((user1.includes(data[i]+1))||(user2.includes(data[i]+1))){
                        data=removeElement(data,data[i]);
                    }
                }
                placeO(butt[data[0]]);
                user2.push((data[0]+1));//pushing the data into the computer list to store values
                
            }
            draw++;
        }
        else if(compCount==2){//3rd function performed by the computer
            console.log(user1)
            var cond=checkLine(user2[0],user2[1]);//checking if the computer has any 'O' in row to win the game
            var cond1=true;
            if(cond==true){//else the computer searches to block of the user from winning
                for(var i2=0;i2<3;i2++){
                    for(var i1=0;i1<3;i1++){
                        if(i1!=i2 && cond1==true){
                            console.log(user1[i2],user1[i1]);
                            console.log(cond1);
                            cond1=checkLine(user1[i2],user1[i1]);
                        }
                        
                    }
                }
                if(cond1==true){
                    placeRandomO();
                } 
            }
            
            draw++;
        }
        else if(compCount==3){//final task done by the computer
            var cond=checkLine(user2[0],user2[1]);
            if(cond==true){
                var cond1=true;
                for(var i2=0;i2<4;i2++){
                    for(var i1=0;i1<4;i1++){
                        if(i1!=i2 && cond1==true){
                        cond1=checkLine(user1[i1],user1[(i2)]);
                        }
                    }
                }
                if(cond1==true){
                    placeRandomO();
                }
            }draw++;
        }
        compCount++;
        check();
        console.log(draw) 
    })
    function checkLine(a,b){//this function checks for the elements present in the row
        var c=0;
        var line=[[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];//all possible rows
        for(var i=0;i<line.length;i++){//checking for all values
            if(line[i].includes(a) && line[i].includes(b)){
                line[i]=removeElement(line[i],a)
                if(line[i].includes(b)){
                    line[i]=removeElement(line[i],b);//leaves with the only element with no value of the row
                    if((butt[(line[i][0]-1)].textContent=="O"||butt[(line[i][0]-1)].textContent=="X")){
                        return true;
                    }
                    else{
                        placeO(butt[(line[i][0]-1)]);//places an 'O' at the empty space provided in the row
                        user2.push(line[i][0])
                        return false;
                    }
                    
                }
            }else{
                c++;
            }
            if(c==line.length && compCount==1){
                var num=randNum(9);
                        if(user1.includes(num) || user2.includes(num)){
                            while(user1.includes(num) || user2.includes(num)){
                                num=randNum(9);
                            }           
                        }
                user2.push(num);
                placeO(butt[num-1]);
                return false;
            }
            if(c==line.length && compCount!=1){
                return true;
            }
        }
    }
}


//function to place O at random position by the computer
function placeRandomO(){
    var num=randNum(9);
    if(user1.includes(num) || user2.includes(num)){
        while(user1.includes(num) || user2.includes(num)){
                num=randNum(9);
        }           
    }
    user2.push(num);
    placeO(butt[num-1]);
}

//function to place X at the position specified by the user
function placeX(some){
    some.innerHTML="X";
    some.style.color="black";
    some.disabled="true";
    some.style.backgroundColor="red";
}

//function to place O at the position specified by the user2 in 2 player or by computer
function placeO(some){
    $(".comp_think").show();
    for(var i = 0;i<9;i++){
        console.log(butt[i]);
        butt[i].disabled="true";
    }
    setTimeout(function(){
    some.innerHTML="O";
    some.style.color="black";
    some.disabled="true";
    some.style.backgroundColor="blue";
    console.log(user1)
    console.log(user2)
    for(var i=1;i<10;i++){
        if(!user1.includes(i) && !user2.includes(i)){
            butt[(i-1)].disabled=false;
        }
    }
    $(".comp_think").hide();
    },2000);
}

//function used to placeO in the 2 player mode
function userplaceO(some){
    some.innerHTML="O";
    some.style.color="black";
    some.disabled="true";
    some.style.backgroundColor="blue";
}

//function to generate random no
function randNum(a){
    var ran=(Math.floor(Math.random()*a))+1;
    return ran;
}

//function to display the refresh button after the game is over
function endgame(){
    setTimeout(function(){$(".winner").show();},2000);
    
}

//function used to remove an element from the list 
function removeElement(line,element){
    var newLine=[];
    for(var k=0;k<line.length;k++){
        if(!(line[k]==element)){
            newLine.push(line[k])
        }
    }
    return newLine;
}

function display(name){
    setTimeout(function(){
        document.querySelector(".container>.main-title").textContent=name;
    },2000)
}
//function used to check whether the user or the computer have won in the game 
function check(){
    //checks for the user's win
    if((JSON.stringify(user1).includes('1') && JSON.stringify(user1).includes('2') && JSON.stringify(user1).includes('3')) ||
            (JSON.stringify(user1).includes('4') && JSON.stringify(user1).includes('5') && JSON.stringify(user1).includes('6')) ||
            (JSON.stringify(user1).includes('7') && JSON.stringify(user1).includes('8') && JSON.stringify(user1).includes('9')) ||
            (JSON.stringify(user1).includes('1') && JSON.stringify(user1).includes('4') && JSON.stringify(user1).includes('7')) ||
            (JSON.stringify(user1).includes('2') && JSON.stringify(user1).includes('5') && JSON.stringify(user1).includes('8')) ||
            (JSON.stringify(user1).includes('3') && JSON.stringify(user1).includes('6') && JSON.stringify(user1).includes('9')) ||
            (JSON.stringify(user1).includes('1') && JSON.stringify(user1).includes('5') && JSON.stringify(user1).includes('9')) ||
            (JSON.stringify(user1).includes('3') && JSON.stringify(user1).includes('5') && JSON.stringify(user1).includes('7'))){
                for(var i=0;i<9;i++){
                    buttonDisable[i].disabled="true";
                }
                document.querySelector(".container>.main-title").textContent="Player wins!!";
                endgame();     
            }
            
            //checks for the computer's win
            else if((JSON.stringify(user2).includes('1') && JSON.stringify(user2).includes('2') && JSON.stringify(user2).includes('3')) ||
            (JSON.stringify(user2).includes('4') && JSON.stringify(user2).includes('5') && JSON.stringify(user2).includes('6')) ||
            (JSON.stringify(user2).includes('7') && JSON.stringify(user2).includes('8') && JSON.stringify(user2).includes('9')) ||
            (JSON.stringify(user2).includes('1') && JSON.stringify(user2).includes('4') && JSON.stringify(user2).includes('7')) ||
            (JSON.stringify(user2).includes('2') && JSON.stringify(user2).includes('5') && JSON.stringify(user2).includes('8')) ||
            (JSON.stringify(user2).includes('3') && JSON.stringify(user2).includes('6') && JSON.stringify(user2).includes('9')) ||
            (JSON.stringify(user2).includes('1') && JSON.stringify(user2).includes('5') && JSON.stringify(user2).includes('9')) ||
            (JSON.stringify(user2).includes('3') && JSON.stringify(user2).includes('5') && JSON.stringify(user2).includes('7'))){
                for(var i=0;i<9;i++){
                    buttonDisable[i].disabled="true";
                }
                display("Computer wins!!");
                endgame();
            }
            else if(draw==9){
                document.querySelector(".container>.main-title").textContent="Draw!!";
                endgame();
            }
}

//function to add decorative input to the game which says the computer is thinking
function think(){
    $(".comp_think").show();
    setTimeout(function(){
        $(".comp_think").hide();
    },2000);

}