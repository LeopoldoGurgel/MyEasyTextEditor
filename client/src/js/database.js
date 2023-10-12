import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("marks try")
  const jateDb = await openDB("jate", 1); //creates a connection to the database on version 1
  const tx = jateDb.transaction("jate",  "readwrite"); // creates a transaction and specify it's privileges
  const store = tx.objectStore("jate"); // opens the object store
  const request = store.put({id: 1, value: content}); // uses put method to update content
  // not sure about the line above. Will have to come back here after better understanding how this works
  const result = await request;
  console.log("Data saved to the database", result);

};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {

  const jateDb = await openDB("jate", 1); //creates a connection to the database on version 1
  const tx = jateDb.transaction("jate",  "readonly"); // creates a transaction and specify it's privileges
  const store = tx.objectStore("jate"); // opens the object store
  const request = store.get(1);
  const result = await request;
  console.log('result.value', result);
  return result?.value;

};

initdb();
