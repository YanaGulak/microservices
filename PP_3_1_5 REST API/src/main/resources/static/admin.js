
const urlInfo = 'http://localhost:8080/api/users/admin_info'
const navbarBrandAdmin = document.getElementById('navbarBrandAdmin') //хедер
const adminTable = document.getElementById('tableAdmin') //личная инфа админа
//таблица юзеров
//let newForm = document.getElementById('newUserForm') //форма для создания юзера



function getAdminInfo() {
    console.log('Загружаю страницу администратора...')
    fetch(urlInfo)
        .then((res) => res.json())
        .then(data => {
            showAdminPage(data)
            console.log("Страница админа загружена")
        }).catch((ex) => console.error(ex))
}

function showAdminPage(userAdmin) {
    let result = '';
debugger
    result += `<tr>
            <td>${userAdmin.id}</td>
            <td>${userAdmin.name}</td>
            <td>${userAdmin.lastName}</td>
            <td>${userAdmin.age}</td>
            <td>${userAdmin.email}</td>
            <td>${userAdmin.username}</td>
            <td>${userAdmin.roles.map(role => " " + role.role.substring(5))}</td>
            </tr>`;
    adminTable.innerHTML = result
    navbarBrandAdmin.innerHTML = `<b><span>${userAdmin.username}</span></b>
                             <span>with roles:</span>
                             <span>${userAdmin.roles.map(role => " " + role.role.substring(5))}</span>`

}

getAdminInfo()

const URL = 'http://localhost:8080/api/users'
const usersTable = document.getElementById('usersTable')
let newForm = document.forms['newUserForm'] //форма для создания юзера

getAllUsers()

async function getAllUsers() {
    try {
        const response = await fetch(URL)
        const users = await response.json()
        showTable(users)
    } catch (er) {
        console.error('Ошибка вывода таблицы: ', er)
    }
}
function showTable(users) {

    let result = ''
    for (let user of users) {
      //  let stringRole = ''
           const stringRole = user.roles.map(el => el.role.replace('ROLE_', ' ')).join(', ')
      //  for (let el of user.roles) {
      //      stringRole = getStringRole(user.roles)
          //  debugger
            //   stringRole += role.role + "<br>"
     //   }
        result += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.lastName}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>${user.username}</td>
                <td>${stringRole}</td>
                <td class="text-center">
                    <button class="editBtn btn btn-primary" id="button-edit" type="button"
                    data-toggle="modal" href="#editModal" onclick="editModal(${user.id})">Edit
                    </button>
                </td>
                <td class="text-center">
                    <button class="deleteBtn btn btn-danger"  type="button"
                    data-toggle="modal" data-target="#deleteModal"
                    onclick="deleteModal(${user.id})">Delete
                    </button>
                </td>
            </tr>`
    }
    usersTable.innerHTML = result
}