import { useRouter } from "next/router"
export default function PostDetail(){
    const router = useRouter();
    const {postId} = router.query
    return (
        <h1>This is content of {postId}</h1>
    )
}