const currentUser = (_, __, { prisma, userId }) => {
  if (!userId) throw new Error('No hay un usuario activo.');

  return prisma.user({ id: userId });
};

const collections = (_, __, { prisma, userId }) => {
  if (!userId) throw new Error('No hay un usuario activo.');

  return prisma.user({ id: userId }).collections();
};

module.exports = { currentUser, collections };
