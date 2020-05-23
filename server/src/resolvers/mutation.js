const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (_, { password, ...rest }, { prisma }) => {
  const encryptedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.createUser({
    ...rest,
    password: encryptedPassword,
  });

  const token = jwt.sign({ userId: user.id }, 'PASSWORD');

  return { token, user };
};

const login = async (_, { email, password }, { prisma }) => {
  const user = await prisma.user({ email });
  if (!user) throw new Error('El usuario ingresado no existe.');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error('La contraseña ingresada es incorrecta.');

  const token = jwt.sign({ userId: user.id }, 'PASSWORD');

  return { token, user };
};

const createCollection = async (_, { name }, { prisma, userId }) => {
  const collection = await prisma.createCollection({
    name,
    user: {
      connect: {
        id: userId,
      },
    },
  });

  console.log(collection);

  return collection;
};

module.exports = { signup, login, createCollection };
