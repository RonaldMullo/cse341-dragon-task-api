
const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

const collection = () => mongodb.getDb().collection('categories');

// GET all categories
const getAll = async (req, res, next) => {
  try {
    const categories = await collection().find().toArray();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

// GET category by ID
const getSingle = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const category = await collection().findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

// POST create category
const create = async (req, res, next) => {
  try {
    const { name, description, color, icon, isActive } = req.body;
    const now = new Date();

    const category = {
      name,
      description,
      color,
      icon,
      isActive,
      createdAt: now,
      updatedAt: now
    };

    const result = await collection().insertOne(category);

    res.status(201).json({
      message: 'Category created successfully',
      categoryId: result.insertedId
    });
  } catch (error) {
    next(error);
  }
};

// PUT update category
const update = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const { name, description, color, icon, isActive } = req.body;

    const result = await collection().updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          name,
          description,
          color,
          icon,
          isActive,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category updated successfully' });
  } catch (error) {
    next(error);
  }
};

// DELETE category
const remove = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const result = await collection().deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getSingle,
  create,
  update,
  remove
};
