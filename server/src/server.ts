import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import path from 'path';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';

const { verify } = jwt; // Destructure 'verify' from default export

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }: { req: any }) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return { user: null };
    }

    const token = authHeader.split(' ')[1];
    try {
      const secretKey = process.env.JWT_SECRET_KEY || '';
      const user = verify(token, secretKey); // Verifying the token
      return { user };
    } catch (error) {
      console.error('Invalid token:', error);
      return { user: null };
    }
  },
}as any);

const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  app.use('/graphql', expressMiddleware(server));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
  
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
