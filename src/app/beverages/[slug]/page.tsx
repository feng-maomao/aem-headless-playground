import { fetchBeverages } from "@/app/page";
import Badge from "@/components/atoms/Badge";
import { NOT_FOUND_BEVERAGE_DETAIL } from "@/constants/null-constants";
import { BeverageDetail } from "@/interfaces/beverage-detail";
import { BeverageResponse } from "@/interfaces/responses/beverage-response";
import axios from "axios";
import Image from "next/image";

export const revalidate = 60 * 60 * 24;
export const generateStaticParams = async () => {
  const beverages = await fetchBeverages();

  return beverages.map((beverage) => ({
    slug: beverage.slug,
  }));
};

const NEXT_PUBLIC_AEM_HOST = process.env.NEXT_PUBLIC_AEM_HOST ?? "";

const fetchBeverageDetails = async (slug: string): Promise<BeverageDetail> => {
  try {
    const res = await axios.get<BeverageResponse>(
      `${NEXT_PUBLIC_AEM_HOST}/graphql/execute.json/${
        process.env.NEXT_PUBLIC_AEM_GRAPHQL_ENDPOINT ?? ""
      }/beverage-by-slug;slug=${slug}`,
    );

    return res.data.data.beverageList.items[0];
  } catch (error) {
    console.error(error);
    return NOT_FOUND_BEVERAGE_DETAIL;
  }
};

const BeverageDetails = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { title, description, flavor, primaryImage } = await fetchBeverageDetails(slug);

  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
          {flavor && (
            <div className="pt-3">
              <Badge>{flavor.toUpperCase()}</Badge>
            </div>
          )}
          <p className="mt-4 text-gray-500">{description.plaintext}</p>
        </div>
        {primaryImage && (
          <Image
            src={`${NEXT_PUBLIC_AEM_HOST}${primaryImage._path}`}
            alt={title}
            width={primaryImage.width}
            height={primaryImage.height}
            className="rounded-lg bg-gray-100"
          />
        )}
      </div>
    </div>
  );
};

export default BeverageDetails;
