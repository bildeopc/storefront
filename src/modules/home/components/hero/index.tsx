import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="h-[90vh] w-full relative">
      <div className="text-white absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:text-left small:justify-end small:items-start small:p-32">
        <h1 className="text-2xl-semi mb-4 drop-shadow-md shadow-black">
        Build your Dream PC with Ease
        </h1>
        <p className="text-base-regular max-w-[32rem] mb-6 drop-shadow-md shadow-black">
        Find all the components you need to create your dream PC. 
        From processors to graphics cards, we have everything you need to 
        build a high-performance computer tailored to your needs. 
        Shop now and start building today!
        </p>
        <UnderlineLink href="/buildpc">START BUILD</UnderlineLink>
        {/*<UnderlineLink href="/store">START BUILD</UnderlineLink>*/}
      </div>
      <Image
        src="/Gaming-Wallpaper.jpeg"
        layout="fill"
        loading="eager"
        priority={true}
        quality={90}
        objectFit="cover"
        alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
        className="absolute inset-0"
        draggable="false"
      />
    </div>
  )
}

export default Hero
