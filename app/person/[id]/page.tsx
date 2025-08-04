import { imageUrlHelper } from "@/lib/imageUrlHelper";
import { fetchPersonDetails } from "@/lib/tmdb";
import { PersonDetails } from "@/types/PersonDetails";
import Image from "next/image";

type PersonDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const PersonDetailsPage = async ({ params }: PersonDetailsPageProps) => {
  const { id } = await params;

  const person: PersonDetails = await fetchPersonDetails(Number(id));

  return (
    <div className="flex items-center justify-center h-[calc(100vh-6.75rem)]">
      <div className="flex gap-4 m-4 p-4 rounded-lg shadow-lg glass max-w-5xl w-full max-h-[560px] overflow-y-auto">
        <div className="flex-1 rounded-md overflow-clip">
          <Image
            width={720}
            height={1280}
            className="w-full h-full object-cover"
            src={imageUrlHelper(person?.profile_path)}
            alt="Profile picture of person"
          />
        </div>
        <div className="flex flex-col gap-4 flex-[2]">
          <h2 className="text-3xl">{person.name}</h2>
          <p>{person.biography}</p>
          <div className="flex flex-col gap-4 justify-between">
            <span>Birthday: {person.birthday}</span>
            <span>Place of birth: {person.place_of_birth}</span>
            <span>Gender: {person.gender === 1 ? "female" : "male"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetailsPage;
