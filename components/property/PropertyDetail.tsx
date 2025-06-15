// components/property/PropertyDetail.tsx
import React, { useState } from "react";
import { PropertyProps } from "@/interfaces/index";
import BookingSection from "./BookingSection";
import ReviewSection from "./ReviewSection";

interface PropertyDetailProps {
  property: PropertyProps;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "amenities" | "reviews" | "host"
  >("overview");
  const [showAllImages, setShowAllImages] = useState(false);

  const displayImages = property.images || [property.image];
  const mainImage = displayImages[0];
  const additionalImages = displayImages.slice(1, 5); // Show max 4 additional images

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "amenities", label: "What we offer" },
    { id: "reviews", label: "Reviews" },
    { id: "host", label: "About host" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg">
              {property.description}
            </p>
          </div>
        );

      case "amenities":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {property.amenities?.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-2xl">
                  {AMENITY_ICONS[amenity] || "✓"}
                </span>
                <span className="font-medium text-gray-800">{amenity}</span>
              </div>
            )) || (
              <p className="text-gray-500 col-span-2">No amenities listed.</p>
            )}
          </div>
        );

      case "reviews":
        return (
          <ReviewSection
            reviews={property.reviews || []}
            averageRating={property.rating}
          />
        );

      case "host":
        return property.host ? (
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex-shrink-0">
              <img
                src={property.host.avatar}
                alt={property.host.name}
                className="w-20 h-20 rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/assets/images/default-avatar.png";
                }}
              />
            </div>
            <div className="flex-grow">
              <h4 className="text-xl font-semibold mb-2">
                {property.host.name}
              </h4>
              <p className="text-gray-600 mb-3">
                Joined {new Date(property.host.joinedDate).getFullYear()}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="font-medium">Response rate:</span>
                  <span className="ml-2 text-gray-600">
                    {property.host.responseRate}%
                  </span>
                </div>
                <div>
                  <span className="font-medium">Response time:</span>
                  <span className="ml-2 text-gray-600">
                    {property.host.responseTime}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {property.host.bio}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Host information not available.</p>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Property Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {property.name}
        </h1>
        <div className="flex flex-wrap items-center space-x-4 text-gray-600">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500">★</span>
            <span className="font-medium">{property.rating}</span>
            <span>({property.reviews?.length || 0} reviews)</span>
          </div>
          <span>•</span>
          <span>
            {property.address.city}, {property.address.country}
          </span>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-xl overflow-hidden">
          {/* Main Image */}
          <div className="md:col-span-2 md:row-span-2">
            <img
              src={mainImage}
              alt={property.name}
              className="w-full h-64 md:h-full object-cover hover:opacity-90 transition duration-200 cursor-pointer"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/assets/images/placeholder.jpg";
              }}
            />
          </div>

          {/* Additional Images */}
          {additionalImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`${property.name} - ${index + 2}`}
                className="w-full h-32 md:h-full object-cover hover:opacity-90 transition duration-200 cursor-pointer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/assets/images/placeholder.jpg";
                }}
              />
              {/* Show more overlay on last image if there are more images */}
              {index === 3 && displayImages.length > 5 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-semibold">
                    +{displayImages.length - 5} more
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Property Details */}
        <div className="lg:col-span-2">
          {/* Property Categories */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {property.category.map((cat, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition duration-200 ${
                    activeTab === tab.id
                      ? "border-rose-500 text-rose-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mb-8">{renderTabContent()}</div>
        </div>

        {/* Right Column - Booking Section */}
        <div className="lg:col-span-1">
          <BookingSection
            price={property.price}
            rating={property.rating}
            reviewCount={property.reviews?.length || 0}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
