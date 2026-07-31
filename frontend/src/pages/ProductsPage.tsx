import ProductsTable from "@/components/products/ProductsTable";
import StockInDialog from "@/components/products/StockInDialog";

import PageHeader from "@/components/PageHeader";
import FilterToolbar from "@/components/FilterToolbar";
import SearchInput from "@/components/SearchInput";
import { PageLoadingState, ErrorState } from "@/components/PageStates";
import FilterSelect from "@/components/FilterSelect";

import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useProductTypes } from "@/hooks/useProductTypes";
import { useContainers } from "@/hooks/useContainers";

import { useEffect, useState } from "react";

export default function ProductsPage() {

	// Search filters

	const [brand, setBrand] = useState("");
	const [model, setModel] = useState("");

	// Dropdown filters

	const [categoryId, setCategoryId] = useState<number | undefined>(
		undefined,
	);

	const [productTypeId, setProductTypeId] = useState<
		number | undefined
	>(undefined);

	const [containerId, setContainerId] = useState<
		number | undefined
	>(undefined);

	// Products

	const {
		data: products = [],
		isLoading,
		error,
	} = useProducts({
		brand,
		model,
		categoryId,
		productTypeId,
	});

	// Categories

	const {
		data: categories = [],
	} = useCategories();

	// Product types

	const {
		data: productTypes = [],
	} = useProductTypes(
		categoryId
			? {
				categoryId,
			}
			: undefined,
	);

	// Containers

	const {
		data: containers = [],
	} = useContainers(
		categoryId
			? {
				categoryId,
			}
			: undefined,
	);

	// Reset dependent filters when category changes

	useEffect(() => {
		setProductTypeId(undefined);
		setContainerId(undefined);
	}, [categoryId]);

	if (isLoading) {
		return <PageLoadingState />;
	}

	return (
		<div className="space-y-6">

			<PageHeader
				title="Products"
				description="Search, filter, and manage all products."
				action={<StockInDialog />}
			/>

			{error ? (
				<ErrorState description="We couldn't load products. Try adjusting your filters or refreshing the page." />
			) : (
				<>
					{/* Search and filters */}

					<FilterToolbar>

						<SearchInput
							placeholder="Search brand..."
							value={brand}
							onChange={(e) =>
								setBrand(e.target.value)
							}
							containerClassName="flex-1 min-w-[160px]"
						/>

						<SearchInput
							placeholder="Search model..."
							value={model}
							onChange={(e) =>
								setModel(e.target.value)
							}
							containerClassName="flex-1 min-w-[160px]"
						/>

						<FilterSelect
							value={categoryId}
							onValueChange={setCategoryId}
							options={categories.map((category) => ({
								id: category.id,
								label: category.name,
							}))}
							allLabel="All categories"
						/>

						<FilterSelect
							value={productTypeId}
							onValueChange={setProductTypeId}
							options={productTypes.map((productType) => ({
								id: productType.id,
								label: productType.name,
							}))}
							allLabel="All product types"
							disabled={!categoryId}
						/>

						<FilterSelect
							value={containerId}
							onValueChange={setContainerId}
							options={containers.map((container) => ({
								id: container.id,
								label: container.code,
							}))}
							allLabel="All Containers"
							disabled={!categoryId}
						/>

					</FilterToolbar>

					{/* Products table */}

					<ProductsTable
						products={products}
					/>
				</>
			)}

		</div>
	);
}
