const userService = require("../service/user.service");
const authService = require("../service/auth.service"); // importação do serviço de autenticação
const jwt = require("jsonwebtoken");

const segredo = "umasupersenha123"

const find = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const user = await userService.findByIdUser(id);

    if (!user) {
      return res.status(404).send({ message: "Usuário não foi encontrado, tente outro ID" });
    }

    return res.status(200).send(user);
  } catch (err) {
    console.log(`Erro: ${err}`);
    return res.status(500).send("Erro no servidor, tente novamente mais tarde");
  }
};

const findAllUsers = async (req, res) => {
  return res.status(200).send(await userService.findAllUsers());
};

const createUser = async (req, res) => {
  const user = req.body;

  if (!user || Object.keys(user).length === 0) {
    return res.status(400).json({ message: 'O corpo da mensagem está vazio' });
  }

  if (!user.nome || !user.idade || !user.email) {
    return res.status(400).json({ message: 'Campos obrigatórios não foram fornecidos' });
  }

  try {
    const userSalvo = await userService.createUser(user);
    return res.status(201).json({ message: 'Usuário criado com sucesso', data: userSalvo });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const user = req.body;

  if (Object.keys(user).length === 0) {
    return res.status(400).send({ message: "O corpo da mensagem está vazio" });
  }

  if (!user.nome || !user.idade || !user.email) {
    return res.status(400).send({ message: "Campos obrigatórios não foram encontrados" });
  }

  try {
    const updatedUser = await userService.updateUser(id, user);

    if (updatedUser) {
      return res.status(200).send({ message: "Usuário atualizado com sucesso", data: updatedUser });
    } else {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Erro ao atualizar o usuário", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await userService.deleteUser(id);

    if (result) {
      return res.status(200).send({ message: "Usuário excluído com sucesso" });
    } else {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Erro ao excluir o usuário", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await authService.loginService(email);

    if (!user) {
      return res.status(400).send({ message: "Usuário não encontrado" });
    }

    if (senha !== user.senha) {
      return res.status(400).send({ message: "Senha inválida" });
    }

    const token = authService.generateToken(user.id, segredo);
    res.status(200).send({
      user,
      token
    });
  } catch (error) {
    console.log(`Erro: ${error}`);
    return res.status(500).send("Erro no servidor, tente novamente mais tarde");
  }
};

const verificarToken = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: "O token não foi informado" });
  }

  const [scheme, token] = authHeader.split(" ");

  if (!scheme || !/^Bearer$/i.test(scheme) || !token) {
    return res.status(401).send({ message: "O token está malformatado" });
  }

  jwt.verify(token, segredo, (err, decoder) => {
    if (err) {
      return res.status(401).send({ message: "Falha ao verificar o token" });
    }
    
       res.send(decoder);
    });
  }
module.exports = {
  find,
  findAllUsers,
  createUser,
  updateUser,
  deleteUser,
  login,
  verificarToken
};
