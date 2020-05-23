const collections = async (parent, __, { prisma }) => {
  return await prisma.user({ id: parent.id }).collections();
};

module.exports = {
  collections,
};
