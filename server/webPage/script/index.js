// DBからタスク一覧取得
window.onload = function loadTasks(){
    fetch('http://13.231.30.42:3000')
    .then(response => response.json())
    .then(data => {
        for (let i = 0 ; i < data.length ; i++){
            viewTask(data[i].task);
        }
    })
    .catch(error => console.error('Error:', error));
}

// タスク追加
function viewTask(value){
    // 要素取得
    const taskList = document.getElementById("taskList");
    const addTask = document.getElementById("taskContent");

    // 追加するHTML要素(タスク)の作成
    let div = document.createElement("div");
    let checkbox = document.createElement("input");
    let p = document.createElement("p");
    checkbox.setAttribute("type","checkbox");
    checkbox.setAttribute("onclick","inputCompleteButton()");
    p.append(value);
    div.setAttribute("class","task");
    div.append(checkbox);
    div.append(p);
    // スタイル設定
    div.style.display = "flex";

    // タスクリストに追加
    taskList.append(div);
    console.log("add task!");
}

// タスク追加
function inputSubmitButton(){
    // 要素取得
    const taskList = document.getElementById("taskList");
    const addTask = document.getElementById("taskContent");

    // 追加するHTML要素(タスク)の作成
    let div = document.createElement("div");
    let checkbox = document.createElement("input");
    let p = document.createElement("p");
    checkbox.setAttribute("type","checkbox");
    checkbox.setAttribute("onclick","inputCompleteButton()");
    p.append(addTask.value);
    div.setAttribute("class","task");
    div.append(checkbox);
    div.append(p);
    // スタイル設定
    div.style.display = "flex";

    // タスクリストに追加
    taskList.append(div);
    // console.log("add task!");

    // DBに送信
    fetch('http://13.231.30.42:3000', {
        method: "POST",
        body: JSON.stringify({ task: addTask.value}),
      })
    .catch(error => console.error('Error:', error));
}

// タスク完了
function inputCompleteButton(){
    // 要素取得
    const taskList = document.getElementById("taskList");
    const tasks = document.getElementsByClassName("task");

    // チェックボックスにチェックされている数を取得
    let checkCnt = 0;
    for (let i = 0; i < tasks.length; i++){
        checkbox = tasks[i].getElementsByTagName("input")[0];
        if (!checkbox.checked){
            break;
        }
        checkCnt++;
    }
    
    // リストを削除
    if (checkCnt == tasks.length){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        console.log("delete tasks!");
    }
}