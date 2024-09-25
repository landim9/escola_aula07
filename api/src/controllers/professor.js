const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt'); // Para hash de senhas
require('dotenv').config();

const create = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        // Verifica se os campos obrigatórios estão presentes
        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'Nome, email e senha são obrigatórios!' });
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Cria um novo professor
        const professor = await prisma.professor.create({
            data: {
                nome,
                email,
                senha: hashedPassword,
            },
        });

        res.status(201).json(professor);

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

        // Verifica a senha
        const isValidPassword = await bcrypt.compare(senha, professor.senha);
        if (!isValidPassword) {
            return res.status(401).json({ error: "Senha incorreta!" });
        }

        // Retorna informações do professor
        res.status(200).json({
            uid: professor.id,
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
    try {
        const professors = await prisma.professor.findMany({
            select: {
                id: true,
                nome: true,
                email: true
                // Não deve retornar a senha por questões de segurança
            }
        });

        res.status(200).json(professors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar professores!' });
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
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar professor!' });
    }
};

module.exports = {
    create,
    login,
    update,
    read,
    deleta
};
