function logoutHandler(request, reply) {
  request.cookieAuth.clear();
  reply().code(200);
}

module.exports = logoutHandler;
