import React from "react";
import { Star, Users, Heart,Sparkles } from "lucide-react";

function Herosection() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-6
         px-4 text-center sm:px-20">

            <div className="flex justify-center">
                <p className="flex items-center font-bold text-amber-800
                 bg-orange-50 px-3 py-2
                 rounded-lg text-sm md:text-base">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Celebrating Community Impact
                </p>
            </div>


            <div>
                <h1 className="font-serif font-bold text-black text-2xl md:text-4xl
                 lg:text-5xl sm:px-80">
                    Meet Your Local <span className="text-orange-500">Heroes</span> 
                </h1>
            </div>
            <div    className=" flex  text-center sm:px-50" >
                <p className="flex font-serif  text-black ">
                    Discover and celebrate the extraordinary people making a 
                    positive difference in communities around the world.
                     Every hero has a story worth sharing
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4 py-4 px-4">

                <div className="p-4 rounded-xl  text-center shadow">
                    <div className="flex items-center justify-center gap-2">
                        <Users size={28} className="bg-blue-600 rounded-md shadow text-white p-1" />
                        <p className="font-bold text-xl">6</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Heroes Celebrated</p>
                </div>


                <div className="p-4 rounded-xl  text-center shadow">
                    <div className="flex items-center justify-center gap-2 ">
                        <Heart size={28} className="bg-red-500 rounded-md shadow text-white p-1" />
                        <p className="font-bold text-xl">745</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Thanks Given</p>
                </div>
            </div>

        </div>
    );
}
export default Herosection;