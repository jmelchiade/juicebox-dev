
const{
  client,
  getAllUsers,
} = require('./index');

async function testDB() {
  try {
    
    client.connect();

    
    const users = await getAllUsers();
    console.log(users)
    
    // console.log(result);
  } catch (error) {
    console.error(error);
  }  finally {
    
    client.end();
  }
}



testDB();