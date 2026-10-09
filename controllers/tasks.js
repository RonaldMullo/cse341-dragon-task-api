
const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

const collection = () => mongodb.getDb().collection('tasks');

// GET all tasks
const getAll = async (req, res, next) => {
  try {
    const tasks = await collection().find().toArray();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// GET task by ID
const getSingle = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid task ID'
      });
    }

    const task = await collection().findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// POST create task
const create = async (req, res, next) => {
  try {
    const {
      title,
      description,
      priority,
      status,
      dueDate,
      categoryId
    } = req.body;

    const now = new Date();

    const task = {
      title,
      description,
      priority,
      status,
      dueDate,
      categoryId,
      createdAt: now,
      updatedAt: now
    };

    const result = await collection().insertOne(task);

    res.status(201).json({
      message: 'Task created successfully',
      taskId: result.insertedId
    });
  } catch (error) {
    next(error);
  }
};

// PUT update task
const update = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid task ID'
      });
    }

    const {
      title,
      description,
      priority,
      status,
      dueDate,
      categoryId
    } = req.body;

    const result = await collection().updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          title,
          description,
          priority,
          status,
          dueDate,
          categoryId,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    res.status(200).json({
      message: 'Task updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// DELETE task
const remove = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid task ID'
      });
    }

    const result = await collection().deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    res.status(200).json({
      message: 'Task deleted successfully'
    });
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
