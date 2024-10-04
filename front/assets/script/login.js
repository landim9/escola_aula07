const uri = 'http://localhost:3000/login';
const user = JSON.parse(window.localStorage.getItem('userTurmaAtividade'));
const form = document.querySelector('#formLogin');

if (user)
    if (user.logado) {
        window.location.href = './assets/pages/home.html';
    }

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const dados = {
        email: form.email.value,
        senha: form.senha.value
    };
    fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then(res => {
            if (res.status == 401) {
                alert('Usuário ou senha inválidos');
                window.location.reload();
            } else
                return res.json()
        })
        .then(res => {
            const dados = res;
            dados.logado = true;
            window.localStorage.setItem('userTurmaAtividade', JSON.stringify(dados));
            window.location.href = './assets/pages/home.html';
        })
        .catch(err => console.error('Erro:', err));
});

function registre(){
    window.location.href = './assets/pages/registre.html';
}