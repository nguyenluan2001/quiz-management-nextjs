import {useQuery} from "react-query";
import axios from "axios";
export const useQuizzes = () => {
   return useQuery(
        "useQuizzes",
         async () => {
             let quizzes = await axios.get("api/quizs/get_quizzes");
             console.log("quizzes", quizzes)
             return quizzes.data;
            
        }
    )
}
