import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="h-[90vh] w-full relative">
      <div className="text-white absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:text-left small:justify-end small:items-start small:p-32">
        <h1 className="text-2xl-semi mb-4 drop-shadow-md shadow-black">
          Empower Your PC Build Journey with AI
        </h1>
        <p className="text-base-regular max-w-[32rem] mb-6 drop-shadow-md shadow-black">
          Discover the future of custom PC building with our revolutionary AI chatbot. Effortlessly design, customize, and order your dream computer. 
          Experience hassle-free PC building like never before.
        </p>
        <UnderlineLink href="/buildpc">START BUILD</UnderlineLink>
      </div>
      <Image
        src="/Gaming-Wallpaper.jpeg"
        layout="fill"
        loading="eager"
        priority={true}
        quality={90}
        objectFit="cover"
        alt="Photo of a gaming desktop"
        className="absolute inset-0 brightness-[0.4]"
        draggable="false"
      />
    </div>
  )
}

export default Hero
