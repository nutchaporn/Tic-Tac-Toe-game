var play = 'x';
var number = 0;
var num = [];
var saveTable = [];
var landscape = [];
var vertical = [];
var diagonal = [];
var winGame = [];

function valueText(a1,a2){
  if(a1 == a2){
    if(a1 >= 3 && a2 >= 3){
      ArrayTable(a1,a2)
      $('button').prop('disabled', true);
    }
  } else {
    $('#msg').html('!!!ERROR!!!');
  }
}

function ArrayTable(value1,value2){
  var inputs = '';
  let td1 = [];
  for(let i = 0; i < value1; i++){
    inputs += `<tr id='tr${i}'>`
    for(let j = 0; j < value2; j++){
      inputs += `<td id='td${j}'><input type='image' src='image/p.jpg' id='${number}' onclick="chackInput(this)"></td>` 
      td1.push(number);
      saveTable.push(number);
      number++;
    };
    landscape.push(td1)
    td1 = [];
    inputs += `</tr>`
  };
  chackVertical()
  winGame.push(landscape);
  winGame.push(vertical);
  winGame.push(diagonal);
  console.log(winGame);
  $('#container').html(inputs)
}

function chackVertical(){
  let ans = [];
  let ans2 = [];
  let ans3 = [];
  let a = 0;
  let b = landscape.length-1;
  for(let k = 0; landscape.length > k; k++){
    landscape.forEach( l => {
      l.forEach( g  => {
        if(l.indexOf(g) == k) {
          ans.push(g)
        } 
        if(l.indexOf(g) == a) {
          ans2.push(g)
        }
        if(l.indexOf(g) == b) {
          ans3.push(g)
        }  
      })
      a++
      b--
    })
    vertical.push(ans)
    ans = [];
  }
  diagonal.push(ans2)
  diagonal.push(ans3)
}

function chackInput(k){
  saveTable[k.id] = play;
  k.src = 'image/' + play + '.jpg';
  k.disabled = true;
  let status = checkWin();
  if (status) {
    endGame();
  }
  play = play == 'x' ? 'o' : 'x';
}

function checkWin(){
  let temData = [];
  let winner = false;
  for (let i = 0; i < saveTable.length; i++){
    if( play == saveTable[i]){
      temData.push(i)
    }
  }
  for(const [index, selectAns] of winGame.entries()){
    for(const [index, win] of selectAns.entries()){
      let myChack = true;
      win.forEach( w => {
        if(temData.indexOf(w) > -1){
          myChack = myChack && true;
        } else {
          myChack = myChack && false;
        }
      })
      if(myChack) {
        winner = true;
        break; 
      }
    }
  }
  return winner;
};

function endGame(){
  $('#msg').html( play + ' WIN!!!');
  $('input').prop('disabled', true);
};