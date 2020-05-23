const user = async (parent, _, { prisma }) => {
  return prisma.collection({ id: parent.id }).user();
};

module.exports = {
  user,
};
