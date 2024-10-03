const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt'); 
require('dotenv').config();

const create = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'Nome, email e senha são obrigatórios!' });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        const professor = await prisma.professor.create({
            data: {
                nome,
                email,
                senha: hashedPassword,
            },
        });

        res.status(201).json({ message: 'Registro efetuado com sucesso'});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor!' });
    }
};

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const professor = await prisma.professor.findFirst({
            where: { email }
        });

        if (!professor) {
            return res.status(404).json({ error: "Professor não encontrado!" });
        }

      
        const isValidPassword = await bcrypt.compare(senha, professor.senha);
        if (!isValidPassword) {
            return res.status(401).json({ error: "Senha incorreta!" });
        }

    
        res.status(200).json({
            id: professor.id,
            email: professor.email,
            nome: professor.nome
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor!' });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProfessor = await prisma.professor.update({
            where: { id: Number(id) },
            data: req.body
        });

        res.status(200).json(updatedProfessor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar professor!' });
    }
};

const read = async (req, res) => {
    const id = req.params.id;

    if (id) {
        const parsedId = parseInt(id);

        if (isNaN(parsedId)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const professor = await prisma.professor.findUnique({
            where: {
                id: parsedId // Use parsedId aqui
            },
            select: {
                id: true,
                nome: true,
                email: true,
                Turma: true
            }
        });

        if (!professor) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }

        return res.json(professor);
    } else {
        const professores = await prisma.professor.findMany({
            select: {
                id: true,
                nome: true,
                email: true,
                Turma: true
            }
        });

        return res.json(professores);
    }
};



const deleta = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.professor.delete({
            where: { id: Number(id) },
        });
        res.status(200).json({ message: 'Professor deletado com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar professor!' });
        console.log("Não é possivel excluir um professor cadastrado a uma turma")
    }
};



module.exports = {
    create,
    login,
    update,
    read,
    deleta,
};
