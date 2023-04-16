// import { type NextPage } from "next";
import Head from "next/head";
import { HomeComponent } from "~/components/HomeComponent";

const Home = () => {

  return (
    <>
      <Head>
        <title>Carnet Potager - beta</title>
        <meta name="description" content="Application de gestion du potager" />
        <link rel="icon" href="/LogoM.svg" />
      </Head>
      
      <div className="h-full relative container flex flex-col justify-around items-center">
            <HomeComponent />
      </div>
     
    </>
  );
};

export default Home;
