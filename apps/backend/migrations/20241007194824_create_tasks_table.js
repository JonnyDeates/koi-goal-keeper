exports.up = function (knex) {
    return knex.schema.createTable("tasks", (table) => {
        table.increments('id').primary();
        table.integer('goal_id').references('id').inTable('goals').onDelete('cascade');
        table.string('name').notNullable();
        table.timestamp('date_created').notNullable().defaultTo('now()');
        table.timestamp('date_modified');
        table.boolean('is_completed').notNullable().defaultTo('FALSE');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("tasks");
};