import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { DbService } from './services/db.service';
import { ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as socketIo from 'socket.io';
import cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const dbService = app.get(DbService);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:4200', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Global pipes for validation
  app.useGlobalPipes(new ValidationPipe());

  // app.useWebSocketAdapter(new MyIoAdapter(app));

  // ================
  // Create a socket.io server instance
  // const server = app.getHttpServer();


  // // const io = new socketIo.Server(server);

  // const io = new socketIo.Server(server, {
  //   cors: {
  //     origin: 'http://localhost:4200', // Allow requests from this origin
  //     methods: ['GET', 'POST'],
  //     credentials: true,
  //   },
  // });

  // // Configure Socket.IO adapter
  // app.useWebSocketAdapter(new IoAdapter(io));

  // // Logic for handling tasks and notifications
  // const pendingTasks = new Map(); // Map to store pending tasks with socket IDs

  // io.on('connection', (socket) => {
  //   console.log('Client connected:', socket.id);

  //   socket.on('disconnect', () => {
  //     console.log('Client disconnected:', socket.id);
  //     // Remove pending tasks associated with disconnected client
  //     pendingTasks.forEach((task, clientId) => {
  //       if (clientId === socket.id) {
  //         pendingTasks.delete(clientId);
  //       }
  //     });
  //   });

  //   // Handle adding a task event
  //   socket.on('addTask', (task) => {
  //     if ( task.assignedTo = []) {
  //       // Task not assigned to anyone, notify all clients
  //       console.log('1');
        
  //       io.emit('taskNotAssigned', task);
  //     } else {
  //       // Task assigned to someone, store in pending tasks map
  //       pendingTasks.set(socket.id, task);
  //       // Emit event to specific client
  //       io.to(socket.id).emit('taskAssignedToYou', task);
  //     }
  //   });

  //   // Handle task assignment event
  //   socket.on('assignTask', (taskId, assignedTo) => {
  //     // Find the client ID associated with the pending task
  //     let clientId = null;
  //     pendingTasks.forEach((task, id) => {
  //       if (task.id === taskId) {
  //         clientId = id;
  //       }
  //     });

  //     if (clientId) {
  //       // Emit event to specific client
  //       io.to(clientId).emit('taskAssigned', { taskId, assignedTo });
  //       // Remove task from pending tasks map
  //       pendingTasks.delete(clientId);
  //     }
  //   });
  // });
  // const server = app.getHttpServer();
  // const io = new socketIo.Server(server, {
  //   cors: {
  //     origin: 'http://localhost:4200',
  //     methods: ['GET', 'POST'],
  //     credentials: true,
  //   },
  // });

  // app.useWebSocketAdapter(new IoAdapter(io));

  // io.on('connection', (socket) => {
  //   console.log('Client connected:', socket.id);

  //   socket.on('disconnect', () => {
  //     console.log('Client disconnected:', socket.id);
  //   });

  //   socket.on('taskCreated', (task) => {
  //     if (!task.assignedTo || task.assignedTo.length === 0) {
  //       console.log('Task not assigned to anyone');
  //       io.emit('taskNotAssigned', task);
  //     } else {
  //       console.log('Task assigned to someone');
  //       io.to(socket.id).emit('taskAssignedToYou', task);
  //     }
  //   });

  //   socket.on('confirmTask', (taskId) => {
  //     console.log(`Task ${taskId} confirmed`);
  //     io.emit('taskConfirmed', taskId);
  //   });
  // });

  // Enable CORS for Socket.IO endpoint
  // app.use(
  //   cors({
  //     origin: 'http://localhost:4200', // Replace with your Angular app URL
  //     methods: ['GET', 'POST'],
  //     credentials: true, // Allow cookies and credentials to be sent cross-origin
  //   })
  // );
  // ================

  try {
    // await dbService.connect();
    await app.listen(3000); // Make sure this port is correct
    console.log('Application is running on: http://localhost:3000');
  } catch (err) {
    console.error('Failed to start the application:', err);
  }
}

bootstrap();
