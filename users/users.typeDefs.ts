import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    location: String
    password: String!
    avatarURL: String
    githubUsername: String
    following: [User]
    followers: [User]
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    dummy: String
  }
`;
