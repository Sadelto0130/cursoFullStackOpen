import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES, GET_REPOSITORY } from "../graphql/queries";

export const useRepositories = (variables) => {
  console.log("variables en useRepositories:", variables)
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: variables,
    fetchPolicy: "cache-and-network",
  }); 

  const repositories =
    data?.repositories?.edges?.map((edge) => edge.node) || [];

  return { repositories, error, loading };
};

export const useRepository = (id) => {
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: {id},
    fetchPolicy: "cache-and-network",
    skip: !id,
  })

  return {
    repository: data?.repository,
    loading,
    error
  }
}
