const axios = require('axios').default;

class User {
    constructor() {
        this.name = document.getElementById('txtName');
        this.email = document.getElementById('txtEmail');
        this.age = document.getElementById('txtAge');
        this.phone = document.getElementById('txtPhone');
        this.nameModal = document.getElementById('update-name');
        this.ageModal = document.getElementById('update-age');
        this.emailModal = document.getElementById('update-email');
        this.phoneModal = document.getElementById('update-phone');
        this.id = 0;
        this.btnRegisterUser = document.getElementById('btnRegister');
        this.btnUpdateUser = document.getElementById('updateUser');
        this.getUsers();
        this.events();
        this.updateUser();
    }

    events() {
        this.btnRegisterUser.onclick = (event) => this.userValidate(event);
        this.btnUpdateUser.onclick = (event) => this.updateUser(this.id);
    }

    getUsers() {
        axios.get(`http://localhost:3000/users`)
            .then((response) => {
                this.recoveryUser(response.data.usersList);
                console.log(response.data.usersList);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    recoveryUser(data) {
        for (user of data) {

            const html = this.layoutUser(user.name, user.email, user.age, user.phone, user.id);


            this.insertHtml(html);
        }

        document.querySelectorAll('.delete-user').forEach(button => {
            button.onclick = event => this.deleteUser(button.id);
        })

        document.querySelectorAll('.get-user').forEach(button => {
            button.onclick = event => this.getUser(button.id);

            console.log(button.id)
        })
       
    }
    
    deleteUser(id) {
        axios.delete(`http://localhost:3000/users/${id}`) 
            .then(response => {
                alert(response.data.result);
            })
            .catch(error => {
                console.log(error);
            })
    }

    getUser(id) {
        axios.get(`http://localhost:3000/users/${id}`)
            .then(response => {
                this.id = id;
                this.nameModal.value = response.data.user[0].name;
                this.ageModal.value = response.data.user[0].age;
                this.emailModal.value = response.data.user[0].email;
                this.phoneModal.value = response.data.user[0].phone;
            })
            .catch(error => {
                console.log(error);
            })
    }

    layoutUser(name, email, age, phone, id) {
        return `
        <div class='col mt-5'>
            <div class='card' id='card-dinamic'>
                <div class="user-body">
                    <h4 class='user-name'>${name}</h4>
                    <p class='user-email'>${email}</p>
                    <p class='user-age'>${age}</p>
                    <p class='user-phone'>${phone}</p>

                    <button type="button" class="btn btn-danger delete-user" 
                    id="${id}">Deletar</button>
                    
                    <button type="button" class="btn btn-warning get-user" data-toggle="modal" 
                    data-target="#exampleModal" data-whatever="@mdo" id="${id}">Editar</button>
                </div>
            </div>
        </div>
        `;
    }

    userValidate(event) {
        event.preventDefault();
        if (this.name.value && this.email.value && this.age.value && this.phone.value) {
            const user = {
                name: this.name.value,
                email: this.email.value,
                age: this.age.value,
                phone: this.phone.value
            }
            
            this.createUser(user);
            
        } else {
            alert('favor, preencha todos os dados');
        }

    }


    insertHtml(html) {
        document.getElementById('usersBoard').innerHTML += html;

    }

    createUser(user) {
        axios.post(`http://localhost:3000/users`, user)
            .then((response) => {
                const html = this.layoutUser(user.name, user.email, user.age, user.phone);

                this.insertHtml(html);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    updateUser(id,) {
        let user = {
            name: this.nameModal.value,
            email: this.emailModal.value,
            age: this.ageModal.value,
            phone: this.phoneModal.value
        }

        axios.put(`http://localhost:3000/users/${id}`, user)
        .then((response) => {
            console.log(response);
        })    
        .catch((err) => {
            console.log(err);
        })
    }

}

new User();