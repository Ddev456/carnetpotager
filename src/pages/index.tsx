// import { type NextPage } from "next";
import Head from "next/head";
import { MonPotager } from "~/components/MonPotager";
import { type VegetableType } from "~/lib/scheme/vegetables";
import { getAllVegetables } from "~/server/vegetable";

const Home = ({vegetables}: {vegetables: VegetableType[]}) => {

  return (
    <>
      <Head>
        <title>Carnet Potager - beta</title>
        <meta name="description" content="Application de gestion du potager" />
        <link rel="icon" href="/LogoM.svg" />
      </Head>
      
      <div className="px-[3rem] h-full relative container flex flex-col justify-around items-center">

      <MonPotager vegetables={vegetables}/>

      
      </div>
     
    </>
  );
};

export async function getStaticProps() {
  const vegetables = await getAllVegetables();
  return { 
  props: { 
      vegetables: JSON.parse(JSON.stringify(vegetables))
      } 
  };
}

export default Home;
