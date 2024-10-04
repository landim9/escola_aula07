const uri = 'http://localhost:3000/professor';
const form = document.getElementById('formRegistro')

form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const dados = {
        nome: form.nome.value,
        email: form.email.value,
        senha: form.senha.value
    };

    fetch(`${uri}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(res => {
        if (res.status === 400) {
            alert('Por favor, preencha todos os campos obrigatórios corretamente.');
            return;
        } else if (res.status === 409) {
            alert('Já existe um usuário cadastrado com este e-mail.');
            return;
        } else if (!res.ok) {
            throw new Error('Erro ao registrar o usuário');
        }
        return res.json();
    })
    .then(res => {
        console.log(res);
        alert('Usuário registrado com sucesso!'); // Confirmação de registro
        window.location.href = '../../index.html'; // Redireciona após o registro
    })
    .catch(err => {
        console.error('Erro:', err);
        alert('Ocorreu um erro ao registrar o usuário. Tente novamente mais tarde.');
    });
});
