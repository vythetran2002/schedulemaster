import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone } from "lucide-react";

function ClientProfileCard(props) {
  const { profile } = props;

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="sm:flex sm:items-center px-6 py-4">
        <Avatar className="w-24 h-24 border-[3px] border-[balck]">
          <AvatarImage src={profile?.avatar} />
          <AvatarFallback>{profile?.name}</AvatarFallback>
        </Avatar>
        <div className="mt-4 sm:mt-0 flex flex-col gap-1 sm:ml-4 text-center sm:text-left">
          <p className="text-xl leading-tight font-medium">{profile?.name}</p>
          <p className="text-sm leading-tight text-gray-600">
            {profile?.email}
          </p>
        </div>
      </div>
      <div className="border-t flex flex-col gap-1 px-6 py-4">
        <div className="flex items-center mb-2 gap-3">
          <Mail />
          <span className="text-gray-700">{profile?.email}</span>
        </div>
      </div>
    </div>
  );
}

export default ClientProfileCard;
