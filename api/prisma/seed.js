const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const turmas = require("./turmas.json");
const professores = require("./professor.json");
const atividades = require("./atividades.json");

async function main() {
    const createdProfessores = {};
for (const professor of professores) {
    const hashedPassword = await bcrypt.hash(professor.senha, 10); // Hash da senha do professor atual
    const createdProfessor = await prisma.professor.create({
        data: {
            nome: professor.nome,
            email: professor.email,
            senha: hashedPassword // Usar o hashedPassword aqui
        }
    });
    createdProfessores[createdProfessor.id] = createdProfessor; // Armazenar o professor criado
    console.log(`Professor criado: ${createdProfessor.nome}`);
}


    // Criar turmas
    const createdTurmas = {};
    for (const turma of turmas) {
        const createdTurma = await prisma.turma.create({
            data: {
                nome: turma.nome,
                idProfessor: turma.idProfessor, // Relacionar com o id do professor
                atividades: {
                    create: turma.atividades || [] // Criar atividades se existirem
                }
            }
        });
        createdTurmas[createdTurma.id] = createdTurma; // Armazenar a turma criada
        console.log(`Turma criada: ${createdTurma.nome}`);
    }

    // Criar atividades
    for (const atividade of atividades) {
        const createdAtividade = await prisma.atividade.create({
            data: {
                nome: atividade.nome,
                turmaId: atividade.turmaId // Associar a atividade à turma correta
            }
        });
        console.log(`Atividade criada: ${createdAtividade.nome}`);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
