"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Update all existing stores with 'default' template_name to 'classic'
    await queryInterface.sequelize.query(
      `UPDATE stores SET template_name = 'classic' WHERE template_name = 'default';`
    );
  },

  async down(queryInterface, Sequelize) {
    // Revert back to 'default' for existing stores (rollback)
    await queryInterface.sequelize.query(
      `UPDATE stores SET template_name = 'default' WHERE template_name = 'classic';`
    );
  },
};
