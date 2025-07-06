@MessagePattern('validate_user')
async validateUser(payload: { userId: number }) {
  return this.prisma.usuarios_table.findUnique({
    where: { id: payload.userId },
  });
}
