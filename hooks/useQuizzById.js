import axios from "axios"
import { useQuery } from "react-query"

export const useQuizzById = ({quizz_id}) => {
    return useQuery(
        ["useQuizzById", quizz_id],
        async () => {
            let quizz = await axios.get(`/api/quizs/${quizz_id}`);
            return quizz.data;
        }
    )
}