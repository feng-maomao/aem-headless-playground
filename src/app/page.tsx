import { ProductCard } from "@/components/ProductCard";
import { Beverage } from "@/interfaces/beverage";
import { BeverageResponse } from "@/interfaces/responses/beverage-response";
import axios from "axios";

export const revalidate = 60 * 60 * 24;

export const fetchBeverages = async (): Promise<Beverage[]> => {
  const url = `${process.env.NEXT_PUBLIC_AEM_HOST ?? ""}/graphql/execute.json/${
    process.env.NEXT_PUBLIC_AEM_GRAPHQL_ENDPOINT ?? ""
  }/beverages-all`;
  try {
    const res = await axios.get<BeverageResponse>(url);
    return res.data.data.beverageList.items;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const Home = async () => {
  const beverages = await fetchBeverages();

  return (
    <main className="flex min-h-screen flex-col justify-between">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">ドリンク</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {beverages.map(({ slug, primaryImage, title, price, description }) => (
              <ProductCard
                key={slug}
                link={`/beverages/${slug}`}
                image={primaryImage}
                title={title}
                price={price}
                description={description.plaintext.slice(0, 50)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
