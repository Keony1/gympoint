module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'students',
      [
        {
          name: 'Keony Schröer',
          email: 'keony@gmail.com',
          age: 26,
          weight: 85.0,
          height: 1.80,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Geralt de Rívia',
          email: 'geralt@kaermorhen.com',
          age: 105,
          weight: 95,
          height: 1.88,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => { },
};