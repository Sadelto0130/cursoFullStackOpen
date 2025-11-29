import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutation";

export const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW)

  const create_review = async({owner_name, repository_name, text, rating}) => {
    try {
      const {data} = await mutate({
        variables: {
          
            ownerName: owner_name, 
            repositoryName: repository_name, 
            text: text, 
            rating: Number(rating)
          
        }
      })
  
      return data?.createReview
    } catch (error) {
        console.log("GraphQL RAW ERROR:", JSON.stringify(error, null, 2));
        const code = error?.graphQLErrors?.[0]?.extensions?.code;

        if (code === "USER_ALREADY_REVIEWED") {
          throw new Error("You have already submitted a review for this repository.");
        }

        throw new Error("Could not create the review. Please try again later.");
      }
    
    }
  return [create_review, result]
};

