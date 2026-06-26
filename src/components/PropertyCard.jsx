import React from "react";
import { Card } from "@heroui/react";
import Link from "next/link";

export default function PropertyCard({ property }) {
  const id = property._id?.$oid || property._id;
  const formattedRent = Number(property.monthlyRent).toLocaleString();

  return (
    <Card className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full p-4">
      <div>
        {/* ৪:৩ অ্যাসপেক্ট রেশিওতে ইমেজ র‍্যাপার */}
        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-50">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* HeroUI v3 Compound Component Structure */}
        <Card.Header className="px-1 pt-4 pb-1 flex flex-col items-start gap-1">
          <Card.Title className="text-lg font-bold text-gray-900 tracking-tight">
            {property.title}
          </Card.Title>
          <Card.Description className="text-sm text-gray-600 flex items-center gap-1 font-normal mt-0.5">
            <span className="text-base text-pink-500">📍</span>
            <span className="truncate">{property.location}</span>
          </Card.Description>
        </Card.Header>

        <Card.Content className="px-1 pt-1 pb-3">
          {/* Screenshot-এর মতো নীল রঙের কারেন্সি কালার লেআউট */}
          <div className="text-blue-600 font-bold text-base flex items-center gap-1">
            <span>৳{formattedRent}</span>
            <span className="text-sm font-medium text-blue-500">
              /{property.rentType ? property.rentType.toLowerCase() : "month"}
            </span>
          </div>
        </Card.Content>
      </div>

      <Card.Footer className="p-1 pt-0">
        <Link
          href={`/properties/${property._id}`}
          className="w-full text-center bg-slate-700 hover:bg-[#262626] text-white font-medium text-sm py-2.5 px-4 rounded-lg transition-colors block shadow-sm"
        >
          View Details
        </Link>
      </Card.Footer>
    </Card>
  );
}