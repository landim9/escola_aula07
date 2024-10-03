const uri = 'http://localhost:3000/';
const user = JSON.parse(window.localStorage.getItem('userTurmaAtividade'));
const professor = document.querySelector('#professor');
const corpo = document.getElementById('corpo');
const form = document.querySelector('#formTurma');



if (!user)
    window.location.href = '../../index.html';
else
    if (!user.logado) {
        window.location.href = '../../index.html';
    }
professor.innerHTML = `Bem vindo(a): ${user.nome}`;

fetch(uri + 'turma/' + user.id)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados recebidos:', data); // Log para verificar a estrutura
        if (data && Array.isArray(data)) {
            data.forEach(prof => {
                corpo.innerHTML += `
                <tr>
                    <td style="text-align:center">${prof.id}</td>
                    <td>${prof.nome}</td>
                    <td style="text-align:center">
                        <button class="bexcluir" onclick="excluir(${prof.id})">Excluir</button>
                        <button class="bvisualizar" onclick="visualizar(${prof.id},'${prof.nome}')">Visualizar</button>
                    </td>
                </tr>`;
            });
        } else {
            console.warn('Nenhuma turma encontrada ou a estrutura é inválida.');
        }
    })
    .catch(error => {
        console.error('Erro ao buscar turmas:', error);
    });




form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dados = {
        nome: form.nome.value,
        idProfessor: user.id
    }
    fetch(uri + 'turma', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then(response => response.json())
        .then(data => {
            if (data.id) {
                alert('Turma cadastrada com sucesso!');
                window.location.reload();
            }
        });
});

function excluir(id) {
    if (confirm('Deseja realmente excluir esta turma?')) {
        fetch(uri + 'turma/' + id, {
            method: 'DELETE'
        })
            .then(response => response.status)
            .then(data => {
                if (data === 204) {
                    alert('Turma excluída com sucesso!');
                    window.location.reload();
                } else {
                    alert('Você não pode excluir uma turma com atividades cadastradas!');
                }
            });
    }
}

function visualizar(id, nome) {
    const turma = { id, nome };
    window.localStorage.setItem('turma', JSON.stringify(turma));
    window.location.href = '../pages/atividades.html';
}

function sair() {
    window.localStorage.removeItem("userTurmaAtividade");
    window.location.href = "../../index.html";
}