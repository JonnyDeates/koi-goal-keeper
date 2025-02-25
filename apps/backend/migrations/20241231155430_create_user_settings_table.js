/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user_settings', (table)=>{
    table.integer('id')
        .unsigned()
        .primary()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    table.string('selected_due_date')
    table.timestamp('date_created').notNullable().defaultTo('now()');
    table.timestamp('date_modified');

  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('user_settings');
};
