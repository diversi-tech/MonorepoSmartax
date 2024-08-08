import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['https://monoreposmartax-fronted.onrender.com', 'http://localhost:4200'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class TasksGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  handleTaskCreated(task: any) {
    if (!task.selectedUsers || task.selectedUsers.length === 0) {
      this.server.emit('taskCreated', task);
    } else {
      console.log("המשימה משויכת למשתמשים:", task.selectedUsers);
    }
  }

  @SubscribeMessage('confirmTask')
  handleConfirmTask(@MessageBody() taskId: string) {
    // Emit event to all connected clients to hide the popup
    this.server.emit('taskConfirmed', taskId);
  }

  // Test method to emit task creation
  @SubscribeMessage('addTask')
  handleAddTask(@MessageBody() task: any) {
    this.handleTaskCreated(task);
  }
}
