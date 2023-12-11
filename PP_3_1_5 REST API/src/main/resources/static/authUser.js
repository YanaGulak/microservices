const urlUser = 'http://localhost:8080/api/user/'
const navbarBrandUser = document.getElementById('navbarBrandUser'); //хедер
const tableAuthUser = document.getElementById('tableAuthUser');//таблица

function showCurrentUser() {
    console.log('Загружаю данные пользователя...')
    fetch(urlUser)
        .then((response) => response.json())
        .then((data) => {
            showUserInfo(data)
        }).catch((ex) => console.error(ex))
    console.log('Информация о пользователе загружена')
}

function showUserInfo(user) {
    let result = ''
    result += `
         <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.lastName}</td>
                        <td>${user.age}</td>
                        <td>${user.email}</td>
                        <td>${user.username}</td>
                       <td>${user.roles.map(e => " " + e.role.substring(5))}</td>
                        </tr>`
    tableAuthUser.innerHTML = result
    navbarBrandUser.innerHTML = `<b><span>${user.username}</span></b>
                             <span>with roles:</span>
                             <span>${user.roles.map(e => " " + e.role.substring(5))}</span>`

}

showCurrentUser()