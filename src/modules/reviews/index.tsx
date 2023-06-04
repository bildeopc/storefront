import Image from "next/image"
import React from "react"

const Reviews = () => {
  const reviews = [
    {
      name: "xQc",
      justification:
        "I purchased a BideoPC and was extremely impressed with the performance. It handled all my gaming needs flawlessly and exceeded my expectations. The customer support was also top-notch, providing prompt assistance whenever I had a question.",
      image:
        "https://cdn.discordapp.com/attachments/811231774327177326/1114147291696205855/Twitch-Streamer-xQc2000x1270.png", // Replace with the actual URL of xQc's image
    },
    {
      name: "MKBHD",
      justification:
        "As a tech enthusiast, I'm always on the lookout for reliable and high-quality products. BideoPC delivered just that. The build quality of their PCs is outstanding, and their attention to detail is unmatched. I highly recommend their services to anyone in need of a powerful and customized PC.",
      image:
        "https://cdn.discordapp.com/attachments/811231774327177326/1114147357039263774/bf9821123778865.png", // Replace with the actual URL of MKBHD's image
    },
    {
      name: "LinusTechTips",
      justification:
        "BideoPC offers an exceptional range of customization options, allowing users to build their dream PCs. The level of expertise and craftsmanship they put into each build is remarkable. It's great to see a company that truly understands the needs of PC enthusiasts and delivers on their promises.",
      image:
        "https://cdn.discordapp.com/attachments/811231774327177326/1114147535930531881/2048px-2018_Linus_Tech_Tips_logo.png", // Replace with the actual URL of LinusTechTips' image
    },
  ]

  return (
    <div className="px-5 max-w-3xl mx-auto mt-10 mb-20">
      <h1 className="text-3xl font-bold mb-5 text-gray-700">Our Reviews</h1>
      {reviews.map((review, index) => (
        <div key={index} className="mb-8">
          <div className="flex items-center mb-2">
            <Image
              className="rounded-full"
              src={review.image}
              alt={review.name}
              width={50}
              height={50}
            />
            <h2 className="ml-3 text-xl font-bold">{review.name}</h2>
          </div>
          <p className="text-gray-600">{review.justification}</p>
        </div>
      ))}
    </div>
  )
}

export default Reviews
