const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createAtividade = async (req, res) => {
    try {
        const { descricao, turmaId } = req.body;

        if (!descricao || !turmaId) {
            return res.status(400).json({ error: 'descricao e turmaId são obrigatórios!' });
        }

        const atividade = await prisma.atividade.create({
            data: {
                descricao,
                turmaId: Number(turmaId)
            }
        });

        res.status(201).json(atividade);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor!' });
    }
};

const readAtividades = async (req, res) => {
    try {
        const atividades = await prisma.atividade.findMany({});
        

        res.status(200).json(atividades);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar atividades!' });
    }
};

const readAtividadesTurma = async (req, res) => {
    try {
        const id = req.params.id;

        const atividades = await prisma.atividade.findMany({
            where: {
                turmaId: parseInt(id)
            },
            select: {
                "id": true,
                "atividades": true
            }
        });
        

        res.status(200).json(atividades);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar atividades!' });
    }
};

const updateAtividade = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAtividade = await prisma.atividade.update({
            where: { id: Number(id) },
            data: req.body
        });

        res.status(200).json(updatedAtividade);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar atividade!' });
    }
};

const deleteAtividade = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.atividade.delete({
            where: { id: Number(id) },
        });
        res.status(200).json({ message: 'Atividade deletada com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar atividade!' });
    }
};

module.exports = {
    createAtividade,
    readAtividades,
    updateAtividade,
    deleteAtividade,
    readAtividadesTurma
};
