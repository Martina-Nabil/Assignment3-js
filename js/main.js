var bookmarkNameInput = document.getElementById('bookMarkName');
var bookmarkSiteInput = document.getElementById('bookMarkSite');
var tableBody = document.getElementById('tableBody');
var msgNameSite = document.getElementById('messageNameSite');
var msgUrlSite = document.getElementById('messageUrlSite');
var myBox = document.getElementById('myBox');
var closeIcon = document.getElementById('closeIcon');
var deleteAllButton = document.getElementById("deleteAll");
var undoDeleteAllBtn = document.getElementById("undoDeleteAllBtn");
var undoMessage = document.getElementById('undoMessage');
var undoDeleteBtn = document.getElementById('undoDelete');

var bookmarkContainer ;
if(localStorage.getItem("Sites Name")){
    bookmarkContainer = JSON.parse(localStorage.getItem("Sites Name"));
    displayData(bookmarkContainer);
}
else{
    bookmarkContainer =[];
}


myBox.addEventListener("click", function (eventinfo) {
    // eventinfo.stopPropagation()
    // console.log(eventinfo.target.classList.contains("box"));
    if (eventinfo.target.classList.contains("box")) {
        console.log('hello');
        closeBox();
    }
});






function closeBox(){

    myBox.classList.add("d-none");

}

function addSite(){
    if(regexNameSite() && regexUrlSite()) {
        var bookMark ={
            bookmarkName : bookmarkNameInput.value,
            bookmarkSite : bookmarkSiteInput.value,
        }
        bookmarkContainer.push(bookMark);
        localStorage.setItem("Sites Name",JSON.stringify(bookmarkContainer));
        displayData(bookmarkContainer);
        clear();
        bookmarkSiteInput.classList.remove('is-valid');
        bookmarkNameInput.classList.remove('is-valid');
    }
    else{
        myBox.classList.remove("d-none");
        
        
        closeIcon.addEventListener('click', function(){
        closeBox();
        });
        
    
    }
    
    
}



// console.log(bookMarkContainer)
var index;
function displayData(arr){
    var box = '';
    for(var i =0 ; i<bookmarkContainer.length ; i++){
        index=i+1
        box += `<tr>
        <td>${index}</td>
        <td style="text-transform: capitalize;">${arr[i].bookmarkName}</td>
        <td><button class=" btn btn-visit" onclick="visitSite(${i})"> <i class="fa-solid fa-eye"></i> Visit</button></td>
        <td><button class=" btn btn-delete" onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>`
    }
    tableBody.innerHTML=box;
}


function clear(){
    bookmarkNameInput.value=''
    bookmarkSiteInput.value=''
}


var deletedSites ;
var indexUndo = 0;
function deleteSite(deleteIndex){
    indexUndo = deleteIndex;
    deletedSites = bookmarkContainer.splice(deleteIndex,1);
    localStorage.setItem("Sites Name",JSON.stringify(bookmarkContainer));
    sessionStorage.setItem("Deleted Sites", JSON.stringify(deletedSites))
    displayData(bookmarkContainer);

}

function visitSite(visitIndex){
    // console.log(bookmarkContainer[visitIndex].bookmarkSite);

    window.open(bookmarkContainer[visitIndex].bookmarkSite, '_blank');
}

function regexNameSite(){
    var regexName = /^[A-Za-z]{3,12}$/
    var bookmarkName = bookmarkNameInput.value;

    if(regexName.test(bookmarkName)){
        bookmarkNameInput.classList.add('is-valid')
        bookmarkNameInput.classList.remove('is-invalid')
        msgNameSite.classList.add('d-none')
        
        return true;

    }
    else{
        bookmarkNameInput.classList.add('is-invalid')
        bookmarkNameInput.classList.remove('is-valid')
        msgNameSite.classList.remove('d-none')
        return false;
    }

}


function regexUrlSite(){
    var regexSite = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
    var bookmarkSite = bookmarkSiteInput.value;

    if(regexSite.test(bookmarkSite)){
        bookmarkSiteInput.classList.add('is-valid')
        bookmarkSiteInput.classList.remove('is-invalid')
        msgUrlSite.classList.add('d-none')
        
        return true;

    }
    else{
        bookmarkSiteInput.classList.add('is-invalid')
        bookmarkSiteInput.classList.remove('is-valid')
        msgUrlSite.classList.remove('d-none')
        return false;
    }

}


var deletedAllSites = [];
function deleteAll() {
    
    localStorage.removeItem("Sites Name");
    deletedAllSites = bookmarkContainer.splice(0);
    // console.log(deletedAllProducts)
    sessionStorage.setItem("Deleted All Sites", JSON.stringify(deletedAllSites))
    displayData(bookmarkContainer);
    undoDeleteAllBtn.classList.remove('disabled')

}


function undoDeleteAll() {

    var undoDeletedAllSites = JSON.parse(sessionStorage.getItem("Deleted All Sites"))
    bookmarkContainer = bookmarkContainer.concat(undoDeletedAllSites);
    localStorage.setItem("Sites Name",JSON.stringify(bookmarkContainer));
    displayData(bookmarkContainer);
    sessionStorage.removeItem("Deleted All Sites");
    undoDeleteAllBtn.classList.add('disabled')
    
}




function undoDelete() {
    if (sessionStorage.getItem("Deleted Sites")) {
        deletedSites = JSON.parse(sessionStorage.getItem("Deleted Sites"));
        // console.log(deletedSites);
        bookmarkContainer.splice(indexUndo , 0, deletedSites[0]); 
        localStorage.setItem("Sites Name",JSON.stringify(bookmarkContainer));
        displayData(bookmarkContainer);
        sessionStorage.removeItem("Deleted Sites");
        undoMessage.classList.add('d-none');
    } else {
        undoMessage.classList.remove('d-none');
    }
}
