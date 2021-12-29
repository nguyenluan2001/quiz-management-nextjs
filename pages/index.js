import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/slices/user';
import ProtectRoute from '../components/ProtectRoute';
export default function Home() {
  const router = useRouter();
  console.log("HOME");
  const [name, setName] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  console.log("user", user)
  // useEffect(() => {
  //   const checkAuth = async () =>{  
  //     let res = await axios.get("/api/authentication/checkAuth")
  //     if(res.data.status === 401 ) {
  //       router.push("/signin")
  //     } else {
  //       console.log(res.data)
  //       dispatch(getUser(res.data));
  //     }
  //   }
  //   checkAuth()
  // }, []);
  const handleFetchData = async () => {
    let data = await axios.get("http://localhost:3000/api/posts");
    console.log("data", data);
  };
  return (
    <ProtectRoute>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        index
      </Box>
    </ProtectRoute>
  );
}
export const getServerSideProps = (ctx) => {
  return {
    props: { name: "sdf" }
  }
}
// export const getStaticProps = () => {
//   console.log("getStaticProps")
//   return {
//     props: {name:"nguyen thanh luan"},
//     revalidate: 1
//   }
// }