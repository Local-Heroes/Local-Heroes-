import React from "react";
import { Star } from "lucide-react";

function Herosection() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-6 px-4 text-center">
      
      <div className="flex justify-center">
        <p className="flex items-center font-bold text-amber-800 bg-amber-100 px-3 py-2 rounded-lg text-sm md:text-base">
          <Star className="w-4 h-4 mr-2" />
          Celebrating Community Impact
        </p>
      </div>

     
      <div>
        <h1 className="font-serif font-bold text-black text-2xl md:text-4xl lg:text-5xl">
          Meet Your Local <br/> Heroes
        </h1>
      </div>
      <div>
        <p className="font-serif font-bold text-black text-center w-200 line-clamp-2">
        Discover and celebrate the extraordinary people making a positive difference in communities around the world. Every hero has a story worth sharing
        </p>
      </div>
    </div>
  );
}
export default Herosection;