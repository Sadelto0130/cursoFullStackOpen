import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

export const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  const repositories =
    data?.repositories?.edges?.map((edge) => edge.node) || [];

  return { repositories, error, loading };
};
