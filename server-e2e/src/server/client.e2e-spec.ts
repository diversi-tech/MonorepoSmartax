// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import request from 'supertest';
// import { AppModule } from '../../../server/src/app.module'; // ודאי שהתוואי נכון לפי המבנה של הפרויקט שלך

// describe('ClientController (e2e)', () => {
//   let app: INestApplication;

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('/clients (POST) - createClient', async () => {
//     const createClientDto = {
//       name: 'Test Client',
//       contactInfo: 'test@example.com',
//       businessName: 'Test Business',
//       source: 'Online',
//       status: 'Active',
//       tag: { text: 'Important', color: 'red' }
//     };

//     return request(app.getHttpServer())
//       .post('/clients')
//       .send(createClientDto)
//       .expect(201)
//       .expect((res) => {
//         expect(res.body.id).toBeDefined();
//         expect(res.body.name).toBe(createClientDto.name);
//       });
//   });

//   it('/clients (GET) - getAllClients', () => {
//     return request(app.getHttpServer())
//       .get('/clients')
//       .expect(200)
//       .expect((res) => {
//         expect(res.body).toBeInstanceOf(Array);
//       });
//   });

//   it('/clients/searchClient (POST) - searchClient', async () => {
//     const clientId = 'some-client-id';

//     return request(app.getHttpServer())
//       .post('/clients/searchClient')
//       .send({ id: clientId })
//       .expect(200)
//       .expect((res) => {
//         expect(res.body).toBeDefined();
//         expect(res.body.id).toBe(clientId);
//       });
//   });

//   it('/clients (PUT) - updateClient', async () => {
//     const updateClientDto = {
//       _id: 'some-client-id',
//       name: 'Updated Client',
//       contactInfo: 'updated@example.com',
//       businessName: 'Updated Business',
//       source: 'Referral',
//       status: 'Inactive',
//       tag: { text: 'Updated', color: 'blue' }
//     };

//     return request(app.getHttpServer())
//       .put('/clients')
//       .send(updateClientDto)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.id).toBe(updateClientDto._id);
//         expect(res.body.name).toBe(updateClientDto.name);
//       });
//   });

//   it('/clients (DELETE) - deleteClient', async () => {
//     const clientId = 'some-client-id';

//     return request(app.getHttpServer())
//       .delete('/clients')
//       .send({ id: clientId })
//       .expect(200)
//       .expect((res) => {
//         expect(res.body).toBe(true);
//       });
//   });

//   afterAll(async () => {
//     await app.close();
//   });
// });
