const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

const collectionName = 'projects';
const collection = () => mongodb.getDb().collection(collectionName);

const getAll = async (req, res, next) => {
  try {
    const results = await collection().find({}).toArray();
    res.status(200).json(results);
  } catch (error) { next(error); }
};

const getSingle = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid ID' });
    const result = await collection().findOne({ _id: new ObjectId(req.params.id) });
    if (!result) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(result);
  } catch (error) { next(error); }
};

const create = async (req, res, next) => {
  try {
    const now = new Date();
    const result = await collection().insertOne({ ...req.body, createdAt: now, updatedAt: now });
    res.status(201).json({ message: 'Project created successfully', id: result.insertedId });
  } catch (error) { next(error); }
};

const update = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid ID' });
    const result = await collection().updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { ...req.body, updatedAt: new Date() } }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json({ message: 'Project updated successfully' });
  } catch (error) { next(error); }
};

const remove = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid ID' });
    const result = await collection().deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) { next(error); }
};

module.exports = { getAll, getSingle, create, update, remove };
