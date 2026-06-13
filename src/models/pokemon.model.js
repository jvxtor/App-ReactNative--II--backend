const { db } = require('../config/firebase');

const COLLECTION = 'pokemons';

const findAll = async () => {
  const snapshot = await db.collection(COLLECTION).orderBy('createdAt', 'desc').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const findById = async (id) => {
  const doc = await db.collection(COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
};

const create = async ({ name, description }) => {
  const ref = await db.collection(COLLECTION).add({
    name,
    description,
    createdAt: new Date().toISOString(),
  });
  const doc = await ref.get();
  return { id: doc.id, ...doc.data() };
};

const update = async (id, { name, description }) => {
  const ref = db.collection(COLLECTION).doc(id);
  await ref.update({ name, description, updatedAt: new Date().toISOString() });
  const doc = await ref.get();
  return { id: doc.id, ...doc.data() };
};

const remove = async (id) => {
  await db.collection(COLLECTION).doc(id).delete();
};

module.exports = { findAll, findById, create, update, remove };
