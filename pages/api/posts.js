const posts = (req,res) => {
    let posts = [
        {
            id:1,
            title: "post 1"
        },
        {
            id:2,
            title: "post 2"
        },
        {
            id:3,
            title: "post 3"
        }
    ];
    return res.json(posts);
};
export default posts;