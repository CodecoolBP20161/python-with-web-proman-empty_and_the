$(document).ready(function(){
    test();
    });

var Cards = function(title, text, id)
{
    this.title = title
    this.text = text
    this.id = id
}


card1= new Cards("dasasd", "asdasdasd", 1)
card2= new Cards("dasasd", "asdasdasd", 2)
card3= new Cards("dasasd", "asdasdasd", 3)




var test = function()
{
    var board_id = window.location.pathname.split("/")[2]
    var a = JSON.parse(localStorage.boards)
    a[0].cards.push(card1)
    a[0].cards.push(card2)
    a[0].cards.push(card3)
    localStorage.boards = JSON.stringify(a)
    var b = JSON.parse(localStorage.boards)
    console.log(b[0].cards[1])
}
