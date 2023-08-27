const addUserBtn = document.getElementById('addUser')
const btnText = addUserBtn.innerText;
const usernameTextField = document.getElementById('username')
const recordsDisplay = document.getElementById('records')


let userArray = []; //this empty used for storing the name as we add through on click function,we used this array for 
//storing the data in form of object
let edit_id = null;

let objStr = localStorage.getItem('users')  //jo data get kroge wo string form me hoga 

if (objStr != null) {
    userArray = JSON.parse(objStr)

}
// upar use kiya isko   userArray = JSON.parse(objStr)  // string  form se object form me krne ke liye hm json.parse use kr rhe hai
DisplayInfo();
addUserBtn.onclick = () => {
    const name = usernameTextField.value  //input value lene ke liye .value likha hai
    //iske bad array ke andar as a object value ko store krange jaise ki {name:'naveen'}key value ke form me
    if (edit_id != null) {
        //edit
        userArray.splice(edit_id, 1, { 'name': name })
        edit_id = null
    } else {
        //insert
        userArray.push({ 'name': name })  //push ki jgah shift( use krte to first index pe value store krawata
        //console.log(userArray) console krne pe only data show hoga but save nhi hoga after refresh it will deleted automatically
        //is liye hm saveinfo function use kr rhe hai
    }

    SaveInfo(userArray)
    usernameTextField.value = '';
    DisplayInfo();
    addUserBtn.innerText = btnText;
}


function SaveInfo(userArray) {

    let str = JSON.stringify(userArray)  //userArray object form h usko string form me krne ke liye hm
    //JSON.strigify kr rhe hai 

    localStorage.setItem('users', str);

}

function DisplayInfo() {
    let statement = '';
    userArray.forEach((user, i) => {
        statement += `
        <tr>

        <th scope="row">${i + 1}</th>
        <td>${user.name}</td>
        <td><i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo(${i})'></i>
            <i class="btn btn-danger text-white fa fa-trash" onclick='DeleteInfo(${i})'></i>
        </td>
    </tr>
        
        `
    })
    recordsDisplay.innerHTML = statement;
}
// for edit 
function EditInfo(id) {

    edit_id = id;
    usernameTextField.value = userArray[id].name;
    addUserBtn.innerText = 'Save changes'


}
// for delete

function DeleteInfo(id) {
    userArray.splice(id, 1);
    SaveInfo(userArray);
    DisplayInfo();

}