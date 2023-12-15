"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Layout/Header";
import Hero from "@/components/Route/Hero";
import About from "@/components/Route/About";
import Image from "next/image";
import { styles } from "@/utils/styles";
import PromptCard from "@/components/Prompts/PromptCard";
import BestSellers from "@/components/Shop/BestSellers";
import Future from "@/components/Route/Future";
import Partners from "@/components/Route/Partners";
import SellersBanner from "@/components/Shop/SellersBanner";
import Footer from "@/components/Layout/Footer";
import { Divider } from "@nextui-org/react";
import PromptCardLoader from "@/utils/PromptCardLoader";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { User } from "@clerk/nextjs/server";
import Loader from "@/utils/Loader";

type Props = {
  isSellerExist: boolean | undefined;

};

const Page = ({ isSellerExist }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [prompts, setPrompts] = useState<any>();
  const [loading, setLoading] = useState(true);
  const[user,setUser] = useState(null);

  useEffect(() => {
   setLoading(true)
   axios.get("/api/me").then((res)=>{
    console.log("data--",res.data);
    setUser(res.data.user)
    setLoading(false)
    
   }).catch((error) => {
    console.log(error);
    setLoading(false)
    
   });
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
    {
      loading?(
        <>
        <Loader/>
        </>
      ):(
        <div>
      <div className="banner">
        <Header activeItem={0} 
        user={user}
        isSellerExist={isSellerExist}
        />
         <ToastContainer position="top-right" autoClose={500} />
        <Hero />
      </div>
      <Image
        src={"https://pixner.net/aikeu/assets/images/footer/shape-two.png"}
        width={120}
        height={120}
        alt=""
        className="absolute right-[-30px]"
      />
      <br />
      <div className="w-[95%] md:w-[90%] xl:w-[80%] 2xl:w-[75%] m-auto">
        <About />
        <div>
          <h1 className={`${styles.heading} p-2 font-Monserrat`}>
            Latest Prompts
          </h1>
          <div className="w-full flex flex-wrap mt-5">
            {/* {loading ? (
              [...new Array(8)].map((i) => (
                <>
                  <PromptCardLoader />
                </>
              ))
            ) : (
              <>
                {prompts &&
                  prompts.map((item: any) => (
                    <PromptCard prompt={item} key={item.id} />
                  ))}
              </>
            )} */}
            <PromptCard/>
            <PromptCard/>
            <PromptCard/>
            <PromptCard/>
            <PromptCard/>
            <PromptCard/>
          </div>
          <br />
          <BestSellers />
          <Future />
          <Partners />
          <SellersBanner />
          <br />
          <br />
          <Divider className="bg-[#ffffff23]" />
          <Footer />
        </div>
      </div>
    </div>
      )
    }
    
    </>
  );
};

export default Page;
