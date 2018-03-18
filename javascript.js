var todos = [];
//clear ul node
window.onload = function () {
    render();
}
//render 
function render() {
    var ul = document.querySelector("ul");
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    todos = JSON.parse(sessionStorage["todos"]);
    var ul = document.querySelector("ul");
    for (var i = 0; i < todos.length; i++) {
        var li = document.createElement("li");
        li.addEventListener("click", function () {
            var comp = 0;
            if (this.getAttribute('class') == null) {

                this.setAttribute('class', 'completed');
                comp = 1;
            }
            else this.removeAttribute('class');
            var str = this.innerText.substr(0, this.innerText.length - 2);
        
            var index = todos.findIndex(x => x.text == str);
            todos[index].completed = comp;
            sessionStorage.setItem("todos", JSON.stringify(todos));
        })
        var textNode = document.createTextNode(todos[i].text);
        li.appendChild(textNode);
        if(todos[i].completed == 1) li.setAttribute('class','completed');
        li.innerHTML += "<span class='close'>x</span>";
        ul.appendChild(li);
    }
    //remove event
    var close = document.getElementsByClassName("close");
    for (var i = 0; i < close.length; i++) {
        close[i].onclick =   function () {
            var temp = this.parentNode.innerText;
            temp = temp.substr(0,temp.length-2);
            var ind = todos.findIndex(x => x.text == temp);
           
            todos.splice(ind, 1);
            sessionStorage.setItem("todos", JSON.stringify(todos));
            render();
        };
    }
}
//add todo event
var button = document.querySelector("button");

button.addEventListener("click", addTodo);
document.querySelector("input").addEventListener("keypress", function (event) {
    if (event.keyCode == 13) {
        addTodo();
    }
})

//add todo function
function addTodo() {
    var inputValue = document.querySelector("input").value;
    if (inputValue == "") alert("invalid input");
    else {
        var li = document.createElement("li");
        li.addEventListener("click", function () {
            var comp = 0;
            if (this.getAttribute('class') == null) {

                this.setAttribute('class', 'completed');
                comp = 1;
            }
            else this.removeAttribute('class');
            var str = this.innerText.substr(0, this.innerText.length - 2);
        
            var index = todos.findIndex(x => x.text == str);
            todos[index].completed = comp;
            sessionStorage.setItem("todos", JSON.stringify(todos));

        })
        var text = document.createTextNode(inputValue);
        li.appendChild(text);
        li.innerHTML += "<span class='close'>x</span>";
        var ul = document.querySelector("ul");
        ul.appendChild(li);
        todos.push({
            text: inputValue,
            completed: 0
        })
        sessionStorage.setItem("todos", JSON.stringify(todos));

    }
    document.querySelector("input").value = "";
    //remove event
    var close = document.getElementsByClassName("close");
    for (var i = 0; i < close.length; i++) {
        close[i].onclick =   function () {
            var temp = this.parentNode.innerText;
            temp = temp.substr(0,temp.length-2);
            var ind = todos.findIndex(x => x.text == temp);
           
            todos.splice(ind, 1);
           
            sessionStorage.setItem("todos", JSON.stringify(todos));
            render();
        };
    }
}

