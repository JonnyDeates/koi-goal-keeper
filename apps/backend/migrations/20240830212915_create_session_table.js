exports.up = function(knex) {
    return knex.schema.createTable("session", (table) => {
      table.string('sid').notNullable().collate('default').primary();
      table.json('sess').notNullable();
      table.timestamp('expire', { precision: 6 }).notNullable();
    })
    .then(function() {
      return knex.schema.table('session', (table) => {
        table.index(['expire'], 'IDX_session_expire');
      });
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable("session");
  };