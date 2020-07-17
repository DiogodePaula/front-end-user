const axios = require('axios').default;

class User{
    constructor(){
        this.name = document.getElementById('txtName');
        this.age = document.getElementById('txtAge');
        this.email = document.getElementById('txtEmail');
        this.phone = document.getElementById('txtPhone');
        this.btnRegisterUser = document.getElementById('btnRegister');

        this.getUsers();
    }

    events(){
        this.btnRegisterUser.onclick = (event) => this.createUser();
    }

    getUsers(){
        axios.get('http://localhost:3000/users')
        .then((result) => {
            this.recoveryUsersg(result.data.usersList);
        })
        .catch((err) =>{
            console.log(err);
        });
    }

    recoveryUsers(data){
        for(use of data){
            const html = this.userLayout(user.name, user.age, user.id, user.email, user.phone);


            this.insertHtml(html);
        }
    }

    userLayout(name, age, email, phone){
        const html = `
            <div class='users'>
                <h5>${name}</h5>
                <h5>${age}</h5>
                <h5>${email}</h5>
                <h5>${phone}</h5>
            </div>
            <br/>
        `
        return html;
    }

    insertHtml(){
        document.getElementById('usersBoard').innerHTML += html;
    }

    createUser(){
        if(this.name.value && this.age.value && this.email.value && this.phone.value){
            let user = {
                name: this.name.value,
                age: this.age.value,
                email: this.email.value,
                phone: this.phone.value
            }

            this.sendUser(user);
        }else{
            alert('Favor preencher os campos');
        }
    }

    sendUser(user) {
        axios.post('http://localhost:3000/users', user)
        .then((result)=> {
            console.log(result);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

}

new User();