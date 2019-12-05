(function() {
'use strict';

var ths = document.getElementsByTagName('th');  //Name Team Score
var i;
var sortOrder = 1; //1:昇順、-1:降順

for (i = 0; i < ths.length; i++) {
ths[i].addEventListener('click', function() {
// console.log(this.cellIndex); //セルのindex番号。Nameをクリク → 0, Teamをクリック → 1

//sort
// var arr = ['taguchi', 'fkoji', 'dotinstall'];
// var rows = document.querySelectorAll('tbody' > tr); //NodeList(配列に変換が必要)
var rows = Array.prototype.slice.call(document.querySelectorAll('tbody > tr')); //配列で出力
// console.log(rows);  //[tr, tr, tr, tr, tr]
// return;

var col = this.cellIndex;  //下記functionでthisを使うと違う意味になるため、変数で取得。
var type = this.dataset.type //html側のdatasetの設定で、stringかnumberが入ってくる。

rows.sort(function(a, b) { //tr tr
  if (type === "number") {
    var _a = a.children[col].textContent * 1; 
    var _b = b.children[col].textContent * 1;
  }

  if (type === "string") {
    var _a = a.children[col].textContent.toLowerCase(); //クリックされた見出しの列のtextを取得
    var _b = b.children[col].textContent.toLowerCase();
    //※数値に関しては、textContent で引っ張ってくるの文字列になるため、先頭の 1 文字から順に比較するため上手くソートされない。
  }

  if (_a < _b) { //文字コードでいうと大文字の方が小文字より先にくるため、こちらの比較演算子を使うと大文字の方が小文字より小さいと判断される。このため、↑に"toLowerCase()"を加えて小文字にする。
    return -1 * sortOrder;
  }
  if (_a > _b) {
    return 1 * sortOrder;
  }
  return 0;
});

// console.log(rows);

//ここまでで配列が並び変わったので、実際に表の中身を書き換える。
//tbody の中身を一旦全て消して、並び替えられた配列の要素を tbody の子要素として追加してあげる。
var tbody = document.querySelector('tbody');

// tbody の中身を消す。
// 「tbodyの最初の子要素がある限り、tbodyの子要素を削除する。」(決まり文句みたいなもの)
//　"削除する要素は最初の子要素"、としてあげると、最初の子要素をどんどん消していってくれて、中身がなくなるまでやってくれる。
while (tbody.firstChild) {
  tbody.removeChild(tbody.firstChild);
}

// tbody にの並び替えられた rows の要素を追加していってあげる。
var j;
for (j = 0; j < rows.length; j++) {
  tbody.appendChild(rows[j]);
}

//アイコンの種類をクラスで管理する。(一旦 th についているクラスをリセットしたあとに、クリックした th に対してクラスをつけてあげる)
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