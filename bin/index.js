#!/usr/bin/env node
import TaskModel from "../models/Tasks.js";

const args = process.argv.slice(2)

if (args.length > 0) {
    const actionArgument = args[0]
    switch (actionArgument) {
        case 'add':
            TaskModel.add(args[1])
                .then(res => process.stdout.write(res))
                .catch(err => process.stderr.write(err))
        break;
        case 'update':
            TaskModel.update(args[1], args[2])
                .then(res => process.stdout.write(res))
                .catch(err => process.stderr.write(err))
        break;
        case 'delete':
            TaskModel.delete(args[1])
                .then(res => process.stdout.write(res))
                .catch(err => process.stderr.write(err))
        break;
        case "mark-in-progress":
            TaskModel.changeStatus(args[1], actionArgument)
            .then(res => process.stdout.write(res))
            .catch(err => process.stderr.write(err))
        break;
        case "mark-done":
            TaskModel.changeStatus(args[1], actionArgument)
            .then(res => process.stdout.write(res))
            .catch(err => process.stderr.write(err))
        break;
        case "list":
            TaskModel.list(args[1])
            .then(res => process.stdout.write(res))
            .catch(err => process.stderr.write(err))
        break;
        default:
            process.stderr.write('argument not found\n')

            // help
            break;
    }
} else {
    process.stdout.write('You need to add some valid argument: add, delete, update, list, mark-in-progress- mark-done\n')
}