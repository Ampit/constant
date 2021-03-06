db.createUser({
  user: "amar",
  pwd: "pdnejoh",
  roles: [
    {
      role: "readWrite",
      db: "constant",
    },
  ],
});
