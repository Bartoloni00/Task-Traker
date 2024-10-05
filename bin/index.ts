#!/usr/bin/env node
import TaskModel from "../models/Tasks.js";

const args = process.argv.slice(2);

if (args.length > 0) {
  const actionArgument = args[0];
  switch (actionArgument) {
    case 'add':
      TaskModel.add(args[1])
        .then(res => process.stdout.write(JSON.stringify(res)))
        .catch(err => process.stderr.write(err.toString()));
      break;
    case 'update':
      TaskModel.update(parseInt(args[1], 10), args[2])
        .then(res => process.stdout.write(JSON.stringify(res)))
        .catch(err => process.stderr.write(err.toString()));
      break;
    case 'delete':
      TaskModel.delete(parseInt(args[1], 10))
        .then(res => process.stdout.write(JSON.stringify(res)))
        .catch(err => process.stderr.write(err.toString()));
      break;
    case 'mark-in-progress':
      TaskModel.changeStatus(parseInt(args[1], 10), actionArgument)
        .then(res => process.stdout.write(JSON.stringify(res)))
        .catch(err => process.stderr.write(err.toString()));
      break;
    case 'mark-done':
      TaskModel.changeStatus(parseInt(args[1], 10), actionArgument)
        .then(res => process.stdout.write(JSON.stringify(res)))
        .catch(err => process.stderr.write(err.toString()));
      break;
    case 'list':
      TaskModel.list(args[1])
        .then(res => process.stdout.write(JSON.stringify(res)))
        .catch(err => process.stderr.write(err.toString()));
      break;
    default:
      process.stderr.write('argument not found\n');
  }
}