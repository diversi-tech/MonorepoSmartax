// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import mongoose, { Document } from 'mongoose';
// import { Client, ClientModel } from './client.model';

// @Schema()
// export class Counter extends Document {
//   @Prop({ required: true })
//   collectionName: string;

//   @Prop({ default: 1000 })
//   seq: number;
// }

// export const CounterModel = SchemaFactory.createForClass(Counter);
// ClientModel.pre<Client>('save', async function (next) {
//     if (this.isNew) {
//       const counter = await CounterModel.findOneAndUpdate(
//         { collectionName: 'Client' },
//         { $inc: { seq: 1 } },
//         { new: true, upsert: true }
//       ).exec(); // הוספת exec() לסיום הפעולה
  
//       if (counter) {
//         this.clientID = (1000 + counter.seq).toString(); // התחלת 1000 והמשך במספרים הסידוריים
//       }
//     }
//     next();
//   });

// //   var CounterSchema = Schema({
// //     _id: {type: String, required: true},
// //     seq: { type: Number, default: 0 }
// // });
// // var counter = mongoose.model('counter', CounterSchema);

// // var entitySchema = mongoose.Schema({
// // });

// // entitySchema.pre('save', function(next) {
// //     var doc = this;
// //     counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter)   {
// //         if(error)
// //             return next(error);
// //         doc.testvalue = counter.seq;
// //         next();
// //     });
// // });