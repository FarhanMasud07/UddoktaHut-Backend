"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Import role constants and Role model
      const { roles } = await import("../app/utils/constant.js");
      const { Role } = await import("../app/models/Role.js");

      // Define the roles to ensure exist
      const roleData = [
        { id: 1, role_name: roles.admin },
        { id: 2, role_name: roles.employee },
      ];

      // Find which roles already exist
      const existingRoles = await Role.findAll({
        where: { role_name: roleData.map((r) => r.role_name) },
        attributes: ["role_name"],
      });
      const existingRoleNames = new Set(existingRoles.map((r) => r.role_name));

      // Filter out roles that already exist
      const rolesToInsert = roleData.filter(
        (r) => !existingRoleNames.has(r.role_name)
      );

      if (rolesToInsert.length > 0) {
        await queryInterface.bulkInsert("roles", rolesToInsert);
        console.log("✅ Seeding completed successfully.");
      } else {
        console.log("ℹ️  Roles already exist. No seeding needed.");
      }
    } catch (error) {
      console.error("❌ Seeding failed:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
