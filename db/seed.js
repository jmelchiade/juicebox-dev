
const{
  client,
  getAllUsers, createUser, updateUser, testDB, rebuildDB, createTables
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









  

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());