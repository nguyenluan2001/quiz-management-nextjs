import {useQuery} from "react-query";
import axios from "axios";
import {useJwt} from "react-jwt";
export const useReportsOfUser = () => {
   return useQuery(
        "useReportsOfUser",
         async () => {
            //  const jwt = Cookies.get("jwt");
            //  const {decodedToken, isExpired} = useJwt(jwt);
             let reports = await axios.get("/api/reports/get_reports");
             return reports.data;
            
        }
    );
};
