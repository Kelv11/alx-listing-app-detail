// pages/property/[id].tsx
import { PROPERTYLISTINGSAMPLE } from "@/constants/index";
import { useRouter } from "next/router";
import PropertyDetail from "@/components/property/PropertyDetail";
import { PropertyProps } from "@/interfaces/index";

export default function PropertyPage() {
  const router = useRouter();
  const { id } = router.query;

  // Find property by name (as specified in requirements)
  const property: PropertyProps | undefined = PROPERTYLISTINGSAMPLE.find(
    (item) => item.name === id
  );

  if (!property) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-600">Property not found</h1>
        <p className="mt-2 text-gray-500">
          The requested property could not be found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PropertyDetail property={property} />
    </div>
  );
}
