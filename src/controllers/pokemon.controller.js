const Pokemon = require('../models/pokemon.model');

const getAll = async (req, res, next) => {
  try {
    const pokemons = await Pokemon.findAll();
    res.json(pokemons);
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id);
    if (!pokemon) return res.status(404).json({ error: 'Pokemon not found' });
    res.json(pokemon);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }
    const pokemon = await Pokemon.create({ name, description });
    res.status(201).json(pokemon);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const exists = await Pokemon.findById(req.params.id);
    if (!exists) return res.status(404).json({ error: 'Pokemon not found' });
    const pokemon = await Pokemon.update(req.params.id, { name, description });
    res.json(pokemon);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const exists = await Pokemon.findById(req.params.id);
    if (!exists) return res.status(404).json({ error: 'Pokemon not found' });
    await Pokemon.remove(req.params.id);
    res.json({ message: 'Pokemon deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getOne, create, update, remove };
