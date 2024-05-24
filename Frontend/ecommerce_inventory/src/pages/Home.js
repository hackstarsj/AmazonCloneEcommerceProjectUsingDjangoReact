import { getUser } from "../utils/Helper";
const Home=()=>{
    return <h1>Home Page, Hi , {getUser().username}</h1>
}
export default Home;