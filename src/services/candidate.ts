import { useCallback } from "react";
import { isSuccess } from "utils/ServiceAPIUtil";
import {
  GET_CANDIDATES_QUERY,
  CREATE_CANDIDATE_MUTATION,
  UPDATE_CANDIDATE_MUTATION,
  DELETE_CANDIDATE_MUTATION,
} from "graphql/candidate";
import { useMutation, useApolloClient } from "@apollo/client";
import { CandidateDataT } from "interfaces";

interface setValuesType {
  [name: string]: any;
}

const CandidateService = () => {
  const apolloClient = useApolloClient();
  const [createCandidate] = useMutation(CREATE_CANDIDATE_MUTATION);
  const [updateCandidate] = useMutation(UPDATE_CANDIDATE_MUTATION);
  const [deleteCandidate] = useMutation(DELETE_CANDIDATE_MUTATION);

  const GetCandidates = useCallback(async (values: setValuesType): Promise<CandidateDataT> => {
    try {
      const { data } = await apolloClient.query({
        query: GET_CANDIDATES_QUERY,
        variables: { input: values },
        fetchPolicy: "network-only",
      });
      if (isSuccess("getCandidates", data)) {
        return data.getCandidates.data;
      }
      return [];
    } catch (error) {
      return [];
    }
    // eslint-disable-next-line
  }, []);

  const CreateCandidate = useCallback(async (values: setValuesType) => {
    try {
      const { data } = await createCandidate({
        variables: { input: values },
      });

      if (isSuccess("createCandidate", data)) {
        return data.createCandidate.data;
      }
    } catch (error) {
      throw error;
    }
    // eslint-disable-next-line
  }, []);

  const UpdateCandidate = useCallback(async (values: setValuesType) => {
    try {
      const { data } = await updateCandidate({
        variables: { input: values },
      });

      if (isSuccess("updateCandidate", data)) {
        return data.updateCandidate.data;
      }
    } catch (error) {
      throw error;
    }
    // eslint-disable-next-line
  }, []);

  const DeleteCandidate = useCallback(async (values: setValuesType) => {
    try {
      const { data } = await deleteCandidate({
        variables: { input: values },
      });

      if (isSuccess("deleteCandidate", data)) {
        return data.deleteCandidate.data;
      }
    } catch (error) {
      throw error;
    }
    // eslint-disable-next-line
  }, []);

  return {
    GetCandidates,
    CreateCandidate,
    UpdateCandidate,
    DeleteCandidate,
  };
};

export default CandidateService;
