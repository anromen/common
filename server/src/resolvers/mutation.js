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

const login = (_, { email, password }, { prisma }) => {
  const user = prisma.user({ email });
  if (!user) throw new Error('El usuario ingresado no existe.');

  const validPassword = bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error('La contraseña ingresada es incorrecta.');

  const token = jwt.sign({ userId: user.id }, 'PASSWORD');

  return { token, user };
};

module.exports = { signup, login };
