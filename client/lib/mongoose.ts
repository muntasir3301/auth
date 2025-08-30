// // lib/mongodb.ts
// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI as string;

// console.log(MONGODB_URI)

// if (!MONGODB_URI) {
//   throw new Error("Please add your Mongo URI to .env");
// }else{
//     console.log("Mongo Conected succesfully");
// }

// // Extend NodeJS global type
// declare global {
//   // eslint-disable-next-line no-var
//   var mongoose: {
//     conn: mongoose.Connection | null;
//     promise: Promise<mongoose.Mongoose> | null;
//   };
// }

// // Use cached connection from globalThis
// const cached = global.mongoose || { conn: null, promise: null };

// export async function connectDB() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI, {
//       dbName: "nextauth-db",
//     }).then((mongoose) => mongoose);
//   }

//   cached.conn = (await cached.promise).connection;
//   // Assign back to global to persist across hot reloads
//   global.mongoose = cached;

//   return cached.conn;
// }



import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};
