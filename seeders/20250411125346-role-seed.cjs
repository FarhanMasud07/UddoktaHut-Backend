"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Import role constants
      const { roles } = await import("../app/utils/constant.js");
      const roleData = [
        { id: 1, role_name: roles.admin },
        { id: 2, role_name: roles.employee },
      ];
      // Insert roles, ignoring duplicates for idempotency
      await queryInterface.bulkInsert("roles", roleData, {
        ignoreDuplicates: true,
      });
      console.log("✅ Seeding completed successfully.");
    } catch (error) {
      console.error("❌ Seeding failed:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
