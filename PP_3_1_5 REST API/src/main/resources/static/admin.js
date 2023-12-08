// const urlInfo = 'http://localhost:8080/api/users/admin_info'
// const navbarBrandAdmin = document.getElementById('navbarBrandAdmin') //хедер
// const adminTable = document.getElementById('tableAdmin') //личная инфа админа
// //таблица юзеров
// //let newForm = document.getElementById('newUserForm') //форма для создания юзера
//
//
//
// function getAdminInfo() {
//     console.log('Загружаю страницу администратора...')
//     fetch(urlInfo)
//         .then((res) => res.json())
//         .then(data => {
//             showAdminPage(data)
//             console.log("Страница админа загружена")
//         }).catch((ex) => console.error(ex))
// }
//
// function showAdminPage(userAdmin) {
//     let result = '';
// debugger
//     result += `<tr>
//             <td>${userAdmin.id}</td>
//             <td>${userAdmin.name}</td>
//             <td>${userAdmin.lastName}</td>
//             <td>${userAdmin.age}</td>
//             <td>${userAdmin.email}</td>
//             <td>${userAdmin.username}</td>
//             <td>${userAdmin.roles.map(role => " " + role.role.substring(5))}</td>
//             </tr>`;
//     adminTable.innerHTML = result
//     navbarBrandAdmin.innerHTML = `<b><span>${userAdmin.username}</span></b>
//                              <span>with roles:</span>
//                              <span>${userAdmin.roles.map(role => " " + role.role.substring(5))}</span>`
//
// }
//
// getAdminInfo()

const URL = 'http://localhost:8080/api/users/'
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
        const stringRole = user.roles.map(el => el.role.replace('ROLE_', ' ')).join(', ')
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
                    <button class="btn btn-primary" id="button-edit" type="button"
                    data-toggle="modal" href="#editModal" onclick="getEditModal(${user.id})">Edit
                    </button>
                </td>
                <td class="text-center">
                    <button class="btn btn-danger"  type="button"
                    data-toggle="modal" data-target="#deleteModal"
                    onclick="getDeleteModal(${user.id})">Delete
                    </button>
                </td>
            </tr>`
    }
    usersTable.innerHTML = result
}


let list = [
    {id: 1, role: "ROLE_USER"},
    {id: 2, role: "ROLE_ADMIN"}
]

createNewUser()

//выбор роли из выпадающего списка из newForm
// function checkRolesForNewAndEdit() {
//     let roles = []
//     let options = document.querySelector('#newRoles').options
//     console.log(options)
//     for (let i = 0; i < options.length; i++) {
//         if (options[i].selected) {
//             roles.push(list[i])
//         }
//     }
//     return roles
// }

//Сохранение юзера
// Отправка заполненной формы на сервер
//Предотвращение стандартного поведения браузера при отправке формы с помощью метода e.preventDefault()
// позволяет обработать отправку данных формы программным способом, без перезагрузки или перенаправления страницы.
// В данном случае, это позволяет отправить POST запрос на указанный URL с помощью JavaScript, обработать ответ от сервера
// и обновить список пользователей без перезагрузки страницы.
function createNewUser() {
    newForm.addEventListener('submit', (event) => {
        event.preventDefault();

        //добавляем роли новому пользователю
        let roleslist = []
        let options = document.querySelector('#newRoles').options
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                roleslist.push(list[i])
            }
        }

        fetch('http://localhost:8080/api/users',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({

                    name: document.getElementById('newName').value,
                    lastName: document.getElementById('newLastName').value,
                    age: document.getElementById('newAge').value,
                    email: document.getElementById('newEmail').value,
                    username: document.getElementById('newUsername').value,
                    password: document.getElementById('newPassword').value,
                    roles: roleslist
                })
            })
            .then((response) => {
                if (response.ok) {
                    alert('Новый пользователь успешно сохранен')
                    newForm.reset() //очищаем форму
                    document.getElementById('nav-users-tab').click() //клик по вкладке Users Table
                    getAllUsers() //обновляем таблицу пользователей
                }
            }).catch(ex => console.error('Ошибка отправки формы: ', ex))
    })
}

//============EDIT=============


const editForm = document.forms['editForm']


editUser()

function getEditModal(id) {
    $('#editModal').modal('show')

//получили юзера по id
    fetch(URL + `${id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        //заполняем его исходные данные в форме
        res.json()
            .then(editUser => {
                editForm.id.value = editUser.id
                editForm.name.value = editUser.name
                editForm.lastName.value = editUser.lastName
                editForm.age.value = editUser.age
                editForm.email.value = editUser.email
                editForm.username.value = editUser.username
                editForm.password.value = editUser.password
                document.getElementById('#edit-roles').value = editUser.roles
debugger
                const options = document.querySelector('#edit-roles').options

                for (let i = 0; i < options.length; i++) {
                    if (options[i].value === userEdit.roles[i].id) {
                        options[i].selected = true
                        //если последний элемент - выходим
                        if (i === options.length - 1) {
                            break
                        }
                    } else if (options[i + 1].value === userEdit.roles[i].id) {
                        options[i + 1].selected = true
                    }
                }
            })
    })
}

function editUser() {
    editForm.addEventListener("submit", event => {
        event.preventDefault();

        //добавляем выбранные в форме роли для edit
        let roleslist = $("#edit-roles").val()

       // let options = document.querySelector('#edit-roles').options
        for (let i = 0; i < roleslist.length; i++) {
            if (roleslist[i].value===list[i].id) {
                roleslist.push(list[i])
            }
        }
        let editURL = URL + editForm.id.value

        fetch(editURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                id: editForm.id.value,
                name: editForm.name.value,
                lastName: editForm.lastName.value,
                age: editForm.age.value,
                email: editForm.email.value,
                username: editForm.username.value,
                password: editForm.password.value,
                roles: roleslist

            })
        })
            .then((response) => {
                if (response.ok) {
                    alert("Данные пользователя успешно обновлены")
                    //нажимая кнопку закрыть, вновь попадаем на таблицу юзеров
                    $('#editClose').click()
                    getAllUsers()
                }
            })
            .catch(err => console.error(err))

    })
}

//============DELETE=============


const deleteForm = document.forms['deleteForm']
deleteUser()

function getDeleteModal(id) {
    $('#deleteModal').modal('show')

//получили юзера по id
    fetch(URL + `${id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        //заполняем его исходные данные в форме
        res.json()
            .then(deleteUser => {
                deleteForm.id.value = deleteUser.id
                deleteForm.name.value = deleteUser.name
                deleteForm.lastName.value = deleteUser.lastName
                deleteForm.age.value = deleteUser.age
                deleteForm.email.value = deleteUser.email
                deleteForm.username.value = deleteUser.username

            })
    })
}

function deleteUser() {
    deleteForm.addEventListener("submit", event => {
        event.preventDefault();

        let deleteURL = URL + deleteForm.id.value
        alert("Данные пользователя будут уалены. Продолжить?")

        fetch(deleteURL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                id: deleteForm.id.value,
                name: deleteForm.name.value,
                lastName: deleteForm.lastName.value,
                age: deleteForm.age.value,
                email: deleteForm.email.value,
                username: deleteForm.username.value,
            })
        })
            .then((response) => {
                if (response.ok) {
                    alert("Пользователь удален")
                    //нажимая кнопку закрыть, вновь попадаем на таблицу юзеров
                    $('#deleteClose').click()
                    getAllUsers()
                }
            })
            .catch(err => console.error(err))

    })
}