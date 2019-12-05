(function() {
'use strict';

var ths = document.getElementsByTagName('th'); 
var i;
var sortOrder = 1; //1:昇順、-1:降順

for (i = 0; i < ths.length; i++) {
ths[i].addEventListener('click', function() {

var rows = Array.prototype.slice.call(document.querySelectorAll('tbody > tr')); 

var col = this.cellIndex;  
var type = this.dataset.type 

rows.sort(function(a, b) {
  if (type === "number") {
    var _a = a.children[col].textContent * 1; 
    var _b = b.children[col].textContent * 1;
  }

  if (type === "string") {
    var _a = a.children[col].textContent.toLowerCase(); 
    var _b = b.children[col].textContent.toLowerCase();
  }

  if (_a < _b) { 
    return -1 * sortOrder;
  }
  if (_a > _b) {
    return 1 * sortOrder;
  }
  return 0;
});

var tbody = document.querySelector('tbody');


while (tbody.firstChild) {
  tbody.removeChild(tbody.firstChild);
}

var j;
for (j = 0; j < rows.length; j++) {
  tbody.appendChild(rows[j]);
}

var k;
for (k = 0; k < ths.length; k++) {
  ths[k].className = '';  //クラスをリセット
}

//sortOrder に応じて ClassName をつけていきたいので、sortOrder がもし 1 だったら昇順という意味で 'asc' という className、そうではなかったら降順なので 'desc' という className をつけてあげる。
this.className = sortOrder === 1 ? 'asc' : 'desc';

sortOrder *= -1; //反転させる

});
}

})();