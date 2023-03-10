import { gql } from "apollo-server-express";

export default gql`
  type LoginResponse {
    ok: Boolean!
    token: String
    error: String
  }
  type Mutation {
    login(username: String, password: String): LoginResponse!
  }
`;
