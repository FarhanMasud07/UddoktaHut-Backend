"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("stores", "template_name", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "classic",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("stores", "template_name");
  },
};
