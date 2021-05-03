var play = 'x';
var gameT = [0,1,2,3,4,5,7,8];
var value1 = '';
var value2 = '';

const winGame = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function checkWin(){
  let temA = [];
  let winG = false;
  for (let i = 0; i < gameT.length; i++){
    if( play == gameT[i]){
      temA.push(i)
    }
  }
  for(const [index, win] of winGame.entries()){
    let myChack = true;
    win.forEach( w => {
      if(temA.indexOf(w) > -1){
        myChack = myChack && true;
      } else {
        myChack = myChack && false;
      }
    })
    if(myChack) {
      winG = true;
      break; 
    }
  }

  console.log(temA);
  return winG;
};

function endGame(){
  $('#msg').html( play + ' WIN!!!');
  $('input').prop('disabled', true);
};

function turnT(btn){
  gameT[btn.id] = play;
  btn.src = 'image/' + play + '.jpg';
  btn.disabled = true;
  let status = checkWin();
  if (status) {
    endGame();
  }
  play = play == 'x' ? 'o' : 'x';
}

function ArrayTable(){
  let inputs = '';
  let m = 0;
  let n = 0;
  for(let i = 0; i < value1; i++){
    inputs += `<tr id="tr${n}">`
    for(let j = 0; j < value2; j++){
      inputs += `<td id="td${m}"><input type="image" src="image/p.jpg" id="${m}"></td>` 
      m++
    };
    n++
    inputs += `</tr>`
  };

  console.log(inputs)
  $('#container').html(inputs)
  
}

$('#text1').change(function () { 
  value1 = parseInt($(this).val());
  $('#text2').change(function (){
    value2 = parseInt($(this).val());
    ArrayTable()
  });
});

$('#0').click(function (){
  e.preventDefault();
  console.log('x')
  turnT(this)
});
$('#1').click(function (e) { 
  e.preventDefault();
  turnT(this)
});
$('#2').click(function (e) { 
  e.preventDefault();
  turnT(this)
});
$('#3').click(function (e) { 
  e.preventDefault();
  turnT(this)
});
$('#4').click(function (e) { 
  e.preventDefault();
  turnT(this)
});
$('#5').click(function (e) { 
  e.preventDefault();
  turnT(this)
});
$('#6').click(function (e) { 
  e.preventDefault();
  turnT(this)
});
$('#7').click(function (e) { 
  e.preventDefault();
  turnT(this)
});
$('#8').click(function (e) { 
  e.preventDefault();
  turnT(this)
});