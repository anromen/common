const currentUser = (_, __, { prisma, userId }) => {
  if (!userId) throw new Error('No hay un usuario activo.');
  console.log(userId);

  return prisma.user({ id: userId });
};

module.exports = { currentUser };
