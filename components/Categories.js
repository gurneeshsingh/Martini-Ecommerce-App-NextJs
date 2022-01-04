import { categories } from "../data";
import CategoryItem from "./CategoryItem";

const Categories = () => {
    return (
        <section className="flex sm:mx-4 sm:my-4 justify-between sm:flex-row flex-col  ">
            {categories?.map((item) => (
                <CategoryItem key={item.id} item={item} />
            ))}
        </section>
    )
}

export default Categories
