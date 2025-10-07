"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex("products", ["name"]);
    await queryInterface.addIndex("products", ["category"]);
    await queryInterface.addIndex("products", ["sku"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("products", ["name"]);
    await queryInterface.removeIndex("products", ["category"]);
    await queryInterface.removeIndex("products", ["sku"]);
  },
};
