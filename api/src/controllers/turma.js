const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTurma = async (req, res) => {
    try {
        const { nome, idProfessor, atividades } = req.body;

        // Verifica se os campos obrigatórios estão presentes
        if (!nome || !idProfessor) {
            return res.status(400).json({ error: 'Nome e idProfessor são obrigatórios!' });
        }

        // Cria uma nova turma
        const turma = await prisma.turma.create({
            data: {
                nome,
                idProfessor,
                atividades: {
                    create: atividades || [] // Cria atividades associadas, se existirem
                }
            }
        });

        res.status(201).json(turma);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor!' });
    }
};

const readTurmas = async (req, res) => {
    if (req.params.id !== undefined) {
        const turma = await prisma.turma.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            select: {
                "id": true,
                "nome": true,
                "idProfessor": true,
                "atividades": true
            }
        });
        return res.json(turma);
    } else {
        const turmaes = await prisma.turma.findMany({});
        return res.json(turmaes);
    }
};


const readTurmasProf = async (req, res) => {
    if (req.params.id !== undefined) {
        const turma = await prisma.turma.findMany({
            where: {
                idProfessor: parseInt(req.params.id)
            },
            select: {
                "id": true,
                "nome": true,
                "idProfessor": true,
                "atividades": true
            }
        });
        return res.json(turma);
    } else {
        const turmaes = await prisma.turma.findMany({});
        return res.json(turmaes);
    }
};

const readTurmasAtiv = async (req, res) => {
    if (req.params.id !== undefined) {
        const turma = await prisma.turma.findMany({
            where: {
                id: parseInt(req.params.id)
            },
            select: {
                "id": true,
                "atividades": true
            }
        });
        return res.json(turma);
    } else {
        const turmaes = await prisma.turma.findMany({});
        return res.json(turmaes);
    }
};

const updateTurma = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTurma = await prisma.turma.update({
            where: { id: Number(id) },
            data: req.body
        });

        res.status(200).json(updatedTurma);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar turma!' });
    }
};

const deleteTurma = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.turma.delete({
            where: { id: Number(id) },
        });
        res.status(204).json({ message: 'Turma deletada com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Você não pode excluir uma turma com atividades cadastradas!' });
    }
};

module.exports = {
    createTurma,
    readTurmas,
    updateTurma,
    deleteTurma,
    readTurmasProf,
    readTurmasAtiv
};
