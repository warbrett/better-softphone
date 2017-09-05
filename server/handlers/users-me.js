function usersMeHandler(request, reply) {
  const {
    id,
    email,
    name,
  } = request.auth.credentials;

  reply({ id, email, name });
}

module.exports = usersMeHandler;
