import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';
import { Pagination } from "swiper/modules";
import { MessageSquareQuote } from "lucide-react";
import moment from "moment";

// Static review data
const staticReviews = [
  {
    _id: "1",
    userName: "Alex Rider",
    userEmail: "alex.rider@example.com",
    reviewText: "The mountain bike I bought is fantastic! Smooth ride and durable frame.",
    starCount: 5,
    orderCount: 2,
    createdAt: "2025-04-15T10:00:00Z",
  },
  {
    _id: "2",
    userName: "Emma Wheeler",
    userEmail: "emma.wheeler@example.com",
    reviewText: "Great customer service and fast delivery. My road bike is perfect!",
    starCount: 4,
    orderCount: 1,
    createdAt: "2025-03-20T14:30:00Z",
  },
  {
    _id: "3",
    userName: "Liam Spokes",
    userEmail: "liam.spokes@example.com",
    reviewText: "The hybrid bike is versatile, but the seat could be more comfortable.",
    starCount: 3,
    orderCount: 3,
    createdAt: "2025-02-10T09:15:00Z",
  },
];

// Skeleton component for a single review card
const ReviewCardSkeleton = () => {
  return (
    <div className="p-6 rounded-lg shadow-lg bg-card animate-pulse">
      <div className="flex justify-center mb-4">
        <div className="h-6 w-6 bg-muted rounded-full"></div>
      </div>
      <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-4"></div>
      <div className="h-4 bg-muted rounded w-1/2 mx-auto mb-4"></div>
      <div className="flex justify-center mb-4">
        <div className="h-5 bg-muted rounded w-24"></div>
      </div>
      <div className="flex justify-center gap-4 mb-4">
        <div className="h-5 bg-muted rounded w-20"></div>
        <div className="h-5 bg-muted rounded w-32"></div>
      </div>
      <div className="h-4 bg-muted rounded w-16 mx-auto"></div>
    </div>
  );
};

const Review = () => {
  const isLoading = false; // Static data, no loading state
  const reviews = staticReviews;

  if (isLoading) {
    return (
      <div className="container bg-background mx-auto p-4 mb-20 mt-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 border-l-4 border-primary px-4">
          <span className="text-primary">What Our</span> Cyclists Say
        </h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {[...Array(3)].map((_, index) => (
            <ReviewCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (!reviews.length) {
    return (
      <div className="container bg-background mx-auto p-4 mb-20 mt-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 border-l-4 border-primary px-4">
          <span className="text-primary">What Our</span> Cyclists Say
        </h2>
        <p className="text-center text-muted-foreground">No reviews available.</p>
      </div>
    );
  }

  return (
    <div className="container bg-background mx-auto p-4 mb-20 mt-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 border-l-4 border-primary px-4">
        <span className="text-primary">What Our</span> Cyclists Say
      </h2>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet bg-muted",
          bulletActiveClass: "swiper-pagination-bullet-active bg-primary",
        }}
        modules={[Pagination]}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="pb-12"
      >
        {reviews.map((review) => (
          <SwiperSlide
            key={review._id}
            className="p-6 border border-border bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 hover:bg-white"
          >
            <div className="flex justify-center mb-4 h-10">
              <MessageSquareQuote className="text-primary h-8 w-8" />
            </div>
            <p className="text-center mb-4 italic font-bold text-primary">
              "{review.reviewText}"
            </p>
            <div className="flex justify-center mb-4">
              <span className="text-yellow-500 text-lg flex">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index}>
                    {index < review.starCount ? "★" : "☆"}
                  </span>
                ))}
              </span>
            </div>
            <div className="flex justify-center items-center gap-4 mb-4">
              <h4 className="text-lg text-foreground">{review.userName}</h4>
              <span className="text-muted-foreground">|</span>
              <p className="text-sm text-muted-foreground">{review.userEmail}</p>
            </div>
            <p className="text-sm text-muted-foreground text-center mb-2 bg-card rounded-full">
              Total Orders: {review.orderCount || 0}
            </p>
            <p className="text-xl text-primary text-center">
              {moment(review.createdAt).format("MMMM D, YYYY")}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Review;