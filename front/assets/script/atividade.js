const uri = 'http://localhost:3000/';
const user = JSON.parse(window.localStorage.getItem('userTurmaAtividade'));
const turma = JSON.parse(window.localStorage.getItem('turma'));
const professor = document.querySelector('#professor');
const corpo = document.querySelector('#corpo');
const form = document.querySelector('#formAtividade');
const nomeTurma = document.querySelector('#nomeTurma');

if (!user)
    window.location.href = '../pages/index.html';
else{
    if (!user.logado) {
        window.location.href = '../pages/index.html';
    }
    if (!turma){
        window.location.href = '../pages/home.html';
    }
}
professor.innerHTML = user.nome;
nomeTurma.innerHTML = turma.nome;
//Listar todas as turmas do professor
fetch(uri + 'turmas/' + turma.id)
    .then(response => response.json())
    .then(data => {
        data.forEach(a => {
            corpo.innerHTML += `
            <tr>
                <td style="text-align:center;padding: 0.5rem;">${a.id}</td>
                <td>${a.descricao}</td>
            </tr>`;
        });
    });

//Cadastrar atividade
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dados = {
        descricao: form.descricao.value,
        turmaId: turma.id
    }
    fetch(uri + 'atividade', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then(response => response.json())
        .then(data => {
            if (data.id) {
                alert('Atividade cadastrada com sucesso!');
                window.location.reload();
            }
        });
});

//Sair do sistema
function sair() {
    window.localStorage.removeItem("userTurmaAtividade");
    window.localStorage.removeItem("turma");
    window.location.href = "../../index.html";
}