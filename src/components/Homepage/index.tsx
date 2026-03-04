import Hero from "./Hero";
import Categories from "./Categories";
import ReviewsShowcase from "./ReviewsShowcase";
import InstagramLikesShowcase from "./InstagramLikesShowcase";
import CTA from "./CTA";

export default function Homepage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="w-full max-w-[87.5rem] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <Categories />
        <ReviewsShowcase />
        <InstagramLikesShowcase />
      </div>
      <div className="w-full max-w-[87.5rem] mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <CTA />
      </div>
    </div>
  );
}


