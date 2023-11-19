import React from "react";

export default function About() {
  return (
    <div>
      <h1 className="text-center text-3xl mt-5 font-semibold">
        Welcome to <span className="text-slate-700 font-bold">HouseHive</span>
        <br />
        <p className="text-sm">
          Where Your Ideal <i>Home</i> Awaits
        </p>
      </h1>

      <p className="p-3 pb-0 text-slate-700 mt-7">
        At HouseHive, we're dedicated to revolutionizing the way you find your
        perfect home. Our platform is designed with one goal in mind: to
        simplify and elevate your house-hunting experience. Whether you're
        seeking to rent or buy, we're here to make the journey seamless and
        enjoyable.
      </p>
      <div className="flex flex-col pl-3 pt-3">
        <h1 className="font-semibold">Why HouseHive?</h1>
        <br />
        <p className=" text-slate-700">
          We understand that finding the right home involves more than just
          square footage and price. It's about discovering a space that
          resonates with your lifestyle, preferences, and aspirations. That's
          why we offer a comprehensive range of features and tools, allowing you
          to explore every facet of your potential new home.
        </p>
      </div>
      <div className="flex flex-col pl-3 pt-3">
        <h1 className="font-semibold">A Personalized Experience</h1>
        <br />
        <p className=" text-slate-700">
          We believe in personalized service. Our intuitive interface empowers
          you to tailor your search according to your unique needs. Want a
          pet-friendly environment or a home with a stunning view? We've got you
          covered. Your dream home is just a few clicks away.
        </p>
      </div>
      <div className="flex flex-col pl-3 pt-3">
        <h1 className="font-semibold">Our Commitment</h1>
        <br />
        <p className=" text-slate-700">
          Above all, we're committed to providing exceptional customer service.
          Our team is dedicated to supporting you throughout your journey, from
          browsing listings to closing the deal. Your satisfaction and comfort
          are our priorities.
        </p>
      </div>
    </div>
  );
}
