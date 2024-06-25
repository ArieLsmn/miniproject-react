import ProductCard from "./ProductCard";

function ProductRow({ products, addItem }) {

    return (
        <div className="justify-center mx-auto content-center">
            <div className="flex flex-col flex-wrap md:flex-row border-t border-solid border-gray-300 my-4">

                {products.map(product => (
                    <ProductCard
                        product={product}

                        addItem={addItem}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductRow;