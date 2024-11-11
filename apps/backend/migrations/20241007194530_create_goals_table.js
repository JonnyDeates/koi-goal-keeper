exports.up = function(knex) {
    return knex.schema.createTable("goals", (table) => {
        table.increments('id').primary();
        table.integer('user_id').references('id').inTable('users').onDelete('cascade');
        table.string('name').notNullable();
        table.timestamp('date_created').notNullable().defaultTo('now()');
        table.timestamp('date_modified');
        table.timestamp('completion_date').notNullable();
        table.boolean('is_favorite').notNullable().defaultTo('TRUE');
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable("goals");
  };