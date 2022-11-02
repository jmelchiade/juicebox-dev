const express = require("express");

function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: "MissingUserError",
      message: "You must logged in to perform this action",
    });
  }

  next();
}

module.exports = {
  requireUser,
};
