/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', (tableBuilder)=>{
    tableBuilder.increments('id').primary();
    tableBuilder.dateTime('date_created').notNullable().defaultTo('now()');
    tableBuilder.dateTime('date_modified').nullable();
    tableBuilder.dateTime('token_expires').nullable();
    tableBuilder.string('token').nullable();
    tableBuilder.string('email').notNullable();
    tableBuilder.string('name').notNullable();
    tableBuilder.string('password').notNullable();
    tableBuilder.string('paid_account').notNullable().defaultTo('basic');

  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
