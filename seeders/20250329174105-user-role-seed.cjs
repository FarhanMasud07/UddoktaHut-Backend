"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const { roles } = await import("../app/utils/constant.js");
      await queryInterface.bulkInsert("roles", [
        { id: 1, role_name: roles.admin },
        { id: 2, role_name: roles.employee },
      ]);

      console.log("✅ Seeding completed successfully.");
    } catch (error) {
      console.error("❌ Seeding failed:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
