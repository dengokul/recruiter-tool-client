import gql from "graphql-tag";

export const GET_CANDIDATES_QUERY = gql`
  query ($input: CandidatesCond) {
    getCandidates(input: $input) {
      responseCode
      data
    }
  }
`;

export const CREATE_CANDIDATE_MUTATION = gql`
  mutation ($input: CandidateInput) {
    createCandidate(input: $input) {
      responseCode
      data
    }
  }
`;

export const UPDATE_CANDIDATE_MUTATION = gql`
  mutation ($input: CandidateInput) {
    updateCandidate(input: $input) {
      responseCode
      data
    }
  }
`;

export const DELETE_CANDIDATE_MUTATION = gql`
  mutation ($input: DeleteCandidateInput) {
    deleteCandidate(input: $input) {
      responseCode
      data
    }
  }
`;
