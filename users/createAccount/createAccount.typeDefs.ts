import { gql } from "apollo-server";

export default gql`
  type CreatedAccountReslt {
    ok: Boolean!
    error: String
  }

  type Mutation : {
    createAccount (username: String!, email: String!, name:String! password: String!) : CreateAccountResult!
  }
`;
