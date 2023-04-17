import React from 'react'

const About = () => {
  return (
    <div className="my-8 px-6 mx-auto">
      <div>
        <span className="inline-block w-12 h-1 bg-red-700"></span>

        <h2
          className="mt-1 text-2xl font-extrabold tracking-wide uppercase lg:text-3xl text-black"
        >
          About Us
        </h2>
      </div>

      <section className="mb-32 mt-16 text-gray-800">
        <img src="./about-cover.jpg" className="w-full shadow-lg rounded-lg mb-6" alt="About Cover" />

        <p>
          Welcome to The Right Spice!
          <br />
          <br />
          We are a brand that strives to provide our customers with the finest quality spices, free from chemicals, preservatives, and harmful additives. Our mission is to offer highly nutritious spices that retain all minerals and enhance the taste of your cuisine without sacrificing your health. We believe in delivering fresh, unadulterated, and unpolished spices that are free from artificial colors and chemicals, and we are committed to exceeding our customers&apos; expectations.
          <br />
          <br />
          Many spices on the market today are adulterated in ways that are difficult for the average person to detect. For too long, we have been served spices lacking essential oils and adulterated with harmful substances, leading to a diminished taste. To address these problems, The Right Spice was created with the goal of providing fresh, pure spices to our customers, ensuring that no dish is deprived of its true flavor. Our customers have noticed a difference after just one use and have expressed their appreciation for our commitment to providing the best. We aim to promote these pure spices throughout India and let the world experience the power of authentic spices.
          <br />
          <br />
          Our team of experts has years of experience in the spice industry and stays up-to-date with the latest developments to offer the best products, services, and solutions to our customers. We are passionate about what we bring to the table, and it reflects in the quality of our products. Whether you are a new customer or a long-standing partner, you can always expect professional, high-quality service from us.
          <br />
          <br />
          Thank you for choosing The Right Spice as your kitchen companion. We look forward to adding flavor and excitement to your dishes and creating unforgettable dining experiences.
          <br />
          <br />
          Best regards,
          <br />
          <br />
          The Right Spice

        </p>
      </section>

    </div>
  )
}

export default About