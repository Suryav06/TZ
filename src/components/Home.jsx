import s1 from "../assets/Shirt/fabio-alves-eAUE_FmclYE-unsplash.jpg";
import s2 from "../assets/Shirt/mediamodifier-Q0zoxQF7OUY-unsplash.jpg";
import s3 from "../assets/Shirt/faith-yarn-Wr0TpKqf26s-unsplash.jpg";
import s4 from "../assets/t_shirt.png"
import { Carousel } from "@material-tailwind/react";
import { Link } from "react-router-dom";




function Home() {
  const handlePointerEnter = () => {
    console.log("Entered");
  };

  const handlePointerLeave = () => {
    console.log("Left");
  };

  return (
    <>
      <section className="bg-white py-12 dark:bg-gray-900 lg:py-16 border rounded-2xl border-gray-300">
        <div className="container mx-auto px-4 lg:px-8 ">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="flex flex-col justify-center lg:col-span-7">
              <h1 className="mb-6 text-3xl font-extrabold text-gray-900 dark:text-white lg:mb-8 lg:text-5xl xl:text-6xl">
                From Imagination to Fabric
              </h1>
              <p className="mb-8 text-base text-gray-700 dark:text-gray-300 lg:mb-10 lg:text-lg">
                Craft your perfect tee. Turn your ideas into reality with custom
                designs. Design the shirt of your dreams, tailored just for you.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="inline-block rounded-md bg-gray-700 px-6 py-3 text-base font-medium text-gray-100 hover:bg-zinc-400 focus:border-gray-300 focus:bg-white focus:text-gray-700 focus:ring-4"
                >
                  Get started
                </a>
                <a
                  href="#"
                  className="inline-block rounded-md border border-gray-300 px-6 py-3 text-base font-medium text-gray-900 hover:border-gray-400 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                  Speak to Sales
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
            <Carousel
                placeholder={<div>Loading...</div>}
                onPointerEnterCapture={handlePointerEnter}
                onPointerLeaveCapture={handlePointerLeave}
                className="rounded-xl"
                style={{ maxWidth: "100%", height: "auto" }}
              >
                <img src={s1} alt="image 1" className="h-full w-full object-cover object-center" />
                <img src={s2} alt="image 2" className="h-full w-full object-cover object-center" />
                <img src={s3} alt="image 3" className="h-full w-full object-cover object-center" />
              </Carousel>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 lg:px-8 flex flex-wrap items-center justify-between">
        
        <div className="w-3/6 lg:w-1/2 mb-4 lg:mb-0">
  <img src={s4} alt="Example" className="mx-auto lg:mx-0 cursor-pointer hover:animate-wiggle lg:max-w-xs" />
</div>
<div className="w-3/6 lg:w-1/2 bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg">
  <div className="text-center lg:text-left lg:pl-8">
    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4 sm:text-2xl sm:mb-2">Design Your Cool Shirts Here</h2>
    <p className="text-base lg:text-lg text-gray-600 dark:text-gray-400 mb-8 sm:text-sm sm:mb-4">
      Welcome to our shirt design studio! Unleash your creativity and bring your ideas to life. Whether you're looking for a custom tee for yourself or for your business, we've got you covered. With our easy-to-use design tools, you can create something truly unique that reflects your style and personality. Get started today and make a statement with your own custom-designed shirt.
    </p>
    <Link to={"/design"}>
    <button className="inline-block rounded-md bg-gray-700 px-6 py-3 text-base font-medium text-gray-100 hover:bg-zinc-400 focus:border-gray-300 focus:bg-white focus:text-gray-700 focus:ring-4 animate-bounce animate-infinite animate-ease-out animate-reverse animate-fill-both">
      Click here
    </button>
    </Link>
  </div>
</div>
  </div>
      </section>
      <section className="bg-white dark:bg-gray-900 border rounded-2xl border-gray-300" id="about">
    <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-black dark:text-white">About Us</h2>
            <p className="mb-4 text-black">We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need.</p>
            
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
            <img className="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1"/>
            <img className="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2"/>
        </div>
    </div>
</section>
    </>
  );
}

export default Home;
