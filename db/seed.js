
const{
  client,
  getAllUsers, createUser
} = require('./index');

async function createInitialUsers() {
  try{
    console.log("Starting to create users...");

    const albert = await createUser({ username: 'albert', password: 'bertie99', name: 'Al Bert', location: 'Sidney, Australia'  });
    const sandra = await createUser({ username: 'sandra', password: '2sandy4me', name: 'Just Sandra', location: "Ain't tellin'" });
    const glamgal = await createUser({ username: 'glamgal', password: 'soglam', name:'Joshua', location: 'Upper East Side' });
    
    
    

} catch(error){
  console.error("Error creating users!");
  throw error;
}
}



async function dropTables() {
    try {

        console.log('Starting to drop tables...');
      await client.query(`
        DROP TABLE IF EXISTS users;
      `);
      console.log ("Finishes dropping tables!");
    } catch (error) {
        console.error ("Error dropping tables!");
        throw error;
    }
}


async function createTables() {
    try {

        console.log("Starting to build tables...");
      await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username varchar(255) UNIQUE NOT NULL,
            password varchar(255) NOT NULL,
            name VARCHAR (255) NOT NULL,
            location VARCHAR(255) NOT NULL,
            active BOOLEAN DEFAULT true
        );
      `);
            console.log("Finished building tables!");
    } catch (error) {
        console.error("Error building tables!");
        throw error;

    }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
  throw error;
  }
}


async function testDB() {
    try {
      console.log("Starting to test database...");
  
      const users = await getAllUsers();
      console.log("getAllUsers:", users);
  
      console.log("Finished database tests!");
    } catch (error) {
      console.error("Error testing database!");
      throw error;
    }
  }



  async function updateUser(id, fields = {}) {
    const setString = Object.keys(fields).map(
      (key, index) => `"$ { key }" =${ index + 1 }`
    ).join(`,`);

    if (setString.length === 0) {
      return;
    } try{
      const result  = await client.query(`
      UPDATE users
      SET "name" = 'new name', "location" = 'new location' ${ "setString" }
      WHERE id= ${ id }
      RETURNING *;
      `, Object.values(fields));

      return result;
    } catch (error) {
      throw error;
    }
  }

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());