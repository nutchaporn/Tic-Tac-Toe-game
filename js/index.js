var play = 'x';
var number = 0;
var num = [];
var saveTable = [];
var landscape = [];
var vertical = [];
var diagonal = [];
var winGame = [];
var dataTable = localStorage.getItem("save");

function valueText(a1,a2){
  num = a1
  if(a1 == a2){
    if(a1 >= 3 && a2 >= 3){
      ArrayTable(a1,a2)
      $('#buttonID').prop('disabled', true);
    } else {
      $('#msg').html('!!!ERROR!!!');
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
  let valueTable = [];
  let DT = [];
  let saveString = [];
  $('#msg').html( play + ' WIN!!!');
  if (dataTable !== null){
    DT = JSON.parse(dataTable);
  }
  valueTable = {
    "number": num,
    "dataWin": saveTable,
    "win": play
  }
  DT.push(valueTable)
  saveString = JSON.stringify(DT)
  localStorage.setItem("save", saveString);
  dataTable = localStorage.getItem("save");
  $('input').prop('disabled', true);
};

function showData(){
  let sum = [];
  let indexXO = '';
  let htmlInput = '';
  sum = JSON.parse(dataTable);
  sum.forEach( s => {
    let n = 0;
    htmlInput += `<table id="T${sum.indexOf(s)}">`
    for(let i = 0; i < s.number; i++){
      htmlInput += `<tr id='tr${i}'>`
      for(let j = 0; j < s.number; j++){
        if(s.dataWin[n] == 'x'){
          indexXO = 'x'
        } else if(s.dataWin[n] == 'o'){
          indexXO = 'o'
        } else {
          indexXO = 'p'
        }
        htmlInput += `<td id='td${j}'><input type='image' src='image/${indexXO}.jpg' id='${n}'></td>` 
        n++
      };
      htmlInput += `</tr>`
    };
    htmlInput += `</table> <br><h1>${s.win} WIN!!!</h1>`
  })

  $('#containerData').html(htmlInput);
}
