// popup.gateway.ts
// import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
// import { Server } from 'socket.io';

// @WebSocketGateway()
// export class PopupGateway {
//   @WebSocketServer()
//   server: Server;

//   @SubscribeMessage('APPROVE_POPUP')
//   handleApprovePopup(@MessageBody() message: any): void {
//     this.server.emit('HIDE_POPUP');
//   }

//   public showPopup(): void {
//     this.server.emit('SHOW_POPUP');
//   }
// }

// src/tasks/tasks.gateway.ts
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
    origin: ['http://localhost:4200', 'https://monoreposmartax-o1oz.onrender.com'],
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
      console.log("לא משויכת לאף אחד");
      this.server.emit('taskCreated', task);
    } else {
      console.log("המשימה משויכת למשתמשים:", task.selectedUsers);
    }
  }



  @SubscribeMessage('confirmTask')
  handleConfirmTask(@MessageBody() taskId: string) {
    console.log(`Task ${taskId} confirmed`);
    // Emit event to all connected clients to hide the popup
    this.server.emit('taskConfirmed', taskId);
  }

  // Test method to emit task creation
  @SubscribeMessage('addTask')
  handleAddTask(@MessageBody() task: any) {
    console.log('משימה נוספת:', task);
    this.handleTaskCreated(task);
  }
}
